/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const GRAPH_PADDING_RIGHT = 48;
const GRAPH_PADDING_TOP = 16;
const GRAPH_PADDING_BOTTOM = 80;
const GRAPH_PADDING_LEFT = 80;
const CELL_WIDTH = 70;
const CELL_HEIGHT = 70;

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class GraphNodeLayoutHelper {
    constructor() {
        this.layoutPoints = [];
    }

    checkInvariant() {
        var last = new Point(0, 0);

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
            this.layoutPoints.push(new Point(xPosition, yPosition));
            return;
        }

        // Single Element
        if (this.layoutPoints.length === 1) {
            if (xPosition < this.layoutPoints[0].x) {
                this.layoutPoints.splice(0, 0, new Point(xPosition, yPosition));
            }
            else if (xPosition === this.layoutPoints[0].x) {
                this.layoutPoints[0] = new Point(this.layoutPoints[0].x, Math.max(this.layoutPoints[0].y, yPosition));
            }
            else {
                this.layoutPoints.push(new Point(xPosition, yPosition));
            }
            return;
        }

        // Insert Before First Element
        if (xPosition < this.layoutPoints[0].x &&
            yPosition < this.layoutPoints[0].y) {
            this.layoutPoints.splice(0, 0, new Point(xPosition, yPosition));
            return;
        }

        // Insert Last Element
        if (this.layoutPoints[this.layoutPoints.length - 1].x < xPosition &&
            this.layoutPoints[this.layoutPoints.length - 1].y < yPosition) {
            this.layoutPoints.push(new Point(xPosition, yPosition));
            return;
        }

        // Update Last Element
        if (this.layoutPoints[this.layoutPoints.length - 1].x == xPosition) {
            this.layoutPoints[this.layoutPoints.length - 1] = new Point(xPosition, Math.max(this.layoutPoints[this.layoutPoints.length - 1].y, yPosition));
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
            this.layoutPoints[insertIndex] = new Point(xPosition, Math.max(this.layoutPoints[insertIndex].y, yPosition));
        }
        else {
            this.layoutPoints.splice(insertIndex, 0, new Point(xPosition, yPosition));
        }

        // After we insert the point we need to remove following points if they have lower Y value.
        var lastIndex = insertIndex;

        while (lastIndex < this.layoutPoints.length) {
            if (this.layoutPoints[lastIndex].y > yPosition) {
                this.layoutPoints.splice(insertIndex + 1, lastIndex - insertIndex - 1);
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
    this.queryPlanGraph = queryPlanGraph;
    if (container != null && iconPaths != null) {
        this.init(container, iconPaths);
    }
};

azdataQueryPlan.prototype.init = function (container, iconPaths) {
    this.container = container;
    mxEvent.addListener(window, 'unload', mxUtils.bind(this, function () {
        this.destroy();
    }));

    mxEvent.disableContextMenu(container);

    var graph = new azdataGraph(container);
    this.graph = graph;
    this.rubberband = new mxRubberband(graph);
    this.keyHandler = new mxKeyHandler(graph);

    const arrowRightKey = 39;
    const selectNext = (evt) => {
        let currentCell = this.graph.getSelectionCell();
        if (currentCell && currentCell.vertex) {
            if (currentCell.edges.length === 1) {
                if (currentCell.edges[0].target !== currentCell) {
                    this.graph.setSelectionCell(currentCell.edges[0]);
                }
            }
            else if (currentCell.edges.length > 1) {
                this.graph.setSelectionCell(currentCell.edges[1]);
            }
        }
        else if (currentCell && currentCell.edge) {
            this.graph.setSelectionCell(currentCell.target);
        }
    };
    this.keyHandler.bindKey(arrowRightKey, selectNext);

    const arrowLeftKey = 37;
    const selectPrevious = (evt) => {
        let currentCell = this.graph.getSelectionCell();
        if (currentCell && currentCell.vertex) {
            if (currentCell.edges.length === 1) {
                if (currentCell.edges[0].source !== currentCell) {
                    this.graph.setSelectionCell(currentCell.edges[0]);
                }
            }
            else if (currentCell.edges.length > 1) {
                this.graph.setSelectionCell(currentCell.edges[0]);
            }
        }
        else if (currentCell && currentCell.edge) {
            this.graph.setSelectionCell(currentCell.source);
        }
    };
    this.keyHandler.bindKey(arrowLeftKey, selectPrevious);

    const arrowUpKey = 38;
    const selectTop = (evt) => {
        let currentCell = this.graph.getSelectionCell();
        if (currentCell && currentCell.edge) {
            let source = currentCell.source;

            let edgeIndex = 0;
            while (edgeIndex <= source.edges.length) {
                if (source.edges[edgeIndex] === currentCell) {
                    break;
                }
                ++edgeIndex;
            }

            --edgeIndex;
            if (edgeIndex >= 1) {
                this.graph.setSelectionCell(source.edges[edgeIndex]);
            }
        }
        else if (currentCell && currentCell.vertex) {
            let source = currentCell.edges[0].source;

            let edgeIndex = 1;
            while (edgeIndex <= source.edges.length - 1) {
                if (source.edges[edgeIndex].target === currentCell) {
                    break;
                }
                ++edgeIndex;
            }

            --edgeIndex;
            if (edgeIndex >= 1) {
                this.graph.setSelectionCell(source.edges[edgeIndex]);
            }
        }
    };
    this.keyHandler.bindKey(arrowUpKey, selectTop);

    const arrowDownKey = 40;
    const selectBottom = (evt) => {
        let currentCell = this.graph.getSelectionCell();
        if (currentCell && currentCell.edge) {
            let source = currentCell.source;

            let edgeIndex = 1;
            while (edgeIndex <= source.edges.length - 1) {
                if (source.edges[edgeIndex] === currentCell) {
                    break;
                }
                ++edgeIndex;
            }

            ++edgeIndex;
            if (edgeIndex <= source.edges.length - 1) {
                this.graph.setSelectionCell(source.edges[edgeIndex]);
            }
        }
        else if (currentCell && currentCell.vertex) {
            let source = currentCell.edges[0].source;

            let edgeIndex = 1;
            while (edgeIndex <= source.edges.length - 1) {
                if (source.edges[edgeIndex].target === currentCell) {
                    break;
                }
                ++edgeIndex;
            }

            ++edgeIndex;
            if (edgeIndex <= source.edges.length - 1) {
                let edge = source.edges[edgeIndex];
                this.graph.setSelectionCell(edge.target);
            }
        }
    };
    this.keyHandler.bindKey(arrowDownKey, selectBottom);

    var style = graph.getStylesheet().getDefaultEdgeStyle();
    style[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector;

    graph.centerZoom = false;
    this.enablePanning(true);
    graph.setTooltips(true);
    graph.setEnabled(true);
    graph.setPanning(true);
    graph.panningHandler.useLeftButtonForPanning = true;
    graph.centerZoom = false;
    graph.resizeContainer = false;
    graph.autoSizeCellsOnAdd = true;
    graph.autoExtend = false; //disables the size of the graph automatically extending if the mouse goes near the container edge while dragging.
    graph.getSelectionModel().setSingleSelection(true); //Forcing only single cell selection in graph

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
    layout.disableEdgeStyle = false;

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

        this.placeGraphNodes();

        var rand = Math.floor((Math.random() * icons.length));

        var iconName = undefined;
        if (this.queryPlanGraph.icon) {
            iconName = 'azdataQueryplan-' + this.queryPlanGraph.icon
        } else {
            iconName = 'azdataQueryplan-' + icons[rand];
        }

        var maxX = this.queryPlanGraph.position.x;
        var maxY = this.queryPlanGraph.position.y;

        var vertex = graph.insertVertex(parent, this.queryPlanGraph.id, this.queryPlanGraph, this.queryPlanGraph.position.x, this.queryPlanGraph.position.y, CELL_WIDTH, CELL_HEIGHT, iconName);
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
                    if(node.position.x > maxX){
                        maxX = node.position.x;
                    }
                    if(node.position.y > maxY){
                        maxY = node.position.y;
                    }
                    vertex = graph.insertVertex(parent, node.id, node, node.position.x, node.position.y, CELL_WIDTH, CELL_HEIGHT, iconName);
                    var edge = entry.node.edges[i];
                    graph.insertWeightedInvertedEdge(parent, edge.id, edge, entry.vertex, vertex);
                    stack.push(
                        {
                            vertex: vertex,
                            node: node
                        });
                }
            }
        }
        // Adding a very small cell to the parent for padding on the bottom right corner of the graph. 
        vertex = graph.insertVertex(parent, 'paddingVertex', undefined, maxX + CELL_WIDTH + GRAPH_PADDING_LEFT, maxY + CELL_HEIGHT + GRAPH_PADDING_BOTTOM, 0.0001, 0.0001, '');
    }
    finally {
        graph.getModel().endUpdate();
    }
};

