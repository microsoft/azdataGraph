import './schemaDesigner.css';
import '../../css/common.css';

import { IColumn, IEntity, IRelationship, ISchema, OnAction, SchemaDesignerConfig } from './schemaDesignerInterfaces';
import { mxCell, mxEditor, mxGraph, mxGraphModel, mxHierarchicalLayout, mxOutline } from 'mxgraph';

import { mxGraphFactory as mx } from '../mx';
import { SchemaDesignerToolbar } from './schemaDesignerToolbar';
import { getRowY } from './utils';
import { SchemaDesignerEntity } from './schemaDesignerEntity';
import { SchemaDesignerLayout } from './schemaDesignerLayout';

const ENTITY_COLUMNS_CONTAINER_CLASS = 'sd-table-columns';
const ENTITY_COLUMN_DIV_CLASS = 'sd-table-column';

export class SchemaDesigner {
    private _editor!: mxEditor;
    public _graph!: mxGraph;
    private _model!: mxGraphModel;
    private _toolbar!: SchemaDesignerToolbar;
    private _layout!: mxHierarchicalLayout;
    private _outline!: mxOutline;

    private cellClickListeners: ((cell: mxCell) => void)[] = [];

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
        graphContainer.classList.add("sd-graph-container");
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
        mx.mxConstants.DEFAULT_VALID_COLOR = this._config.color.validColor;
        mx.mxConstants.VALID_COLOR = this._config.color.validColor;
        mx.mxConstants.INVALID_COLOR = this._config.color.invalidColor;
    }

    private setupEditorOptions() {
        this._editor.layoutSwimlanes = true;
    }

    private setupGraphOptions() {
        this._graph.setResizeContainer(true);
        this._graph.tooltipHandler.setEnabled(false);
        this._graph.setConnectable(true);
        this._graph.setAllowDanglingEdges(false);
        this._graph.setHtmlLabels(true);
        this._graph.allowLoops = false;
        this._graph.connectionHandler.enabled = false;
        this._graph.connectionHandler.movePreviewAway = false;
        this._graph.connectionHandler.moveIconFront = true;
        this._graph.connectionHandler.connectImage = new mx.mxImage(
            this._config.icons.connectorIcon,
            24,
            24
        );
        this._graph.connectionHandler.factoryMethod = null!;
        this._layout = new SchemaDesignerLayout(this._graph);
        this._layout.intraCellSpacing = 30;
        this._graph.setCellsDisconnectable(false);
        this._graph.autoExtend = true;
        new mx.mxRubberband(this._graph);

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
            return this._config.isEditable && !this._model.isEdge(cell);
        }
        this._graph.isCellMovable = (cell) => {
            return this._config.isEditable && !this._model.isEdge(cell);
        }
        this._graph.isCellResizable = (_cell) => {
            return false;
        }
        this._graph.isCellFoldable = (_cell) => {
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
        (this._graph.connectionHandler as extendedConnectionHandler).mouseMove = function (_sender, me) {
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

        (this._graph.connectionHandler as extendedConnectionHandler).createEdgeState = function (_me) {
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

        (this._graph.connectionHandler as extendedConnectionHandler).isValidTarget = function (_cell) {
            return this.currentRowNode !== null;
        };

        (this._graph.connectionHandler as extendedConnectionHandler).validateConnection = function (source, target) {
            if (this.edgeState === null) {
                return null!;
            }
            if (this.currentRowNode === null) {
                return "";
            }
            // No connection to edge cells
            if (this.graph.model.isEdge(target)) {
                return "";
            }

            if (source === target) {
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

        this._graph.connectionHandler.addListener(mx.mxEvent.CONNECT, (_sender, evt) => {
            const edge = evt.getProperty('cell');
            const source = this._graph.getModel().getTerminal(edge, true);
            this._graph.view.invalidate(source, false, false);
            this._graph.view.validate(source);
        });

        this._graph.addListener(mx.mxEvent.DOUBLE_CLICK, (_sender, _evt) => {
            const cell = this._graph.getSelectionCell();
            if (cell !== undefined) {
                this.cellClickListeners.forEach((listener) => listener(cell));
            }
        });

        this._graph.getStylesheet().getDefaultVertexStyle()['cellHighlightColor'] = "red";
        this._graph.getStylesheet().getDefaultEdgeStyle()['edgeStyle'] = mx.mxEdgeStyle.ElbowConnector;
        this._graph.stylesheet.getDefaultEdgeStyle()[mx.mxConstants.STYLE_EDGE] = mx.mxConstants.EDGESTYLE_ENTITY_RELATION;
    }

    private setupGraphOutlineOptions() {
        const outlineContainer = document.createElement("div");
        outlineContainer.classList.add("sd-outline");
        this._container.appendChild(outlineContainer);
        this._outline = new mx.mxOutline(this._graph, outlineContainer);
    }

    private setupToolbar() {
        const toolbarBelt = document.createElement("div");
        toolbarBelt.classList.add("sd-toolbar-belt");
        this._container.appendChild(toolbarBelt);
        this._toolbar = new SchemaDesignerToolbar(toolbarBelt, this._graph, this._config);
        if (this._config.isEditable) {
            this._toolbar.addButton(
                this._config.icons.addTableIcon,
                "Add Table",
                () => {
                },
                (_graph, evt, _cell) => {
                    this._graph.stopEditing(false);
                    const pt = this._graph.getPointForEvent(evt, true);
                    const entity: IEntity = {
                        name: "New Table",
                        schema: "dbo",
                        columns: [{
                            name: "Column1",
                            dataType: "int",
                            isPrimaryKey: true,
                            isIdentity: true
                        }, {
                            name: "Column2",
                            dataType: "int",
                            isPrimaryKey: false,
                            isIdentity: false
                        }, {
                            name: "Column2",
                            dataType: "int",
                            isPrimaryKey: false,
                            isIdentity: false
                        }]
                    };

                    this.renderEntity(entity, pt.x, pt.y);
                }
            );
            this._toolbar.addDivider();
            this._toolbar.addButton(
                this._config.icons.undoIcon,
                "Undo",
                () => {
                    this._editor.execute("undo");
                }
            );
            this._toolbar.addButton(
                this._config.icons.redoIcon,
                "Redo",
                () => {
                    this._editor.execute("redo");
                }
            );
            this._toolbar.addDivider();
        }


        this._toolbar.addButton(
            this._config.icons.zoomInIcon,
            "Zoom In",
            () => {
                this._editor.execute("zoomIn");
                this.redrawEdges();
            }
        );

        this._toolbar.addButton(
            this._config.icons.zoomOutIcon,
            "Zoom Out",
            () => {
                this._editor.execute("zoomOut");
                this.redrawEdges();
            }
        );

        this._toolbar.addDivider();

        this._toolbar.addButton(
            this._config.icons.autoarrangeIcon,
            "Auto Arrange",
            () => {
                this.autoArrange();
            }
        );
        this._toolbar.addButton(
            this._config.icons.exportIcon,
            "Export",
            () => {
                const schema = this.schema;
                console.log(schema);
            }
        );
        if (this._config.isEditable) {
            this._toolbar.addDivider();
            this._toolbar.addButton(
                this._config.icons.deleteIcon,
                "Delete",
                () => {
                    const cell = this._graph.getSelectionCell();
                    if (cell !== undefined) {
                        this._editor.execute("delete", cell);
                    }
                }
            );
        }
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

    public renderModel(schema: ISchema, cleanUndoManager: boolean = false) {
        const parent = this._graph.getDefaultParent();
        this._model.beginUpdate();
        try {
            this._graph.removeCells(this._model.getChildCells(parent));
            const entities = schema.entities;
            for (let i = 0; i < entities.length; i++) {
                const entity = entities[i];
                this.renderEntity(entity, 100 + i * 50, 100 + i * 50);
            }
            for (let i = 0; i < schema.relationships.length; i++) {
                const relationship = schema.relationships[i];
                this.renderRelationship(relationship);
            }
        } finally {
            this._model.endUpdate();
            this._graph.view.refresh();
            const parentCells = [];
            for (let i = 0; i < this._model.cells.length; i++) {
                if (this._model.cells[i].vertex) {
                    if (this._model.getIncomingEdges(this._model.cells[i]).length === 0) {
                        parentCells.push(this._model.cells[i]);
                    }

                }
            }

            this.autoArrange();
            if (cleanUndoManager) {
                this._editor.undoManager.clear();
            }
        }
    }

    private renderEntity(entity: IEntity, x: number, y: number) {
        const entityValue = new SchemaDesignerEntity(entity, this._config, this._graph);
        const entityCell = new mx.mxCell(
            entityValue,
            new mx.mxGeometry(
                0,
                0,
                260 + 4,
                Math.min(330, 52 + entityValue.columns.length * 28) + 4,
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

    private renderRelationship(relationship: IRelationship) {
        const cells = this._model.getChildCells(this._graph.getDefaultParent());
        const source = cells.find((cell) => cell.value.name === relationship.entity);
        const target = cells.find((cell) => cell.value.name === relationship.referencedEntity);
        if (source === undefined || target === undefined) {
            return;
        }
        const edgeValue: EdgeCellValue = {
            sourceRow: source.value.columns.findIndex((column: IColumn) => column.name === relationship.column) + 1,
            targetRow: target.value.columns.findIndex((column: IColumn) => column.name === relationship.referencedColumn) + 1
        };
        this._graph.insertEdge(this._graph.getDefaultParent(), null!, edgeValue, source, target);
        this._graph.view.invalidate(source, false, false);
        this._graph.view.validate(source);
        this._graph.view.invalidate(target, false, false);
        this._graph.view.validate(target);
    }

    public get schema(): ISchema {
        const schema: ISchema = {
            entities: [],
            relationships: []
        };
        const cells = this._model.getChildCells(this._graph.getDefaultParent());
        for (let i = 0; i < cells.length; i++) {
            const cell = cells[i];
            if (cell.vertex) {
                const entity: IEntity = {
                    columns: cell.value.columns,
                    name: cell.value.name,
                    schema: cell.value.schema
                };
                schema.entities.push(entity);
            } else if (cell.edge) {
                const relationship: IRelationship = {
                    foreignKeyName: "",
                    onDeleteAction: OnAction.CASCADE,
                    onUpdateAction: OnAction.CASCADE,
                    column: cell.target.value.columns[cell.value.sourceRow - 1].name,
                    entity: cell.target.value.name,
                    referencedEntity: cell.source.value.name,
                    referencedColumn: cell.source.value.columns[cell.value.targetRow - 1].name
                };
                schema.relationships.push(relationship);
            }
        }
        return schema;
    }

    public autoArrange() {
        this._model.beginUpdate();
        this._layout.execute(this._graph.getDefaultParent());
        const cells = this._graph.getChildCells(this._graph.getDefaultParent());
        this._graph.center();

        const mostNegativeX = this.mostNegativeX();
        console.log('-x', mostNegativeX);

        const mostNegativeY = this.mostNegativeY();
        console.log('-y', mostNegativeY);

        this._graph.moveCells(cells, -mostNegativeX + 100, -mostNegativeY + 100, false);
        this._graph.sizeDidChange();

        this._model.endUpdate();
    }

    private mostNegativeX() {
        let mostNegativeX = 0;
        const cells = this._graph.getChildCells(this._graph.getDefaultParent());
        for (let i = 0; i < cells.length; i++) {
            const cell = cells[i];
            if (cell.geometry.x < mostNegativeX) {
                mostNegativeX = cell.geometry.x;
            }
        }
        return mostNegativeX;
    }

    private mostNegativeY() {
        let mostNegativeY = 0;
        const cells = this._graph.getChildCells(this._graph.getDefaultParent());
        for (let i = 0; i < cells.length; i++) {
            const cell = cells[i];
            if (cell.geometry.y < mostNegativeY) {
                mostNegativeY = cell.geometry.y;
            }
        }
        return mostNegativeY;
    }

    public addCellClickListener(listener: (cell: mxCell) => void) {
        this.cellClickListeners.push(listener);
    }
}


export interface EdgeCellValue {
    sourceRow: number;
    targetRow: number;
}

export class extendedConnectionHandler extends mx.mxConnectionHandler {
    public currentRow?: number = 0;
    public sourceRowNode!: HTMLElement;
    public currentRowNode!: HTMLElement;
    public updateRow!: (targetNode: HTMLElement) => HTMLElement | null;
}