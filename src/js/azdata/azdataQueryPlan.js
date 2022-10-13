/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const GRAPH_PADDING_RIGHT = 40;
const GRAPH_PADDING_TOP = 0;
const GRAPH_PADDING_BOTTOM = 80;
const GRAPH_PADDING_LEFT = 40;
const CELL_WIDTH = 80;
const CELL_HEIGHT = 80;
const STANDARD_NODE_DISTANCE = 173;
const IDEAL_LONG_LABEL_NODE_DISTANCE = 240;
const CELL_ICON_HEIGHT = 30;
const CELL_COST_HEIGHT = 15;
const MAX_ALLOWED_NODE_WIDTH = 200;
const MIN_ALLOWED_NODE_WIDTH = 80;

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

    /**
     * Updated node layout to prevent overlapping nodes
     * @param {*} nodeLevel: depth of the node from the root of the tree. 0 is the root node.
     * @param {*} yPosition: y position of the node.
     * @returns 
     */
    updateNodeLayout(nodeLevel, yPosition) {
        this.checkInvariant();

        // First cover edge cases

        // Empty list
        if (this.layoutPoints.length === 0) {
            this.layoutPoints.push(new Point(nodeLevel, yPosition));
            return;
        }

        // Single Element
        if (this.layoutPoints.length === 1) {
            if (nodeLevel < this.layoutPoints[0].x) {
                this.layoutPoints.unshift(new Point(nodeLevel, yPosition));
            }
            else if (nodeLevel === this.layoutPoints[0].x) {
                this.layoutPoints[0] = new Point(this.layoutPoints[0].x, Math.max(this.layoutPoints[0].y, yPosition));
            }
            else {
                this.layoutPoints.push(new Point(nodeLevel, yPosition));
            }

            return;
        }

        // Insert Before First Element
        if (nodeLevel < this.layoutPoints[0].x &&
            yPosition < this.layoutPoints[0].y) {
            this.layoutPoints.unshift(new Point(nodeLevel, yPosition));
            return;
        }

        // Insert Last Element
        if (this.layoutPoints[this.layoutPoints.length - 1].x < nodeLevel &&
            this.layoutPoints[this.layoutPoints.length - 1].y < yPosition) {
            this.layoutPoints.push(new Point(nodeLevel, yPosition));
            return;
        }

        // Update Last Element
        if (this.layoutPoints[this.layoutPoints.length - 1].x === nodeLevel) {
            this.layoutPoints[this.layoutPoints.length - 1] = new Point(nodeLevel, Math.max(this.layoutPoints[this.layoutPoints.length - 1].y, yPosition));
            return;
        }

        // Insert Point 

        // First find insert index
        var insertIndex = 0;
        for (var i = 0; i < this.layoutPoints.length; i++) {
            if (nodeLevel <= this.layoutPoints[i].x) {
                insertIndex = i;
                break;
            }
        }

        // Perform Insert or Update.
        if (nodeLevel === this.layoutPoints[insertIndex].x) {
            this.layoutPoints[insertIndex] = new Point(nodeLevel, Math.max(this.layoutPoints[insertIndex].y, yPosition));
        }
        else {
            this.layoutPoints.splice(insertIndex, 0, new Point(nodeLevel, yPosition));
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
        this.layoutPoints.splice(insertIndex + 1, this.layoutPoints.length - insertIndex - 1);
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


function azdataQueryPlan(queryPlanConfiguration) {
    this.queryPlanGraph = queryPlanConfiguration.queryPlanGraph;
    if (queryPlanConfiguration.container != null && queryPlanConfiguration.iconPaths != null) {
        this.init(queryPlanConfiguration);
    }
}

azdataQueryPlan.prototype.init = function (queryPlanConfiguration) {
    const { container, iconPaths, badgeIconPaths, expandCollapsePaths, showTooltipOnClick } = queryPlanConfiguration;
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
    this.graph.firstLoad = true;
    this.rubberband = new mxRubberband(graph);
    this.keyHandler = new mxKeyHandler(graph);

    const arrowRightKey = 39;
    const selectNext = (evt) => {
        graph.tooltipHandler.hide();
        let currentCell = this.graph.getSelectionCell();
        if (currentCell.collapsed) {
            return;
        }
        if (currentCell && currentCell.vertex) {
            if (currentCell.edges.length === 1) {
                if (currentCell.edges[0].target !== currentCell) {
                    this.graph.setSelectionCell(currentCell.edges[0].target);
                }
            }
            else if (currentCell.edges.length > 1) {
                this.graph.setSelectionCell(currentCell.edges[1].target);
            }
        }
        else if (currentCell && currentCell.edge) {
            this.graph.setSelectionCell(currentCell.target);
        }
    };
    this.keyHandler.bindKey(arrowRightKey, selectNext);

    const arrowLeftKey = 37;
    const selectPrevious = (evt) => {
        graph.tooltipHandler.hide();
        let currentCell = this.graph.getSelectionCell();
        if (currentCell && currentCell.vertex) {
            if (currentCell.edges.length === 1) {
                if (currentCell.edges[0].source !== currentCell) {
                    this.graph.setSelectionCell(currentCell.edges[0].source);
                }
            }
            else if (currentCell.edges.length > 1) {
                this.graph.setSelectionCell(currentCell.edges[0].source);
            }
        }
        else if (currentCell && currentCell.edge) {
            this.graph.setSelectionCell(currentCell.source);
        }
    };
    this.keyHandler.bindKey(arrowLeftKey, selectPrevious);

    const arrowUpKey = 38;
    const selectTop = (evt) => {
        graph.tooltipHandler.hide();
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
        graph.tooltipHandler.hide();
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

    graph.keepEdgesInBackground = true;
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
    graph.cellsResizable = false;
    graph.cellsMovable = false;
    graph.edgeMovable = false;
    graph.setHtmlLabels(true);
    graph.container.setAttribute('role', 'tree');

    if (showTooltipOnClick) {
        this.graph.showTooltipOnClick = showTooltipOnClick;
        graph.tooltipHandler.setEnabled(false);
    }

    graph.isCellSelectable = (cell) => {
        if (cell?.isEdge()) {
            return false;
        }
        return true;
    };

    graph.getSelectionModel().addListener(mxEvent.CHANGE, function (sender, evt) {
        if (graph.getSelectionCount() === 1) {
            const cell = graph.getSelectionCell();

            if (evt?.properties?.added) {
                evt.properties.added.forEach(cell => {
                    if (cell?.cellDivs?.body) {
                        if (cell.edge) {
                            const edgeElement = document.getElementById(cell.id);
                            edgeElement.tabIndex = -1;
                        } else {
                            cell.cellDivs.body.tabIndex = -1;
                        }
                    }
                });
            }

            if (evt?.properties?.removed) {
                evt.properties.removed.forEach(cell => {
                    if (cell?.cellDivs?.body) {
                        if (cell.edge) {
                            const edgeElement = document.getElementById(cell.id);
                            edgeElement.tabIndex = 0;
                            edgeElement.focus();
                        } else {
                            cell.cellDivs.body.tabIndex = 0;
                            cell.cellDivs.body.focus();
                        }
                    }
                });
            }
        }
    });

    let self = this;
    graph.convertValueToString = function (cell) {
        if (cell.value != null && cell.value.label != null) {
            const cellDivs = new Object();

            // Getting the state of the old tabIndex of the cell. This is needed to restore the old tabIndex after the cell is re-rendered.
            const oldTabIndex = cell?.cellDivs?.body?.tabIndex ?? -1;

            cell.cellDivs = cellDivs;

            const cellContainer = document.createElement('div');
            cellDivs.container = cellContainer
            cellContainer.setAttribute('class', 'graph-cell');
            const cellBodyContainer = document.createElement('div');
            cellDivs.body = cellBodyContainer;
            cellBodyContainer.setAttribute('class', 'graph-cell-body');
            cellBodyContainer.setAttribute('role', 'treeitem');

            if (cell.isVertex() && cell?.value?.children?.length > 0) {
                cellBodyContainer.setAttribute('aria-expanded', !cell.collapsed);
            }

            cellBodyContainer.setAttribute('aria-level', cell.value.depth);
            cellBodyContainer.setAttribute('aria-posinset', cell.value.posInSet);
            cellBodyContainer.setAttribute('aria-setsize', cell.value.setSize);
            if (cell.value.ariaLabel) {
                cellBodyContainer.setAttribute('aria-label', cell.value.ariaLabel);
            }
            cellContainer.appendChild(cellBodyContainer);

            mxEvent.addListener(cellBodyContainer, 'focus', (evt) => {
                this.setSelectionCell(cell);
                if (cell.highlightShape) {
                    cell.highlightShape.isDashed = false;
                    cell.highlightShape.redraw();
                    cell.highlightShape.updateBoundingBox();
                }
            });

            mxEvent.addListener(cellBodyContainer, 'blur', (evt) => {
                if (cell.highlightShape) {
                    cell.highlightShape.isDashed = true;
                    cell.highlightShape.redraw();
                    cell.highlightShape.updateBoundingBox();
                }
            });

            mxEvent.addListener(cellContainer, 'click', (evt) => {
                if (this.showTooltipOnClick) {
                    const cell = this.getSelectionCell();
                    const tooltip = this.getTooltipForCell(cell);
                    if (cell?.geometry) {
                        this.tooltipHandler.show(tooltip, evt.clientX, evt.clientY, cell);
                    }
                }
            });

            mxEvent.addListener(cellBodyContainer, 'keydown', (evt) => {
                if (this.showTooltipOnClick) {
                    if (evt.key === 'F3') {
                        if (this.tooltipHandler.isVisible) {
                            this.tooltipHandler.hide();
                        } else {
                            const cell = this.getSelectionCell();
                            if (cell?.geometry) {
                                const cellContainerRect = cellBodyContainer.getBoundingClientRect();
                                this.tooltipHandler.show(this.getTooltipForCell(cell), cellContainerRect.x + cellContainerRect.width, cellContainerRect.y + cellContainerRect.height, cell);
                            }
                        }
                        evt.preventDefault();
                        evt.stopPropagation();
                    } else if (evt.key === 'Escape') {
                        this.tooltipHandler.hide();
                        evt.preventDefault();
                        evt.stopPropagation();
                    }
                }
            });

            if (cell.edge) {
                cellBodyContainer.id = cell.id;

                return cellContainer;
            }

            const costContainer = document.createElement('div');
            costContainer.setAttribute('class', 'graph-cell-cost');
            costContainer.innerHTML = cell.value.costDisplayString;
            cellBodyContainer.appendChild(costContainer);

            const iconContainer = document.createElement('div');
            iconContainer.setAttribute('class', 'graph-cell-icon');
            iconContainer.style.backgroundImage = 'url(' + iconPaths[cell.value.icon] + ')';
            cellBodyContainer.appendChild(iconContainer);

            if (cell.value.badges) {
                cell.value.badges.forEach(b => {
                    const badgeIconPath = badgeIconPaths[b.type];
                    const badgeIcon = document.createElement('div');
                    badgeIcon.setAttribute('class', 'graph-icon-badge');
                    badgeIcon.style.backgroundImage = 'url(' + badgeIconPath + ')';
                    iconContainer.appendChild(badgeIcon);
                });
            }

            let expandCollapse;
            if (cell.value.children && cell.value.children.length > 0) {
                expandCollapse = document.createElement('a');
                expandCollapse.setAttribute('class', 'graph-icon-badge-expand');
                const icon = cell.collapsed ? expandCollapsePaths.expand : expandCollapsePaths.collapse;
                expandCollapse.style.backgroundImage = 'url(' + icon + ')';
                cellBodyContainer.appendChild(expandCollapse);
                mxEvent.addListener(expandCollapse, 'click', (evt) => {

                    const currentCell = cell;
                    const collapse = !currentCell.collapsed;
                    const icon = collapse ? expandCollapsePaths.expand : expandCollapsePaths.collapse;
                    expandCollapse.style.backgroundImage = 'url(' + icon + ')';

                    // undefined is for the middle parameter since the overwritten definition of foldCells doesn't reference it.
                    this.foldCells(collapse, undefined, [currentCell]);
                    currentCell.cellDivs.body.focus();
                    if (!collapse) {
                        self.redrawExpensiveOperatorHighlighting();
                    }
                });
            }


            const label = document.createElement('div');
            label.innerText = cell.value.label;
            cellBodyContainer.appendChild(label);


            // Adding output row count to the left of graph cell;
            const rows = document.createElement('div');
            rows.setAttribute('class', 'graph-cell-row-count');
            rows.innerText = cell.value.rowCountDisplayString;
            cellContainer.appendChild(rows);

            mxEvent.addListener(cellBodyContainer, 'keydown', (evt) => {
                if (evt.keyCode === 13 || evt.keyCode === 32) {
                    if (!expandCollapse) {
                        return;
                    }
                    const currentCell = cell;
                    const collapse = !currentCell.collapsed;
                    const icon = collapse ? expandCollapsePaths.expand : expandCollapsePaths.collapse;
                    expandCollapse.style.backgroundImage = 'url(' + icon + ')';

                    // undefined is for the middle parameter since the overwritten definition of foldCells doesn't reference it.
                    this.foldCells(collapse, undefined, [currentCell]);
                    cell.cellDivs.body.focus();

                    if (!collapse) {
                        self.redrawExpensiveOperatorHighlighting();
                    }

                    evt.stopPropagation();
                    evt.preventDefault();
                }
            });

            mxEvent.addListener(cellContainer, 'click', (evt) => {
                cellBodyContainer.focus();
            });

            cellDivs.body.tabIndex = oldTabIndex;

            if (this.firstLoad && cell.value.isRoot) {
                this.firstLoad = false;
                cellDivs.body.tabIndex = 0;
            }
            return cellContainer;
        }
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

    // Defines the position for the folding icon
    graph.cellRenderer.getControlBounds = function (state) {
        if (state.control != null) {
            let controlScale = state.control.scale;
            let boundWidth = state.control.bounds.width / controlScale;
            let boundHeight = state.control.bounds.height / controlScale;
            let scale = self.graph.view.getScale();

            return new mxRectangle(state.x + state.width - 20 * scale,
                state.cell.geometry.y * scale,
                boundWidth * scale, boundHeight * scale);
        }

        return null;
    };

    graph.foldCells = function (collapse, recurse, cells) {
        if (cells[0].isVertex() && cells[0]?.value?.children?.length > 0) {
            cells[0].cellDivs.body.setAttribute('aria-expanded', !collapse);
        }

        this.model.beginUpdate();
        try {
            toggleSubtree(this, cells[0], !collapse);
            this.model.setCollapsed(cells[0], collapse);
            self.renderPolygons();
        }
        finally {
            this.model.endUpdate();
        }
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
    style[mxConstants.STYLE_CELL_HIGHLIGHT_DASHED] = false;

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


        var cellStyle = new Object();
        cellStyle[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
        cellStyle[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
        cellStyle[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
        cellStyle[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
        cellStyle[mxConstants.STYLE_FILLCOLOR] = 'transparent';
        cellStyle[mxConstants.STYLE_STROKECOLOR] = 'transparent';
        cellStyle[mxConstants.STYLE_CELL_HIGHLIGHT_DASHED] = false;
        cellStyle[mxConstants.STYLE_CELL_HIGHLIGHT_STROKE_WIDTH] = '3';
        cellStyle[mxConstants.STYLE_CELL_HIGHLIGHT_COLOR] = '#4AA564';

        graph.getStylesheet().putDefaultVertexStyle(cellStyle);

        var maxX = this.queryPlanGraph.position.x;
        var maxY = this.queryPlanGraph.position.y;

        var vertex = graph.insertVertex(parent, this.queryPlanGraph.id, this.queryPlanGraph, this.queryPlanGraph.position.x, this.queryPlanGraph.position.y, CELL_WIDTH, CELL_HEIGHT);

        this.queryPlanGraph.depth = 1;
        this.queryPlanGraph.posInSet = 1;
        this.queryPlanGraph.setSize = 1;
        this.queryPlanGraph.isRoot = true;

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

                    vertex = graph.insertVertex(parent, node.id, node, node.position.x, node.position.y, CELL_WIDTH, CELL_HEIGHT);

                    var edge = entry.node.edges[i];
                    graph.insertWeightedInvertedEdge(parent, edge.id, edge, entry.vertex, vertex);
                    node.depth = entry.node.depth + 1;
                    node.posInSet = i + 1;
                    node.setSize = entry.node.children.length;

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
    var startX = (this.paddingX + 10) / 2;
    var startY = (this.paddingY + 10) / 2;

    // Recursively layout all nodes starting with root
    this.setNodePositionRecursive(this.queryPlanGraph, startX, startY);
};

azdataQueryPlan.prototype.disableNodeCollapse = function (disableCollapse) {
    const allVertices = this.graph.model.getChildCells(this.graph.getDefaultParent()).filter(v => v?.vertex);
    allVertices.forEach(v => {
        let state = this.graph.view.getState(v);
        if ((!state.control || !state.control.node)) {
            return;
        }

        if (disableCollapse) {
            state.control.node.style.visibility = 'hidden';
        }
        else if (this.graph.model.getOutgoingEdges(v).length > 0) {
            state.control.node.style.visibility = 'visible';
        }
    });
};

azdataQueryPlan.prototype.setNodePositionRecursive = function (node, x, y) {

    // Recursively setting all the x positions in the graph.
    this.setNodeXPositionRecursive(node, x, 0);
    var layoutHelper = new GraphNodeLayoutHelper();
    this.setNodeYPositionRecursive(node, layoutHelper, y);
};

azdataQueryPlan.prototype.isParentHierarchyTreeStructure = function (node) {
    while (node != null) {
        if (node.children.length >= 2) {
            return true;
        }
        node = node.parent;
    }
    return false;
};

azdataQueryPlan.prototype.getCleanedNodeLabel = function (node) {
    return node.label.replace(/\n|\r\n/g, "<br>");
};

azdataQueryPlan.prototype.getNodeLabelLength = function (node) {
    this.canvas = this.canvas || document.createElement("canvas");
    const context = this.canvas.getContext("2d");
    const metrics = context.measureText(node.label);
    return metrics.width;
};

azdataQueryPlan.prototype.getRecommendedNodeXSpacing = function (node) {
    const currentNodeSize = this.getNodeLabelLength(node);
    let maxNodeToWidth = 0;
    node.children.forEach(c => {
        maxNodeToWidth = Math.max(maxNodeToWidth, this.getNodeLabelLength(c));
    });
    let recommendedSpacing = currentNodeSize / 2 + maxNodeToWidth / 2;
    if (node.children.length > 1) {
        if (this.isParentHierarchyTreeStructure(node)) {
            recommendedSpacing += Math.max(maxNodeToWidth - MAX_ALLOWED_NODE_WIDTH, 0);
        }
    }
    return recommendedSpacing < MIN_ALLOWED_NODE_WIDTH ? MIN_ALLOWED_NODE_WIDTH : recommendedSpacing;
};

azdataQueryPlan.prototype.getNodeHeight = function (node) {
    const iconHeight = CELL_ICON_HEIGHT;
    const costHeight = CELL_COST_HEIGHT;
    const cellSubtextLineCount = node.label.split(/\r\n|\r|\n/).length
    const nodeHeight = iconHeight + costHeight + cellSubtextLineCount * 10;
    return nodeHeight;
};


azdataQueryPlan.prototype.updateSpacingY = function (node) {
    this.spacingY = Math.max(this.spacingY, this.getNodeHeight(node));
};

azdataQueryPlan.prototype.setNodeXPositionRecursive = function (node, x, level) {
    // Place the node at given position
    node.position = new Point(x, 0);
    node.level = level;

    // Determining the right height for the node. Here, 50px is the appropriate space for node icons.
    this.updateSpacingY(node);

    var recommendedMinimumSpacing = this.getRecommendedNodeXSpacing(node);
    var spacingX = recommendedMinimumSpacing + this.paddingX;

    // Compute locally optimized X position for node's children
    x += spacingX;

    // Storing the max X position of the children. 
    // This will later help us in determining the y coordinates for them.
    node.maxChildrenXPosition = node.level;

    node.children.forEach(childNode => {
        childNode.parent = node;
        this.setNodeXPositionRecursive(childNode, x, level + 1);
        node.maxChildrenXPosition = Math.max(node.maxChildrenXPosition, childNode.maxChildrenXPosition);
    });
};

azdataQueryPlan.prototype.getYMidPoint = function (fromNode, toNode) {
    var edgeMidpoint = (fromNode.position.x + this.getNodeLabelLength(fromNode) + toNode.position.x) / 2;
    for (let i = 0; i < fromNode.children.length; i++) {
        if (fromNode.children[i] === toNode.id) {
            break;
        }
        const minMidPointSpaceFromNodeBoundingRect = 6;
        edgeMidpoint = Math.min(edgeMidpoint, fromNode.children[i].position.x - minMidPointSpaceFromNodeBoundingRect);
    }
    return edgeMidpoint;
};

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

    layoutHelper.updateNodeLayout(node.level, yToUpdate);
};

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
};

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
};

azdataQueryPlan.prototype.zoomIn = function () {
    if (this.graph.view.getScale() * this.graph.zoomFactor <= 2) {
        this.graph.zoomIn();
    } else {
        this.graph.zoomTo(2)
    }
    this.renderPolygons();
};

azdataQueryPlan.prototype.zoomOut = function () {
    this.graph.zoomOut();
    this.renderPolygons();
};

azdataQueryPlan.prototype.zoomToFit = function () {
    this.graph.fit(undefined, true, 20);
    this.renderPolygons();
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

azdataQueryPlan.prototype.setCellHighLightColor = function (color) {
    this.graph.setCellStyles(mxConstants.STYLE_CELL_HIGHLIGHT_COLOR, color, this.graph.model.getChildCells(this.graph.getDefaultParent()));
};

azdataQueryPlan.prototype.destroy = function () {
    if (!this.destroyed) {
        this.destroyed = true;
        this.container = null;
    }
};

azdataQueryPlan.prototype.setShowTooltipOnClick = function(showTooltipOnClick) {
    this.graph.showTooltipOnClick = showTooltipOnClick;
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
};

/**
 * Removes all drawn polygons on the execution plan.
 */
azdataQueryPlan.prototype.removeDrawnPolygons = function () {
    this.drawnPolygons.forEach(polygon => {
        polygon.destroy();
    });
    this.drawnPolygons = [];
    this.polygonModels = [];
};

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
};

/**
 * Gets an array of points that represents the perimeter for a polygon.
 * @param {*} cell The starting node where the perimeter will start being outlined.
 * @returns an array of points
 */
azdataQueryPlan.prototype.getPolygonPerimeter = function (cell) {
    if (!cell.isVisible()) {
        return [];
    }

    let points = [];
    points = points.concat(this.getLeftSidePoints(cell));
    let rightSidePoints = this.getRightSidePoints(cell);
    points = points.concat(this.getBottomSidePoints(cell, rightSidePoints[0].x));
    points = points.concat(rightSidePoints);

    return points;
};

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
};

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
};

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
};

/**
 * Gets the points for what will be the right side of the polygon from left to right.
 * @param {*} cell The starting node where highlighting will begin.
 * @returns An array of points for the right side of the polygon.
 */
azdataQueryPlan.prototype.getRightSidePoints = function (cell) {
    let points = [];
    let leafNodes = this.getLeafNodes(cell);

    for (let leafIndex = 0; leafIndex < leafNodes.length; ++leafIndex) {
        let leaf = leafNodes[leafIndex];
        let additionalRightSideSpacing = this.calcAdditionalSpacingForNode(leaf);

        let lastLeaf = undefined;
        if (leafIndex > 0) {
            lastLeaf = leafNodes[leafIndex - 1];
        }

        let nextLeaf = undefined;
        if (leafIndex + 1 < leafNodes.length) {
            nextLeaf = leafNodes[leafIndex + 1];
        }

        let lastLeafPositionX = -1;
        if (lastLeaf) {
            lastLeafPositionX = lastLeaf.geometry.x;
        }

        let nextLeafPositionX = -1;
        if (nextLeaf) {
            nextLeafPositionX = nextLeaf.geometry.x;
        }

        let leafPositionX = Math.min(Math.max(lastLeafPositionX, leaf.geometry.x), Math.max(nextLeafPositionX, leaf.geometry.x));

        points.push({ x: leafPositionX + NODE_WIDTH + additionalRightSideSpacing, y: leaf.geometry.y + NODE_HEIGHT });
        points.push({ x: leafPositionX + NODE_WIDTH + additionalRightSideSpacing, y: leaf.geometry.y });
    }

    return points;
};

azdataQueryPlan.prototype.calcAdditionalSpacingForNode = function (cell) {
    let longestSubLabel = Math.max(...(cell.value.label.split(/\r\n|\n/).map(str => str.length)));
    if (longestSubLabel > LABEL_LENGTH_LIMIT) {
        longestSubLabel = LABEL_LENGTH_LIMIT;
    }
    // These values to work best for drawing regions around labels of different lengths, so the label is always inside the polygon.
    return longestSubLabel / 10 * 15;
};

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

        if (entry.value.children.length === 0 || !this.isChildCellVisible(entry)) {
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

        for (let nodeIndex = 0; nodeIndex < entry.value.children.length && this.isChildCellVisible(entry); ++nodeIndex) {
            let childCell = this.graph.model.getCell(entry.value.children[nodeIndex].id);
            stack.push(childCell);
        }
    }

    let leafNodes = Object.keys(leafNodeTable).map(key => leafNodeTable[key]).reverse();

    return leafNodes;
};

azdataQueryPlan.prototype.isChildCellVisible = function (vertex) {
    if (vertex.value.children.length === 0) {
        return false;
    }

    let childCell = this.graph.model.getCell(vertex.value.children[0].id);
    return childCell.isVisible();
};

azdataQueryPlan.prototype.clearExpensiveOperatorHighlighting = function () {
    if (this.expensiveCellHighlighter) {
        this.expensiveCellHighlighter.destroy();
    }

    this.expensiveCell = undefined;
    this.expensiveCellHighlighter = undefined;
};

azdataQueryPlan.prototype.redrawExpensiveOperatorHighlighting = function () {
    if (this.expensiveCell && this.expensiveCellHighlighter) {
        this.expensiveCellHighlighter.highlight(this.graph.view.getState(this.expensiveCell));
    }
};

azdataQueryPlan.prototype.highlightExpensiveOperator = function (getExpenseMetricValue) {
    const HIGHLIGHTER_COLOR = '#CD2026'; // Accessible Red
    const STROKE_WIDTH = 1;

    const expensiveNode = this.findExpensiveOperator(getExpenseMetricValue);
    if (!expensiveNode) {
        return false;
    }

    this.expensiveCell = this.graph.model.getCell(expensiveNode.id);
    this.expensiveCellHighlighter = new mxCellHighlight(this.graph, HIGHLIGHTER_COLOR, STROKE_WIDTH);
    this.expensiveCellHighlighter.highlight(this.graph.view.getState(this.expensiveCell));

    return true;
};

azdataQueryPlan.prototype.findExpensiveOperator = function (getExpenseMetricValue) {
    const expensiveOperators = [];
    const expensiveCostValues = [];

    const stack = [this.queryPlanGraph];

    while (stack.length > 0) {
        const node = stack.pop();
        const costValue = getExpenseMetricValue(node);
        
        if (costValue) {
            expensiveOperators.push(node);
            expensiveCostValues.push(costValue);
        }

        for (let childIndex = 0; childIndex < node.children.length; ++childIndex) {
            stack.push(node.children[childIndex]);
        }
    }

    if (expensiveCostValues.length === 0) {
        return undefined;
    }

    const maxCostValue = Math.max(...expensiveCostValues);
    const maxCostValueIndex = expensiveCostValues.findIndex(c => c === maxCostValue);

    return expensiveOperators[maxCostValueIndex];
};

// Hides or shows execution plan subtree nodes and corresponding icons
function toggleSubtree(graph, cell, show) {
    show = (show != null) ? show : true;
    var cells = [];

    graph.traverse(cell, true, function (vertex) {
        if (vertex != cell) {
            cells.push(vertex);
        }

        return vertex === cell || !graph.isCellCollapsed(vertex);
    });

    graph.toggleCells(show, cells, true);
}
