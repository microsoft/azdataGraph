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
    this.rubberband = new mxRubberband(graph);
    graph.centerZoom = false;
    this.enablePanning(true);
    graph.setTooltips(true);
    graph.setEnabled(true);

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
    const zoomIn = () => {
        this.graph.zoomIn();
    };
    this.graph.addDomEventListener(element, eventType, zoomIn);
};

azdataQueryPlan.prototype.registerZoomOutListener = function (element, eventType) {
    const zoomOut = () => {
        this.graph.zoomOut();
    };

    this.graph.addDomEventListener(element, eventType, zoomOut);
};

azdataQueryPlan.prototype.registerZoomToFitListener = function (element, eventType) {
    const zoomToFit = () => {
        this.graph.fit();
        this.graph.view.rendering = true;
        this.graph.refresh();
    };
    
    this.graph.addDomEventListener(element, eventType, zoomToFit);
};

azdataQueryPlan.prototype.registerGraphCallback = function (eventType, callback) {
    this.graph.addListener(eventType, (sender, event) => {
        this.graph.graphEventHandler(sender, event, callback);
    });
};

azdataQueryPlan.prototype.getZoomLevelPercentage = function() {
    return this.graph.view.scale * 100;
};

azdataQueryPlan.prototype.zoomTo = function (zoomPercentage) {
    const ZOOM_PERCENTAGE_MINIMUM = 1;

    let parsedZoomLevel = parseInt(zoomPercentage);
    if (isNaN(parsedZoomLevel)) {
        return;
    }

    if (parsedZoomLevel < ZOOM_PERCENTAGE_MINIMUM) {
        parsedZoomLevel = ZOOM_PERCENTAGE_MINIMUM;
    }

    let zoomScale = parsedZoomLevel / 100;
    this.graph.zoomTo(zoomScale);
};

azdataQueryPlan.prototype.addZoomInRectListener = function() {
    let self = this;
    mxRubberband.prototype.mouseUp = function(sender, event) {
        let execute = self.container && this.width !== undefined && this.height !== undefined;
        this.reset();

        if (execute) {
            let rect = new mxRectangle(this.x, this.y, this.width, this.height);
            self.graph.zoomToRect(rect);
            event.consume();
        }
    };
};

azdataQueryPlan.prototype.enablePanning = function(panning) {
    this.graph.panningHandler.useLeftButtonForPanning = panning;
    this.graph.setPanning(panning);
};

azdataQueryPlan.prototype.destroy = function () {
    if (!this.destroyed) {
        this.destroyed = true;
        this.container = null;
    }
};
