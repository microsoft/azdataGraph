function azdataQueryPlan(container, queryPlanGraph, iconPaths) {
    this.queryPlanGraph = queryPlanGraph;
    if (container != null && iconPaths != null) {
        this.init(container, iconPaths);
    }
};

azdataQueryPlan.prototype.init = function (container, iconPaths) {
    let div = document.getElementById('graphContainer');
    div.style.overflow = 'auto';
    this.container = container;

    mxEvent.addListener(window, 'unload', mxUtils.bind(this, function () {
        this.destroy();
    }));

    mxEvent.disableContextMenu(container);

    var graph = new azdataGraph(container);
    this.graph = graph;
    graph.centerZoom = false;
    graph.setTooltips(true);
    graph.setEnabled(true);

    graph.panningHandler.useLeftButtonForPanning = true;
    graph.setPanning(true);
    graph.resizeContainer = false;

    graph.convertValueToString = function (cell) {
        if (cell.value != null && cell.value.label != null) {
            return cell.value.label;
        }

        return azdataGraph.prototype.convertValueToString.apply(this, arguments); // "supercall"
    };

    graph.isHtmlLabel = function (cell) {
        return false;
    };

    graph.isCellEditable = function (cell) {
        return false;
    };

    graph.addListener(mxEvent.CLICK, (sender, event) => {
        azdataGraph.prototype.graphClickEventHandler(sender, event);
    });

    graph.getTooltipForCell = azdataGraph.prototype.getStyledTooltipForCell;

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
    for (const iconName in iconPaths) {
        console.log(iconName + ' - ' + iconPaths[iconName]);
        style = mxUtils.clone(style);
        style[mxConstants.STYLE_IMAGE] = iconPaths[iconName];
        graph.getStylesheet().putCellStyle('azdataQueryplan-' + iconName, style);
        icons.push(iconName);
    }

    graph.getModel().beginUpdate();
    try {
        var rand = Math.floor((Math.random() * icons.length));

        var iconName = undefined;
        if (this.queryPlanGraph.icon) {
            iconName = 'azdataQueryplan-' + this.queryPlanGraph.icon
        } else {
            iconName = 'azdataQueryplan-' + icons[rand];
        }

        var vertex = graph.insertVertex(parent, null, this.queryPlanGraph, 20, 20, 70, 70, iconName);
        var stack =
            [
                {
                    vertex: vertex,
                    node: this.queryPlanGraph
                }
            ];
        while (stack.length > 0) {
            var entry = stack.pop();
            if (entry.node.children) {
                for (var i = 0; i < entry.node.children.length; ++i) {
                    var node = entry.node.children[i];
                    if (node.icon) {
                        iconName = 'azdataQueryplan-' + node.icon
                    } else {
                        rand = Math.floor((Math.random() * icons.length));
                        iconName = 'azdataQueryplan-' + icons[rand];
                    }
                    vertex = graph.insertVertex(parent, null, node, 20, 20, 70, 70, iconName);

                    let edgeInfo = {
                        label: '',
                        metrics: [{
                            'name': `Estimated Number of Rows Per Execution`,
                            'value': `${Math.floor(Math.random() * 500)}`,
                        },
                        {
                            'name': `Estimated Number of Rows for All Executions`,
                            'value': `${Math.floor(Math.random() * 2000)}`
                        },
                        {
                            'name': `Estimated Row Size`,
                            'value': `${Math.floor(Math.random() * 700)} B`
                        },
                        {
                            'name': `Estimated Data Size`,
                            'value': `${Math.floor(Math.random() * 700)} KB`
                        }]
                    };
                    graph.insertWeightedInvertedEdge(parent, null, edgeInfo, entry.vertex, vertex);
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
    finally {
        graph.getModel().endUpdate();
    }
};

azdataQueryPlan.prototype.registerZoomInListener = function (element, eventType) {
    this.graph.addZoomInListener(element, eventType);
};

azdataQueryPlan.prototype.registerZoomOutListener = function (element, eventType) {
    this.graph.addZoomOutListener(element, eventType);
};

azdataQueryPlan.prototype.destroy = function () {
    if (!this.destroyed) {
        this.destroyed = true;
        this.container = null;
    }
};
