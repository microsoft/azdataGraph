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
const STANDARD_NODE_DISTANCE = 173;
const IDEAL_LONG_LABEL_NODE_DISTANCE = 240;

// Setting this to 38 because SSMS truncates labels longer than 38 characters
const LABEL_LENGTH_LIMIT = 38;

const NODE_HEIGHT = 105;
const NODE_WIDTH = 100;

class PolygonRoot {
    constructor(cell, fillColor, strokeColor, strokeWidth) {
        this.cell = cell;
        this.fillColor = fillColor;
        this.strokeColor = strokeColor;
        this.strokeWidth = strokeWidth;
    }
}

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



function azdataQueryPlan(container, queryPlanGraph, iconPaths, badgeIconPaths) {
    this.queryPlanGraph = queryPlanGraph;
    if (container != null && iconPaths != null) {
        this.init(container, iconPaths, badgeIconPaths);
    }
};

azdataQueryPlan.prototype.init = function (container, iconPaths, badgeIconPaths) {
    this.container = container;
    this.polygonRoots = [];
    this.drawnPolygons = [];
    this.badges = [];
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
                let edge = source.edges[edgeIndex];
                this.graph.setSelectionCell(edge.target);
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
            let hasWindowsEOL = cell.value.label.includes('\r\n');
            const joinStrings = (strArray) => {
                if (hasWindowsEOL) {
                    return strArray.join('\r\n');
                }
                else {
                    return strArray.join('\n');
                }
            };


            let splitLabel = cell.value.label.split(/\r\n|\n/);
            let cellLabel = splitLabel.map((str, index) => {
                let label = '';
                if (index === 0 && !cell.value.icon?.includes('columnstore')) {
                    // This regex removes any text contained in parenthesis in the operation name
                    // i.e. "Clustered Index Seek (Clustered)" becomes "Clustered Index Seek"
                    label += str.replace(/\(([^)]+)\)/g, '');
                }
                else if (index === 1 && splitLabel.length >= 3 && str.includes('.')) {
                    let splitStr = str.split(' ');
                    splitStr = splitStr.map(str => {
                        if (str.length >= LABEL_LENGTH_LIMIT) {
                            // subtracting 3 for ellipse to fit in character limit
                            return str.substring(0, LABEL_LENGTH_LIMIT - 3) + '...';
                        }
                        else {
                            return str;
                        }
                    });
                    
                    label += joinStrings(splitStr);
                }
                else {
                    label += str;
                }

                return label;
            });

            cellLabel = joinStrings(cellLabel);

            return cellLabel;
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
    style[mxConstants.STYLE_STROKECOLOR] = 'transparent';
    style[mxConstants.STYLE_FILLCOLOR] = 'transparent';
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
        this.addBadges(vertex, badgeIconPaths);

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

                    if (node.position.x > maxX) {
                        maxX = node.position.x;
                    }

                    if (node.position.y > maxY) {
                        maxY = node.position.y;
                    }

                    vertex = graph.insertVertex(parent, node.id, node, node.position.x, node.position.y, CELL_WIDTH, CELL_HEIGHT, iconName);
                    this.addBadges(vertex, badgeIconPaths);

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
    this.spacingY = NODE_HEIGHT;

    // Getting the node padding values from SSMS.
    this.paddingX = GRAPH_PADDING_RIGHT;
    this.paddingY = GRAPH_PADDING_TOP;

    // Getting a good enough start value for the root node.
    var startX = (this.paddingX + 150) / 2;
    var startY = (this.paddingY + 150) / 2;

    // Recursively layout all nodes starting with root
    this.setNodePositionRecursive(this.queryPlanGraph, startX, startY);
}

azdataQueryPlan.prototype.setNodePositionRecursive = function (node, x, y) {

    // Recursively setting all the x positions in the graph.
    this.setNodeXPositionRecursive(node, x);
    var layoutHelper = new GraphNodeLayoutHelper();
    this.setNodeYPositionRecursive(node, layoutHelper, this.spacingY, y);
    this.adjustGraphNodeHorizontalPositions(node);
}

