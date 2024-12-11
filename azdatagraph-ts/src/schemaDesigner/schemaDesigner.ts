/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA.See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------*/

import './schemaDesigner.css';
import '../../node_modules/mxgraph/javascript/src/css/common.css';

import { Column, Entity } from './schemaDesignerInterfaces';
import { StyleMap, mxCellState, mxConnectionHandler, mxConstants, mxEditor, mxGraph, mxGraphModel, mxImage, mxOutline } from 'mxgraph';

import mx from '../mxgraph';

const ENTITY_CELL_ID = 'table';
const ENTITY_COLUMNS_CONTAINER_CLASS = 'sd-table-columns';
const ENTITY_COLUMN_DIV_CLASS = 'sd-table-column';

export class SchemaDesigner {
    private _editor!: mxEditor;
    private _graph!: mxGraph;
    private _model!: mxGraphModel;
    private _graphContainer!: HTMLElement;
    private _toolbar!: Toolbar;

    constructor(
        private _container: HTMLElement,
        private _config: SchemaDesignerConfig
    ) {
        this.initializeGraph();
    }

    private initializeGraph() {
        this.overwriteMxGraphDefaults();
        this._editor = new mx.mxEditor();
        const graphContainer = document.createElement("div");
        graphContainer.classList.add("sd-graph");
        this._graphContainer = graphContainer;
        this._container.appendChild(graphContainer);
        this._editor.setGraphContainer(graphContainer);
        this._graph = this._editor.graph;
        this._model = this._graph.getModel();
        this.setupEditorOptions();
        this.setupGraphOptions();
        this.setupGraphOutlineOptions();
        this.setupToolbar();
    }

    private overwriteMxGraphDefaults() {
        mx.mxClient.NO_FO = true;
        mx.mxEvent.disableContextMenu(this._container);
        mx.mxConstants.DEFAULT_VALID_COLOR = this._config.validColor;
        mx.mxConstants.VALID_COLOR = this._config.validColor;
        mx.mxConstants.INVALID_COLOR = this._config.invalidColor;
    }

    private setupEditorOptions() {
        this._editor.layoutSwimlanes = true;
    }

