class point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class graphNodeLayoutHelper {
    constructor() {
        this.layoutPoints = [];
    }

    checkInvariant() {
        var last = new point(0, 0);

        for (var i = 0; i < this.layoutPoints.length; i++) {
            if (last.x > this.layoutPoints[i].x || last.Y > this.layoutPoints[i].y) {
                console.log('Graph layout failed.');
                // do not throw exception, in case of failure we render graph incorrectly 
            }

            last = this.layoutPoints[i];
        }
    }

    updateNodeLayout(xPosition, yPosition) {
        this.checkInvariant();

        // First cover edge cases

        // Empty list
        if (this.layoutPoints.length === 0) {
            this.layoutPoints.push(new point(xPosition, yPosition));
            return;
        }

        // Single Element
        if (this.layoutPoints.length === 1) {
            if (xPosition < this.layoutPoints[0].x) {
                this.layoutPoints.splice(0, 0, new point(xPosition, yPosition));
            }
            else if (xPosition === this.layoutPoints[0].x) {
                this.layoutPoints[0] = new point(this.layoutPoints[0].x, Math.max(this.layoutPoints[0].y, yPosition));
            }
            else {
                this.layoutPoints.push(new point(xPosition, yPosition));
            }
            return;
        }

        // Insert Before First Element
        if (xPosition < this.layoutPoints[0].x && yPosition < this.layoutPoints[0].y) {
            this.layoutPoints.splice(0, 0, new point(xPosition, yPosition));
            return;
        }

        // Insert Last Element
        if (this.layoutPoints[this.layoutPoints.length - 1].x < xPosition && yPosition > this.layoutPoints[this.layoutPoints.length - 1].y) {
            this.layoutPoints.push(new point(xPosition, yPosition));
            return;
        }

        // Update Last Element
        if (this.layoutPoints[this.layoutPoints.length - 1].x == xPosition) {
            this.layoutPoints[this.layoutPoints.length - 1] = new point(xPosition, Math.max(this.layoutPoints[this.layoutPoints.length - 1].y, yPosition));
            return;
        }

        // Insert Point 

        // First find insert index
        var insertIndex = 0;
        for (var i = 0; i < this.layoutPoints.length; i++) {
            if (xPosition <= this.layoutPoints[i].x) {
                insertIndex = i;
                break;
            }
        }

        // Perform Insert or Update.
        if (xPosition == this.layoutPoints[insertIndex].x) {
            this.layoutPoints[insertIndex] = new point(xPosition, Math.max(this.layoutPoints[insertIndex].y, yPosition));
        }
        else {
            this.layoutPoints.splice(insertIndex, 0, new point(xPosition, yPosition));
        }

        // After we insert the point we need to remove following points if they have lower Y value.
        var lastIndex = insertIndex;

        while (lastIndex < this.layoutPoints.length) {
            if (this.layoutPoints[lastIndex].y > yPosition) {
                if (lastIndex - insertIndex - 1 > 1) {
                    this.layoutPoints.splice(insertIndex + 1, lastIndex - insertIndex - 1);
                }
                else {
                    this.layoutPoints.splice(insertIndex + 1, lastIndex - insertIndex - 1);
                }
                return;
            }
            ++lastIndex;
        }

        // Last insert point had the highest Y value, remove elements after inserted point.
        this.layoutPoints.splice(insertIndex + 1, this.layoutPoints.Count - insertIndex - 1);
    }

    getYPositionForXPosition(rowX) {
        this.checkInvariant();

        var yPosition = 0;

        for (var i = 0; i < this.layoutPoints.length; i++) {
            if (rowX < this.layoutPoints[i].x) {
                break;
            }

            yPosition = Math.max(this.layoutPoints[i].y, yPosition);
        }
        return yPosition;
    }
}