/**
 * Since we need to display query plan in very particular format, we will use this function
 * to add x, y coordinates graph nodes. 
 */
azdataQueryPlan.prototype.placeGraphNodes = function () {
    // Setting how much Y coords should be increased for each row
    // for aesthetic  reasons this value is constant across all nodes
    // for entire showplan. For starters, we set this to 100px. However,
    // if a node has label with many lines, this value will be updated to 
    // better fit that node.
    this.spacingY = 100;

    // Getting the node padding values from SSMS.
    this.paddingX = GRAPH_PADDING_RIGHT;
    this.paddingY = GRAPH_PADDING_TOP;

    // Getting a good enough start value for the root node.
    var startX = (this.paddingX + 150) / 2;
    var startY = (this.paddingY + 150) / 2;

    // Recursively layout all nodes starting with root
    this.SetNodePositionRecursive(this.queryPlanGraph, startX, startY);
}


azdataQueryPlan.prototype.SetNodePositionRecursive = function (node, x, y) {

    // Recursively setting all the x positions in the graph.
    this.setNodeXPositionRecursive(node, x);
    var layoutHelper = new GraphNodeLayoutHelper();
    this.setNodeYPositionRecursive(node, layoutHelper, this.spacingY, y);

}


azdataQueryPlan.prototype.setNodeXPositionRecursive = function (node, x) {
    // Place the node at given position
    node.position = new Point(x, 0);

    // Determining the recommended minimal amount of spacing needed 
    // for them (when placing children), so they will look nice.

    // Using a mxUtils function to determine how much space is needed for the label.
    // Cleaning the label string as mention in the mxGraph docs https://jgraph.github.io/mxgraph/docs/js-api/files/util/mxUtils-js.html#mxUtils.getSizeForString 
    var cleanedLabel = node.label.replace(/\n/g, "<br>");

    // Assuming default stylings for 
    var size = mxUtils.getSizeForString(cleanedLabel, mxConstants.DEFAULT_FONTSIZE,
        mxConstants.DEFAULT_FONTFAMILY, undefined,
        mxConstants.DEFAULT_FONTSTYLE);

    // Determining the right height for the node. Here, 50px is the appropriate space for node icons.
    this.spacingY = Math.max(this.spacingY, 50 + size.height);

    // There is no good logic for 125px here. However, trying this on 
    // graph gives the best visual results.
    var recommendedMinimumSpacing = size.width > 125 ? size.width : 125;
    var spacingX = recommendedMinimumSpacing + this.paddingX;

    // Compute locally optimized X position for node's children
    x += spacingX;

    // Storing the max X position of the children. 
    // This will later help us in determining the y coordinates for them.
    node.maxChildrenXPosition = node.position.x;
    // Display each child node at the X position just computed
    node.children.forEach(n => {
        n.parent = node;
        this.setNodeXPositionRecursive(n, x);
        node.maxChildrenXPosition = Math.max(node.maxChildrenXPosition, n.maxChildrenXPosition);
    });

}