    private setupGraphOptions() {

        this._graph.setGridEnabled(true);
        this._graph.tooltipHandler.setEnabled(false);
        this._graph.setPanning(true);
        this._graph.panningHandler.useLeftButtonForPanning = true;
        this._graph.swimlaneNesting = false;
        this._graph.setConnectable(true);
        this._graph.setPanning(true);
        this._graph.centerZoom = false;
        this._graph.setAllowDanglingEdges(false);
        this._graph.setHtmlLabels(true);
        this._graph.view.optimizeVmlReflows = false;
        this._graph.connectionHandler.movePreviewAway = false;
        this._graph.connectionHandler.moveIconFront = true;
        this._graph.connectionHandler.connectImage = new mx.mxImage(
            this._config.connectorIcon,
            24,
            24
        );
        this._graph.graphHandler.htmlPreview = true;
        this._graph.connectionHandler.factoryMethod = null!;

        this._graph.view.updateFloatingTerminalPoint = function (edge, start, end, source) {
            const next = this.getNextPoint(edge, end, source);
            if (start?.text?.node === undefined) {
                // This means that the start cell doesn't have a label.
                return;
            }

            const div = start.text.node.getElementsByClassName(ENTITY_COLUMNS_CONTAINER_CLASS)[0];

            let x = start.x;
            let y = start.getCenterY();
            // Checks on which side of the terminal to leave
            if (next.x > x + start.width / 2) {
                x += start.width;
            }

            if (div !== null && div !== undefined) {
                y = start.getCenterY() - div.scrollTop;
                if (
                    edge.cell.value !== undefined &&
                    !this.graph.isCellCollapsed(start.cell)
                ) {
                    const edgeCellValue = edge.cell.value as EdgeCellValue;
                    const row = source ? edgeCellValue.sourceRow : edgeCellValue.targetRow;
                    const columns = div.getElementsByClassName(ENTITY_COLUMN_DIV_CLASS);
                    const column = columns[Math.min(columns.length - 1, row - 1)] as HTMLElement;
                    // Gets vertical center of source or target row
                    if (column !== undefined || column !== null) {
                        y = getRowY(start, column);
                    } else {
                        return;
                    }
                }

                if (edge !== null && edge.absolutePoints !== null) {
                    next.y = y;
                }
            } else {
                return;
            }

            edge.setAbsoluteTerminalPoint(new mx.mxPoint(x, y), source);

            /**
             * Routes multiple incoming edges along common waypoints if the edges
             * have the common target row
             */

            if (source && edge.cell.value !== undefined && start !== null && end !== null) {
                let edges = this.graph.getEdgesBetween(start.cell, end.cell, true);
                const tmp = [];

                // Filters the edges with the same source row
                const row = (edge.cell.value as EdgeCellValue).targetRow;

                for (let i = 0; i < edges.length; i++) {
                    if (
                        edges[i].value !== undefined &&
                        (edges[i].value as EdgeCellValue).targetRow === row
                    ) {
                        tmp.push(edges[i]);
                    }
                }

                edges = tmp;

                if (edges.length > 1 && edge.cell === edges[edges.length - 1]) {
                    // Finds the vertical center
                    const states = [];
                    let y = 0;

                    for (let i = 0; i < edges.length; i++) {
                        states[i] = this.getState(edges[i]);
                        y += states[i].absolutePoints[0].y;
                    }

                    y /= edges.length;

                    for (let i = 0; i < states.length; i++) {
                        const x = states[i].absolutePoints[1].x;

                        if (states[i].absolutePoints.length < 5) {
                            states[i].absolutePoints.splice(2, 0, new mx.mxPoint(x, y));
                        } else {
                            states[i].absolutePoints[2] = new mx.mxPoint(x, y);
                        }

                        // Must redraw the previous edges with the changed point
                        if (i < states.length - 1) {
                            this.graph.cellRenderer.redraw(states[i]);
                        }
                    }
                }
            }

            if (start.cell.value.scrollTop) {
                div.scrollTop = start.cell.value.scrollTop;
            }
        };

        this._graph.getLabel = (cell) => {
            if (cell?.value?.render !== undefined) {
                return cell.value.render();
            }
            return document.createElement("div");
        };
        this._graph.isHtmlLabel = (cell) => {
            return !this._model.isEdge(cell);
        }
        this._graph.isCellEditable = (cell) => {
            return !this._model.isEdge(cell);
        }
        this._graph.isCellMovable = (cell) => {
            return !this._model.isEdge(cell);
        }
        this._graph.isCellResizable = (cell) => {
            return false;
        }
        this._graph.isCellFoldable = (cell) => {
            return false;
        }
        this._graph.convertValueToString = function (cell) {
            if (cell?.value?.entity?.name !== undefined) {
                return cell.value.entity.name;
            }
            return mx.mxGraph.prototype.convertValueToString.apply(this, [cell]);
        }
        this._graph.model.valueForCellChanged = function (cell, value) {
            const old = cell.value.name;
            cell.value.name = value;
            return old;
        }
        const oldRedrawLabel = this._graph.cellRenderer.redrawLabel;
        this._graph.cellRenderer.redrawLabel = function (state) {
            oldRedrawLabel.apply(this, arguments as any); // super call;
            const graph = state.view.graph;
            const model = graph.model;
            if (model.isVertex(state.cell) && state.text !== null) {
                // Scrollbars are on the div
                const div = state.text.node.getElementsByClassName(ENTITY_COLUMNS_CONTAINER_CLASS)[0] as HTMLElement;
                if (div !== null) {
                    if (div.getAttribute('scrollHandler') === null) {
                        div.setAttribute('scrollHandler', 'true');
                        const updateEdges = mx.mxUtils.bind(this, function () {
                            graph.clearSelection();
                            const edgeCount = model.getEdgeCount(state.cell);
                            // Only updates edges to avoid update in DOM order
                            // for text label which would reset the scrollbar
                            for (let i = 0; i < edgeCount; i++) {
                                const edge = model.getEdgeAt(state.cell, i);
                                graph.view.invalidate(edge, true, false);
                                graph.view.validate(edge);
                            }
                        });
                        mx.mxEvent.addListener(div, "scroll", () => {
                            state.cell.value.scrollTop = div.scrollTop;
                            updateEdges();
                        });
                        mx.mxEvent.addListener(div, "mouseup", updateEdges);
                    }
                }
            }
        };

        (this._graph.connectionHandler as extendedConnectionHandler).updateRow = function (target) {
            while (
                target !== null &&
                target.className.includes !== null &&
                typeof target.className === 'string' &&
                target?.className?.includes("sd-table-column-")
            ) {
                target = target.parentNode as HTMLElement;
            }

            this.currentRow = undefined;
            if (target !== null && target?.className === "sd-table-column") {
                this.currentRow = parseInt(target.getAttribute("column-id")!) + 1;
            } else {
                target = null!;
            }
            return target;
        };

        // Adds placement of the connect icon based on the mouse event target (row)
        (this._graph.connectionHandler as extendedConnectionHandler).updateIcons = function (state, icons: any, me) {
            let target = me.getSource() as HTMLElement;
            target = this.updateRow(target) as HTMLElement;
            if (target !== undefined && this.currentRow !== undefined) {
                const div = target.parentNode as HTMLElement;
                const s = state.view.scale;
                icons[0].node.style.userSelect = "none";
                icons[0].node.style.visibility = "visible";
                icons[0].bounds.width = s * 24;
                icons[0].bounds.height = s * 24;
                icons[0].bounds.x = state.x + target.offsetWidth * s;
                icons[0].bounds.y =
                    state.y +
                    target.offsetTop * s +
                    - div.scrollTop +
                    (target.offsetHeight * s) / 2 -
                    icons[0].bounds.height / 2; // 1.2 makes the icon completely centered to the target row. Ideally it should be 2 but it is not working as expected.
                icons[0].redraw();
                this.currentRowNode = target;
            } else {
                icons[0].node.style.visibility = "hidden";
            }
        };


        const oldMouseMove = this._graph.connectionHandler.mouseMove;
        (this._graph.connectionHandler as extendedConnectionHandler).mouseMove = function (sender, me) {
            if (this.edgeState !== null) {
                this.currentRowNode = this.updateRow(me.getSource() as HTMLElement) as HTMLElement;
                if (this.currentRow !== null) {
                    this.edgeState.cell.value.targetRow = this.currentRow;
                } else {
                    this.edgeState.cell.value.targetRow = 0;
                }
            }
            oldMouseMove.apply(this, arguments as any);
        };

        (this._graph.connectionHandler as extendedConnectionHandler).createEdgeState = function (me) {
            const relation: EdgeCellValue = {
                sourceRow: this.currentRow || 0,
                targetRow: 0,
            };
            const edge = this.createEdge(relation);
            const style = this.graph.getCellStyle(edge);
            const state = new mx.mxCellState(this.graph.view, edge, style);
            this.sourceRowNode = this.currentRowNode;
            return state;
        };

        (this._graph.connectionHandler as extendedConnectionHandler).isValidTarget = function (cell) {
            return this.currentRowNode !== null;
        };

        (this._graph.connectionHandler as extendedConnectionHandler).validateConnection = function (source, target) {
            if(this.edgeState === null) {
                return null!;
            }
            if(this.currentRowNode === null) {
                return "";
            }
            // No connection to edge cells
            if(this.graph.model.isEdge(target)) {
                return "";
            }

            if(source === target) {
                return "";
            }
            
            const edgeState = this.edgeState;
            const edgeStateValue = edgeState.cell.value as EdgeCellValue;
            const edgeBetweenSourceAndTarget = this.graph.model.getEdgesBetween(source, target);
            for (let i = 0; i < edgeBetweenSourceAndTarget.length; i++) {
                const edge = edgeBetweenSourceAndTarget[i];
                const edgeValue = edge.value as EdgeCellValue;
                // No repeated edges
                if (
                    edgeValue.sourceRow === edgeStateValue.sourceRow &&
                    edgeValue.targetRow === edgeStateValue.targetRow &&
                    edge.source === source &&
                    edge.target === target
                ) {
                    return "";
                }

                // No cyclic connections
                if (
                    // edgeValue.sourceRow === edgeStateValue.targetRow &&
                    // edgeValue.targetRow === edgeStateValue.sourceRow &&
                    edge.source === target &&
                    edge.target === source
                ) {
                    return "";
                }
            }
            return null!;
        };

        (this._graph.connectionHandler as extendedConnectionHandler).getTargetPerimeterPoint = function (state, me) {
            console.log('getTargetPerimeterPoint');
            let y = me.getY();
            if (this.currentRowNode !== null) {
                y = getRowY(state, this.currentRowNode);
            }
            let x = state.x;
            if (this.getEventSource().getCenterX() > state.getCenterX()) {
                x += state.width;
            }
            return new mx.mxPoint(x, y);
        };

        (this._graph.connectionHandler as extendedConnectionHandler).getSourcePerimeterPoint = function (state, next, me) {
            console.log('getSourcePerimeterPoint');
            let y = me.getY();
            if (this.sourceRowNode !== null) {
                y = getRowY(state, this.sourceRowNode);
            }

            // Checks on which side of the terminal to leave
            let x = state.x;

            if (next.x > state.getCenterX()) {
                x += state.width;
            }

            return new mx.mxPoint(x, y);
        };

        this._graph.getStylesheet().getDefaultVertexStyle()['cellHighlightColor'] = "red";
        this._graph.stylesheet.getDefaultEdgeStyle()[mx.mxConstants.STYLE_EDGE] = mx.mxConstants.EDGESTYLE_ENTITY_RELATION;
    }