azdataQueryPlan.prototype.setNodeXPositionRecursive = function (node, x) {
    // Place the node at given position
    node.position = new Point(x, 0);

    // Determining the recommended minimal amount of spacing needed 
    // for them (when placing children), so they will look nice.

    // Using a mxUtils function to determine how much space is needed for the label.
    // Cleaning the label string as mention in the mxGraph docs https://jgraph.github.io/mxgraph/docs/js-api/files/util/mxUtils-js.html#mxUtils.getSizeForString 
    var cleanedLabel = node.label.replace(/\n|\r\n/g, "<br>");

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
    node.children.forEach(childNode => {
        childNode.parent = node;
        this.setNodeXPositionRecursive(childNode, x);
        node.maxChildrenXPosition = Math.max(node.maxChildrenXPosition, childNode.maxChildrenXPosition);
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

azdataQueryPlan.prototype.adjustGraphNodeHorizontalPositions = function (node) {
    let levelsTable = this.getNodesByHorizontalLevel(node);

    Object.keys(levelsTable).map(key => {
        for (let levelNodeIndex = 1; levelNodeIndex < levelsTable[key].length; ++levelNodeIndex) {
            let previousNode = levelsTable[key][levelNodeIndex - 1];
            let currentNode = levelsTable[key][levelNodeIndex];

            let previousLabel = previousNode.label.split(/\r\n|\n/).filter(str => str.length > 20);
            if (previousLabel.length !== 0) {
                let longestString = '';
                let labelPartitions = currentNode.label.split(/\r\n|\n/g);
                labelPartitions.forEach(str => {
                    if (longestString.length < str.length) {
                        longestString = str;
                    }
                });

                var size = mxUtils.getSizeForString(longestString.substring(0, LABEL_LENGTH_LIMIT),
                    mxConstants.DEFAULT_FONTSIZE,
                    mxConstants.DEFAULT_FONTFAMILY,
                    undefined,
                    mxConstants.DEFAULT_FONTSTYLE);

                let distanceFromPreviousNode = currentNode.position.x - previousNode.position.x;

                if (distanceFromPreviousNode <= STANDARD_NODE_DISTANCE) {
                    let shiftToRightAmount = Math.max(size.width, IDEAL_LONG_LABEL_NODE_DISTANCE) - distanceFromPreviousNode;
                    currentNode.position.x += shiftToRightAmount;

                    this.shiftParentAndChildNodePositionsHorizontally(currentNode.parent, shiftToRightAmount);
                }
            }
        }
    });
}

azdataQueryPlan.prototype.shiftParentAndChildNodePositionsHorizontally = function (parent, shiftAmount) {
    let stack = [...parent.children];

    while (stack.length !== 0) {
        let currentNode = stack.pop();
        let currentNodeParent = currentNode.parent;
        if (currentNode.position.x - currentNodeParent.position.x < IDEAL_LONG_LABEL_NODE_DISTANCE) {
            currentNode.position.x += shiftAmount;
        }

        for (let childIndex = 0; childIndex < currentNode.children.length; ++childIndex) {
            stack.push(currentNode.children[childIndex]);
        }
    }
}

azdataQueryPlan.prototype.getNodesByHorizontalLevel = function (node) {
    let table = {};
    let stack = [node];

    while (stack.length !== 0) {
        let entry = stack.pop();
        if (entry.position.y in table) {
            table[entry.position.y].push(entry);
        }
        else {
            table[entry.position.y] = [];
            table[entry.position.y].push(entry);
        }

        for (let i = 0; i < entry.children.length; ++i) {
            stack.push(entry.children[i]);
        }
    }

    return table;
}

azdataQueryPlan.prototype.zoomIn = function () {
    if (this.graph.view.getScale() * this.graph.zoomFactor <= 2) {
        this.graph.zoomIn();
    } else {
        this.graph.zoomTo(2)
    }
    this.redrawBadges();
    this.renderPolygons();
}

azdataQueryPlan.prototype.zoomOut = function () {
    this.graph.zoomOut();
    this.redrawBadges();
    this.renderPolygons();
}

azdataQueryPlan.prototype.zoomToFit = function () {
    this.graph.fit(undefined, true, 20);
    this.redrawBadges();
    this.renderPolygons();
}

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
    const ZOOM_PERCENTAGE_MAXIMUM = 200;

    let parsedZoomLevel = parseInt(zoomPercentage);
    if (isNaN(parsedZoomLevel)) {
        return;
    }

    if (parsedZoomLevel < ZOOM_PERCENTAGE_MINIMUM) {
        parsedZoomLevel = ZOOM_PERCENTAGE_MINIMUM;
    }

    if (parsedZoomLevel > ZOOM_PERCENTAGE_MAXIMUM) {
        parsedZoomLevel = ZOOM_PERCENTAGE_MAXIMUM;
    }

    let zoomScale = parsedZoomLevel / 100;
    this.graph.zoomTo(zoomScale);
    this.redrawBadges();
    this.renderPolygons();
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

azdataQueryPlan.prototype.addBadges = function (cell, badgeIconPaths) {
    let positionX = cell.geometry.x + 50;
    const positionY = cell.geometry.y + 35;
    const badgeWidth = 16;
    const badgeHeight = 16;
    if (cell.value.badges) {
        cell.value.badges.forEach(b => {
            var img = mxUtils.createImage(badgeIconPaths[b.type]);
            img.setAttribute('title', b.tooltip);
            img.style.position = 'absolute';
            img.style.cursor = 'pointer';
            img.style.width = `${badgeWidth}px`;
            img.style.height = `${badgeHeight}px`;
            img.style.left = `${positionX}px`;
            img.style.top = `${positionY}px`;
            img.setAttribute('initLeft', positionX);
            img.setAttribute('initTop', positionY);
            img.setAttribute('initHeight', badgeHeight);
            img.setAttribute('initWidth', badgeWidth);
            this.graph.container.appendChild(img);
            positionX += badgeWidth;
            this.badges.push(img);
        });
    }
}

azdataQueryPlan.prototype.redrawBadges = function () {
    this.badges.forEach(b => {
        b.style.left = b.getAttribute('initLeft') * this.graph.view.getScale() + 'px';
        b.style.top = b.getAttribute('initTop') * this.graph.view.getScale() + 'px';
        b.style.width = b.getAttribute('initWidth') * this.graph.view.getScale() + 'px';
        b.style.height = b.getAttribute('initHeight') * this.graph.view.getScale() + 'px';
    });
}

/**
 * Draws a polygon using the points given
 * @param {*} cell starting cell where the polygon will start to be drawn. 
 * @param {*} fillColor string value for the fill color. Supported values are hex, rbg and rbga
 * @param {*} strokeColor string value for the stroke/border color. Supported values are hex, rbg and rbga
 * @param {*} strokeWidth thickness of the stroke
 */
azdataQueryPlan.prototype.drawPolygon = function (cell, fillColor, strokeColor, strokeWidth) {
    if (!this.polygonModels) {
        this.polygonModels = [];
    }
    this.polygonModels.push({
        root: cell,
        fillColor: fillColor,
        strokeColor: strokeColor,
        strokWidth: strokeWidth
    });
    this.renderPolygons();
}

/**
 * Removes all drawn polygons on the execution plan.
 */
azdataQueryPlan.prototype.removeDrawnPolygons = function () {
    this.drawnPolygons.forEach(polygon => {
        polygon.destroy();
    });
    this.drawnPolygons = [];
    this.polygonModels = [];
}

azdataQueryPlan.prototype.renderPolygons = function () {
    if (this.drawnPolygons?.length > 0) {
        this.drawnPolygons.forEach(polygon => {
            polygon.destroy();
        });
    }
    this.drawnPolygons = [];

    if (this.polygonModels) {
        this.polygonModels.forEach(p => {
            const points = this.getPolygonPerimeter(p.root);
            const scale = this.graph.view.getScale();
            var polygon = new mxPolygon(
                points.map(point => new mxPoint(point.x * scale, point.y * scale)),
                p.fillColor,
                p.strokeColor,
                p.strokeWidth
            );
            this.drawnPolygons.push(polygon);
            polygon.init(this.graph.getView().getBackgroundPane());
            polygon.isDashed = true;
            polygon.redraw();
        });
    }
}

/**
 * Gets an array of points that represents the perimeter for a polygon.
 * @param {*} cell The starting node where the perimeter will start being outlined.
 * @returns an array of points
 */
azdataQueryPlan.prototype.getPolygonPerimeter = function (cell) {
    let points = [];
    points = points.concat(this.getLeftSidePoints(cell));
    let rightSidePoints = this.getRightSidePoints(cell);
    points = points.concat(this.getBottomSidePoints(cell, rightSidePoints[0].x));
    points = points.concat(rightSidePoints);

    return points;
}

/**
 * Gets the left side points for the starting node in the polygon from top to bottom.
 * @param {*} cell The starting node for the left side perimeter points.
 * @returns an array of points for the left side of the starting node in the polygon.
 */
azdataQueryPlan.prototype.getLeftSidePoints = function (cell) {
    let points = [];

    // let additionalLeftSideSpacing = longestSubLabel % 10 * 25;
    let additionalLeftSideSpacing = this.calcAdditionalSpacingForNode(cell);
    
    let xPosition = cell.geometry.x - 15; // subtracting to push the x coordinate to the left.
    points.push({ x: xPosition - additionalLeftSideSpacing, y: cell.geometry.y });
    points.push({ x: xPosition - additionalLeftSideSpacing, y: cell.geometry.y + NODE_HEIGHT });

    return points;
}

/**
 * Gets the points for what will be the bottom side of the polygon from left to right.
 * @param {*} cell The starting node where highlighting will begin.
 * @returns An array of points for the bottom side of the polygon.
 */
azdataQueryPlan.prototype.getBottomSidePoints = function (cell, polygonRightSideConstraint) {
    let points = [];
    let bottomSideNodes = this.getBottomSideNodes(cell, polygonRightSideConstraint);

    bottomSideNodes.forEach(node => {
        let lastPoint = points.length > 0 ? points[points.length - 1] : null;

        let newPoint = { x: node.geometry.x, y: node.geometry.y + NODE_HEIGHT };

        if (lastPoint && newPoint.y !== lastPoint.y) {
            let auxiliaryPoint = { x: lastPoint.x, y: newPoint.y };
            points.push(auxiliaryPoint);
        }

        let cell = this.graph.model.getCell(node.id);
        let additionalSpacing = Math.max(...(cell.value.label.split(/\r\n|\n/).map(str => str.length))) > 20 ? this.calcAdditionalSpacingForNode(cell) : 0;

        points.push({ x: node.geometry.x, y: node.geometry.y + NODE_HEIGHT });
        points.push({ x: node.geometry.x + NODE_WIDTH + additionalSpacing, y: node.geometry.y + NODE_HEIGHT });
    });

    return points;
}

azdataQueryPlan.prototype.getBottomSideNodes = function (cell, polygonRightSideConstraint) {
    let queue = [cell];
    let nodes = [];

    while (queue.length !== 0) {
        let levelNodeCount = queue.length;

        for (let nodeIndex = 0; nodeIndex < levelNodeCount; ++nodeIndex) {
            let entry = queue.shift();

            if (nodeIndex === levelNodeCount - 1 && entry.geometry.x < polygonRightSideConstraint) {
                nodes.push(entry)
            }

            for (let childIndex = 0; childIndex < entry.value.children.length; ++childIndex) {
                if (entry.geometry.x < polygonRightSideConstraint) {
                    queue.push(this.graph.model.getCell(entry.value.children[childIndex].id));
                }
            }
        }
    }

    return nodes;
}

/**
 * Gets the points for what will be the right side of the polygon from left to right.
 * @param {*} cell The starting node where highlighting will begin.
 * @returns An array of points for the right side of the polygon.
 */
azdataQueryPlan.prototype.getRightSidePoints = function (cell) {
    let points = [];
    let leafs = this.getLeafNodes(cell);

    for (let leafIndex = 0; leafIndex < leafs.length; ++leafIndex) {
        let leaf = leafs[leafIndex];

        let additionalRightSideSpacing = this.calcAdditionalSpacingForNode(leaf);

        points.push({ x: leaf.geometry.x + NODE_WIDTH + additionalRightSideSpacing, y: leaf.geometry.y + NODE_HEIGHT });
        points.push({ x: leaf.geometry.x + NODE_WIDTH + additionalRightSideSpacing, y: leaf.geometry.y });
    }

    return points;
}

azdataQueryPlan.prototype.calcAdditionalSpacingForNode = function(cell) {
    let longestSubLabel = Math.max(...(cell.value.label.split(/\r\n|\n/).map(str => str.length)));
    if (longestSubLabel > LABEL_LENGTH_LIMIT) {
        longestSubLabel = LABEL_LENGTH_LIMIT;
    }
    // These values to work best for drawing regions around labels of different lengths, so the label is always inside the polygon.
    return longestSubLabel / 10 * 15;
}

/**
 * Helper function to get the right most nodes of the polygon in a execution plan
 * @param {*} cell The root node that will be used to find all of the leaf nodes
 * @returns An array of leaf nodes for a region from bottom-up
 */
azdataQueryPlan.prototype.getLeafNodes = function (cell) {
    let leafNodeTable = {};
    let stack = [cell];

    while (stack.length !== 0) {
        let entry = stack.pop();

        if (entry.value.children.length === 0) {
            if (entry.geometry.y in leafNodeTable) {
                let previouslyCachedEntry = leafNodeTable[entry.geometry.y];
                if (entry.geometry.x > previouslyCachedEntry.geometry.x) {
                    leafNodeTable[entry.geometry.y] = entry;
                }
            }
            else {
                leafNodeTable[entry.geometry.y] = entry;
            }
        }

        for (let nodeIndex = 0; nodeIndex < entry.value.children.length; ++nodeIndex) {
            stack.push(this.graph.model.getCell(entry.value.children[nodeIndex].id));
        }
    }

    let leafNodes = Object.keys(leafNodeTable).map(key => leafNodeTable[key]).reverse();

    return leafNodes;
}

__mxOutput.azdataQueryPlan = typeof azdataQueryPlan !== 'undefined' ? azdataQueryPlan : undefined;