azdataQueryPlan.prototype.setNodeYPositionRecursive = function (node, layoutHelper, y) {
    var newY = Math.max(y, layoutHelper.getYPositionForXPosition(node.maxChildrenXPosition));

    // Update Node's Y Position
    node.position.y = newY;

    var yToUpdate = newY + this.spacingY;
    // Display each child node at the X position just computed
    node.children.forEach(n => {
        this.setNodeYPositionRecursive(n, layoutHelper, newY);
        newY += this.spacingY;
    });

    var leftPosition = node.position.x;

    layoutHelper.updateNodeLayout(leftPosition, yToUpdate);
}

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

azdataQueryPlan.prototype.getZoomLevelPercentage = function () {
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

azdataQueryPlan.prototype.addZoomInRectListener = function () {
    let self = this;
    mxRubberband.prototype.mouseUp = function (sender, event) {
        let execute = self.container && this.width !== undefined && this.height !== undefined;
        this.reset();

        if (execute) {
            let rect = new mxRectangle(this.x, this.y, this.width, this.height);
            self.graph.zoomToRect(rect);
            event.consume();
        }
    };
};

azdataQueryPlan.prototype.enablePanning = function (panning) {
    this.graph.panningHandler.useLeftButtonForPanning = panning;
    this.graph.setPanning(panning);
};

azdataQueryPlan.prototype.setIconBackgroundColor = function (color) {
    const allVertices = this.graph.model.getChildCells(this.graph.getDefaultParent());
    this.graph.setCellStyles(mxConstants.STYLE_FILLCOLOR, color, allVertices);
    this.graph.setCellStyles(mxConstants.STYLE_STROKECOLOR, color, allVertices);

};

azdataQueryPlan.prototype.setTextFontColor = function (color) {
    this.graph.setCellStyles(mxConstants.STYLE_FONTCOLOR, color, this.graph.model.getChildCells(this.graph.getDefaultParent()));
};

azdataQueryPlan.prototype.setEdgeColor = function (color) {
    this.graph.setCellStyles(mxConstants.STYLE_STROKECOLOR, color, this.graph.model.getChildEdges(this.graph.getDefaultParent()));
};

azdataQueryPlan.prototype.destroy = function () {
    if (!this.destroyed) {
        this.destroyed = true;
        this.container = null;
    }
};