function azdataQueryPlan(container, queryPlanGraph, iconPaths) {

    this.paddingX = 48;
    this.paddingY = 16;

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
    var style = graph.getStylesheet().getDefaultEdgeStyle();
    style[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector;

    graph.centerZoom = false;
    graph.setTooltips(true);
    graph.setEnabled(true);

    graph.panningHandler.useLeftButtonForPanning = true;
    graph.setPanning(true);
    graph.resizeContainer = false;
    graph.autoSizeCellsOnAdd = true

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
        style = mxUtils.clone(style);
        style[mxConstants.STYLE_IMAGE] = iconPaths[iconName];
        graph.getStylesheet().putCellStyle('azdataQueryplan-' + iconName, style);
        icons.push(iconName);
    }

    graph.getModel().beginUpdate();
    try {

        this.LayoutGraphElements();

        var rand = Math.floor((Math.random() * icons.length));

        var iconName = undefined;
        if (this.queryPlanGraph.icon) {
            iconName = 'azdataQueryplan-' + this.queryPlanGraph.icon
        } else {
            iconName = 'azdataQueryplan-' + icons[rand];
        }

        var vertex = graph.insertVertex(parent, null, this.queryPlanGraph, this.queryPlanGraph.Position.x, this.queryPlanGraph.Position.y, 70, 70, iconName);
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
                    vertex = graph.insertVertex(parent, null, node, node.Position.x, node.Position.y, 70, 70, iconName);

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
        //layout.execute(parent);
    }
    finally {
        graph.getModel().endUpdate();
    }
};


azdataQueryPlan.prototype.LayoutGraphElements = function () {
    // Setting how much Y coords should be increased for each row
    // for aesthetic  reasons this value is constant across all nodes
    // for entire showplan
    var spacingY = 100;

    // Recusively layout all nodes starting with root
    var startX = (this.paddingX + 70) / 2;
    var startY = (this.paddingY + 70) / 2;

    this.SetNodePositionRecursive(this.queryPlanGraph, spacingY, startX, startY);
}


azdataQueryPlan.prototype.SetNodePositionRecursive = function (node, spacingY, x, y) {
    this.setNodeXPostitionRecursive(node, x);

    var layoutHelper = new graphNodeLayoutHelper();

    this.setNodeYPositionRecursive(node, layoutHelper, spacingY, y);
}

azdataQueryPlan.prototype.setNodeXPostitionRecursive = function (node, x) {
    // Place the node at given position
    node.Position = new point(x, 0);
    // Initialize edges for the node and determine the recommanded minimal amount 
    // of spacing needed for them (when placing children), so they will look nice.
    var cleanedLabel = (node.label)
    var size = mxUtils.getSizeForString(cleanedLabel, mxConstants.DEFAULT_FONTSIZE,
        mxConstants.DEFAULT_FONTSIZE, undefined,
        mxConstants.DEFAULT_FONTSIZE);
    console.log(node);

    var recommandedMinimumSpacing = size.width > 100 ? size.width : 100;
    var spacingX = recommandedMinimumSpacing + this.paddingX;

    // Compute locally optimized X position for node's children
    x += spacingX;

    node.maxChildrenXPosition = node.Position.x + 70;
    // Display each child node at the X position just computed
    node.children.forEach(n => {
        n.parent = node;
        this.setNodeXPostitionRecursive(n, x);
        node.maxChildrenXPosition = Math.max(node.maxChildrenXPosition, n.maxChildrenXPosition)
    });

}

azdataQueryPlan.prototype.setNodeYPositionRecursive = function (node, layoutHelper, spacingY, y) {
    var newY = Math.max(y, layoutHelper.getYPositionForXPosition(node.maxChildrenXPosition));

    // Update Node's Y Position
    node.Position.y = newY;


    var yToUpdate = newY + spacingY;
    // Display each child node at the X position just computed
    node.children.forEach(n => {
        this.setNodeYPositionRecursive(n, layoutHelper, spacingY, newY);
        newY += spacingY;
    });

    var leftPosition = node.Position.x;

    layoutHelper.updateNodeLayout(leftPosition, yToUpdate);
}

azdataQueryPlan.prototype.registerZoomInListener = function (element, eventType) {
    this.graph.addZoomInListener(element, eventType);
};

azdataQueryPlan.prototype.registerZoomOutListener = function (element, eventType) {
    this.graph.addZoomOutListener(element, eventType);
};

azdataQueryPlan.prototype.registerGraphCallback = function (eventType, callback) {
    this.graph.addListener(eventType, (sender, event) => {
        this.graph.graphEventHandler(sender, event, callback);
    });
}

azdataQueryPlan.prototype.destroy = function () {
    if (!this.destroyed) {
        this.destroyed = true;
        this.container = null;
    }
};