    private setupGraphOutlineOptions() {
        const outlineContainer = document.createElement("div");
        outlineContainer.classList.add("sd-outline");
        this._container.appendChild(outlineContainer);
        const outline = new mx.mxOutline(this._graph, outlineContainer);
        outline.createSizer();
        outline.labelsVisible = true;
        outline.sizerSize = 5;
    }

    private setupToolbar() {
        const toolbarBelt = document.createElement("div");
        toolbarBelt.classList.add("sd-toolbar-belt");
        this._container.appendChild(toolbarBelt);
        this._toolbar = new Toolbar(toolbarBelt, this._graph, this._config);
        this._toolbar.addButton(
            this._config.addTableIcon,
            "Add Table",
            () => {
            },
            (graph, evt, cell) => {
                this._graph.stopEditing(false);
                const pt = this._graph.getPointForEvent(evt, true);
                const entity = new EntityObject({
                    name: "New Table",
                    schema: "dbo",
                    columns: [{
                        name: "Column1",
                        type: "int",
                        isPrimaryKey: true,
                        isIdentity: true
                    }, {
                        name: "Column2",
                        type: "int",
                        isPrimaryKey: false,
                        isIdentity: false
                    }, {
                        name: "Column2",
                        type: "int",
                        isPrimaryKey: false,
                        isIdentity: false
                    }]
                }, this._config);

                this.insertEntity(entity, pt.x, pt.y);
            }
        );
        this._toolbar.addDivider();
        this._toolbar.addButton(
            this._config.undoIcon,
            "Undo",
            () => {
                this._editor.execute("undo");
            }
        );
        this._toolbar.addButton(
            this._config.redoIcon,
            "Redo",
            () => {
                this._editor.execute("redo");
            }
        );
        this._toolbar.addDivider();
        this._toolbar.addButton(
            this._config.zoomInIcon,
            "Zoom In",
            () => {
                this._editor.execute("zoomIn");
                this.redrawEdges();
            }
        );

        this._toolbar.addButton(
            this._config.zoomOutIcon,
            "Zoom Out",
            () => {
                this._editor.execute("zoomOut");
                this.redrawEdges();
            }
        );

        this._toolbar.addDivider();
        this._toolbar.addButton(
            this._config.deleteIcon,
            "Delete",
            () => {
                const cell = this._graph.getSelectionCell();
                if (cell !== undefined) {
                    this._editor.execute("delete", cell);
                }
            }
        );
    }

