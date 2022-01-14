const BOLD_TEXT = 'font-weight: bold;'
const LINE_HEIGHT = 'padding-top: .13em; line-height: .1em;'
const TOP_BOTTOM_MARGIN = "margin-top: .75em; margin-bottom: -.5em;"

function azdataQueryPlan(container, queryPlanGraph, iconPaths)
{
    this.queryPlanGraph = queryPlanGraph;
	if (container != null && iconPaths != null)
	{
		this.init(container, iconPaths);
	}
};

azdataQueryPlan.prototype.init = function(container, iconPaths)
{
    this.container = container;

    mxEvent.addListener(window, 'unload', mxUtils.bind(this, function()
    {
        this.destroy();
    }));

    mxEvent.disableContextMenu(container);

    var graph = new azDataGraph(container);
    graph.setPanning(true);
	graph.setTooltips(true);        

    graph.convertValueToString = function(cell)
    {
        if (cell.value != null && cell.value.label != null)
        {
            return cell.value.label;
        }

        return azDataGraph.prototype.convertValueToString.apply(this, arguments); // "supercall"
    };

    graph.isHtmlLabel = function(cell)
    {
        return false;
    };
    
    graph.isCellEditable = function(cell)
    {
        return false;
    };

    graph.getTooltipForCell = function(cell)
    {
        if (cell.value != null && cell.value.metrics != null)
        {
            var tooltip = '';
            for (var i = 0; i < cell.value.metrics.length; ++i)
            {
                tooltip += cell.value.metrics[i].name + ': ' + cell.value.metrics[i].value;
                if (i != cell.value.metrics.length - 1)
                {
                    tooltip += '<br/>';
                }
            }
            return tooltip;
        }

        return azDataGraph.prototype.getTooltipForCell.apply(this, arguments); // "supercall"
    }

    var parent = graph.getDefaultParent();
    var layout = new mxHierarchicalLayout(graph, mxConstants.DIRECTION_WEST);

    var style = new Object();
    style = mxUtils.clone(style);
    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_LABEL;
    style[mxConstants.STYLE_STROKECOLOR] = '#ffffff';
	style[mxConstants.STYLE_FILLCOLOR] = '#ffffff';
    style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
    style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
    style[mxConstants.STYLE_IMAGE_ALIGN] = mxConstants.ALIGN_CENTER;
    style[mxConstants.STYLE_IMAGE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
    style[mxConstants.STYLE_IMAGE_WIDTH] = '32';
    style[mxConstants.STYLE_IMAGE_HEIGHT] = '32';
    style[mxConstants.STYLE_SPACING_TOP] = '43';
    style[mxConstants.STYLE_SPACING] = '8';

    var icons = new Array();
    for (const iconName in iconPaths) 
    {
        console.log(iconName + ' - ' + iconPaths[iconName]);
        style = mxUtils.clone(style);
        style[mxConstants.STYLE_IMAGE] = iconPaths[iconName];
        graph.getStylesheet().putCellStyle('azdataQueryplan-' + iconName, style);
        icons.push(iconName);
    }

    graph.getModel().beginUpdate();
    try
    {
        var rand = Math.floor((Math.random() * icons.length));

        var iconName = undefined;
        if (this.queryPlanGraph.icon) {
            iconName = 'azdataQueryplan-' + this.queryPlanGraph.icon
        } else {
            iconName = 'azdataQueryplan-' +  icons[rand];
        }

        var vertex = graph.insertVertex(parent, null, this.queryPlanGraph, 20, 20, 70, 70, iconName);
        var stack = 
        [
            { 
                vertex: vertex,
                node: this.queryPlanGraph 
            }
        ];
        while (stack.length > 0)
        {
            var entry = stack.pop();
            if (entry.node.children)
            {
                for (var i = 0; i < entry.node.children.length; ++i)
                {                    
                    var node = entry.node.children[i];
                    if (node.icon) {
                        iconName = 'azdataQueryplan-' + node.icon
                    } else {
                        rand = Math.floor((Math.random() * icons.length));
                        iconName = 'azdataQueryplan-' +  icons[rand];
                    }
                    vertex = graph.insertVertex(parent, null, node, 20, 20, 70, 70, iconName);

                    let edgeInfo = {
                        label:'',
                        metrics: [{
                            'name': `<div style=\"${LINE_HEIGHT}\"><span style=\"${BOLD_TEXT}\">Estimated Number of Rows Per Execution</span>`,
                            'value': `${Math.floor(Math.random() * 500)}<hr style=\"${TOP_BOTTOM_MARGIN}\"/></div>`,
                        },
                        {
                            'name': `<div style=\"${LINE_HEIGHT}\"><span style=\"${BOLD_TEXT}\">Estimated Number of Rows for All Executions</span>`,
                            'value': `${Math.floor(Math.random() * 2000)}<hr style=\"${TOP_BOTTOM_MARGIN}\"/></div>`
                        },
                        {
                            'name': `<div style=\"${LINE_HEIGHT}\"><span style=\"${BOLD_TEXT}\">Estimated Row Size</span>`,
                            'value': `${Math.floor(Math.random() * 700)}<hr style=\"${TOP_BOTTOM_MARGIN}\"/></div>`
                        },
                        {
                            'name': `<div style=\"${LINE_HEIGHT}\"><span style=\"${BOLD_TEXT}\">Estimated Data Size</span>`,
                            'value': `${Math.floor(Math.random() * 700)} KB</div>`
                        }]
                    };
                    graph.insertInvertedEdge(parent, null, edgeInfo, entry.vertex, vertex);
                    stack.push(
                        { 
                            vertex: vertex,
                            node: node
                        });
                }
            }
        }
        layout.execute(parent);
    }
    finally
    {
        graph.getModel().endUpdate();
    }
};

azdataQueryPlan.prototype.destroy = function()
{
    if (!this.destroyed)
	{
        this.destroyed = true;
        this.container = null;
    }
};