    private redrawEdges() {
        const cells = this._model.getChildCells(this._graph.getDefaultParent());
        for (let i = 0; i < cells.length; i++) {
            if (!cells[i].edge) {
                continue;
            }
            const edge = cells[i];
            this._graph.view.invalidate(edge, true, false);
            this._graph.view.validate(edge);
        }
    }

    private insertEntity(entity: EntityObject, x: number, y: number) {
        const entityCell = new mx.mxCell(
            entity,
            new mx.mxGeometry(
                0,
                0,
                260+4,
                Math.min(330, 52 + entity.entity.columns.length * 28)+4,
            )
        );
        entityCell.setVertex(true);
        this._model.beginUpdate();
        try {
            entityCell.geometry.x = x;
            entityCell.geometry.y = y;
            entityCell.geometry.alternateBounds = new mx.mxRectangle(0, 0, entityCell.geometry.width, entityCell.geometry.height);
            this._graph.addCell(entityCell, this._graph.getDefaultParent());
        } finally {
            this._model.endUpdate();
        }
        this._graph.setSelectionCell(entityCell);
    }
}

class Toolbar {
    private _toolbarDiv: HTMLElement;
    constructor(private _container: HTMLElement, private _graph: mxGraph, private _config: SchemaDesignerConfig) {
        this._toolbarDiv = document.createElement("div");
        this._container.appendChild(this._toolbarDiv);
        this._toolbarDiv.classList.add("sd-toolbar");
    }

    addButton(
        icon: string,
        title: string,
        callback: () => void,
        onDragEndCallback?: (graph: mxGraph, evt: MouseEvent, cell: mxCellState) => void) {
        const button = document.createElement("div");
        this._toolbarDiv.appendChild(button);
        button.classList.add("sd-toolbar-button");
        button.style.backgroundImage = `url(${icon})`;
        button.onclick = callback;
        button.title = title;
        if (onDragEndCallback) {
            const dragImage = button.cloneNode(true) as HTMLElement;
            dragImage.style.backgroundColor = this._config.toolbarBackgroundColor;
            const ds = mx.mxUtils.makeDraggable(
                button,
                this._graph,
                onDragEndCallback,
                dragImage
            );
            ds.highlightDropTargets = true;
        }
    }

    addDivider() {
        const divider = document.createElement("div");
        this._toolbarDiv.appendChild(divider);
        divider.classList.add("sd-toolbar-divider");
    }
}

class EntityObject {
    private div!: HTMLElement;
    constructor(public entity: Entity, private _config: SchemaDesignerConfig) {
    }

    render(): HTMLElement {
        const parent = document.createElement("div");
        parent.classList.add("sd-table");
        const colorIndicator = document.createElement("div");
        colorIndicator.classList.add("sd-table-color-indicator");
        parent.appendChild(colorIndicator);
        const header = document.createElement("div");
        header.classList.add("sd-table-header");
        const headerIcon = document.createElement("div");
        headerIcon.classList.add("sd-table-header-icon");
        headerIcon.style.backgroundImage = `url(${this._config.entityIcon})`;
        header.appendChild(headerIcon);
        const headerText = document.createElement("div");
        headerText.classList.add("sd-table-header-text");
        headerText.innerText = `${this.entity.schema}.${this.entity.name}`;
        header.appendChild(headerText);
        parent.appendChild(header);

        const columns = document.createElement("div");
        columns.classList.add("sd-table-columns");
        this.entity.columns.forEach((column, index) => {
            const columnDiv = document.createElement("div");
            columnDiv.classList.add("sd-table-column");
            const columnIcon = document.createElement("div");
            columnIcon.classList.add("sd-table-column-icon");
            columnIcon.style.backgroundImage = `url(${this._config.dataTypeIcons[column.type]
                })`;
            columnDiv.appendChild(columnIcon);
            const columnText = document.createElement("div");
            columnText.classList.add("sd-table-column-text");
            columnText.innerText = column.name;
            columnDiv.appendChild(columnText);
            const columnConstraints = document.createElement("div");
            columnConstraints.classList.add("sd-table-column-constraints");
            columnConstraints.innerText = this.getConstraintText(column);
            columnDiv.appendChild(columnConstraints);
            columnDiv.setAttribute("column-id", index.toString());
            columns.appendChild(columnDiv);
        });
        parent.appendChild(columns);
        this.div = parent;
        return parent;
    }

    private getConstraintText(col: Column): string {
        const constraints = [];
        if (col.isPrimaryKey) {
            constraints.push("PK");
        }
        return constraints.join(", ");
    }
}

export interface EdgeCellValue {
    sourceRow: number;
    targetRow: number;
}

export interface SchemaDesignerConfig {
    graphFontFamily: string;
    cellFillColor: string;
    cellHighlightColor: string;
    edgeStrokeColor: string;
    outlineColor: string;
    toolbarBackgroundColor: string;
    addTableIcon: string;
    undoIcon: string;
    redoIcon: string;
    zoomInIcon: string;
    zoomOutIcon: string;
    deleteIcon: string;
    entityIcon: string;
    dataTypeIcons: { [key: string]: string };
    connectorIcon: string;
    validColor: string;
    invalidColor: string;
}

/**
 * This function should return the vertical center of the column in an entity
 * @param state cell containing the entity of the column.
 * @param column column element.
 * @returns the vertical center of the column.
 */
function getRowY(state: mxCellState, column: HTMLElement): number {
    const s = state.view.scale;
    if (!column) {
        return state.y;
    }
    const div = column.parentNode as HTMLElement;
    let y = state.y + (column.offsetTop - div.scrollTop + column.offsetHeight / 2) * s; // 5 is the magic number to make the line completely centered to the row.
    if (div.scrollTop > column.offsetTop) { // If the column is above the visible area of the entity container div then we should use the top of the column container.
        y = state.y + (div.offsetTop - 15) * s;
    }
    if (y > state.y + div.offsetTop * s + div.clientHeight * s) { // If the column is below the visible area of the entity container div then we should use the bottom of the column container.
        y = state.y + (div.offsetTop + div.clientHeight - 5) * s;
    }
    return y;
}



export class extendedConnectionHandler extends mx.mxConnectionHandler {
    public currentRow?: number = 0;
    public sourceRowNode!: HTMLElement;
    public currentRowNode!: HTMLElement;
    public updateRow!: (targetNode: HTMLElement) => HTMLElement | null;
}