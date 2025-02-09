import './schemaDesigner.css';
import '../../css/common.css';

import { EdgeCellValue, extendedConnectionHandler, IColumn, IEntity, IRelationship, ISchema, OnAction, SchemaDesignerConfig } from './schemaDesignerInterfaces';
import { mxCell, mxCellState, mxEditor, mxGraph, mxGraphLayout, mxGraphModel } from 'mxgraph';

import { mxGraphFactory as mx } from '../mx';
import { SchemaDesignerToolbar } from './schemaDesignerToolbar';
import { getRowY } from './utils';
import { SchemaDesignerEntity } from './schemaDesignerEntity';
import { SchemaDesignerLayout } from './schemaDesignerLayout';


export class SchemaDesigner {
    private _editor!: mxEditor;
    public _graph!: mxGraph;
    private _model!: mxGraphModel;
    private _toolbar!: SchemaDesignerToolbar;
    private _layout!: mxGraphLayout;
    private _currentCellUnderEdit!: mxCellState;

    private cellClickListeners: ((cell: mxCell) => void)[] = [];

    constructor(
        private _container: HTMLElement,
        private _config: SchemaDesignerConfig
    ) {
        this.initializeGraph();
    }

    private initializeGraph() {
        this.overwriteMxGraphDefaults();
        this.addCustomEdgeTerminals();
        this._editor = new mx.mxEditor();
        this._editor.setGraphContainer(this._container);
        this._graph = this._editor.graph;
        this._model = this._graph.getModel();
        this.setupEditorOptions();
        this.setupGraphOptions();
        this.setupColors();
        this.setupGraphOutlineOptions();
        this.setupToolbar();
    }

    private setupColors() {
        const body = document.getElementsByTagName("body")[0];
        body.style.setProperty("--sd-toolbar-background-color", this._config.colors.toolbarBackground);
        body.style.setProperty("--sd-toolbar-foreground-color", this._config.colors.toolbarForeground);
        body.style.setProperty("--sd-toolbar-hover-background-color", this._config.colors.toolbarHoverBackground);
        body.style.setProperty("--sd-toolbar-divider-background-color", this._config.colors.toolbarDividerBackground);

        body.style.setProperty("--sd-graph-background-color", this._config.colors.graphBackground);
        body.style.setProperty("--sd-graph-grid-color", this._config.colors.graphGrid);
        body.style.setProperty("--sd-border-color", this._config.colors.cellBorder);

        body.style.setProperty("--sd-cell-html-foreground", this._config.colors.cellForeground);
        body.style.setProperty("--sd-cell-html-hover-column-background", this._config.colors.cellColumnHover);
        body.style.setProperty("--sd-cell-divider-color", this._config.colors.cellDivider);
        body.style.setProperty("--sd-graph-background-color", this._config.colors.cellBackground);


        this._graph.getStylesheet().getDefaultVertexStyle()["fillColor"] = this._config.colors.cellBackground;
        this._graph.getStylesheet().getDefaultEdgeStyle()["strokeColor"] = this._config.colors.edge;
        this._graph.getStylesheet().getDefaultVertexStyle()['cellHighlightColor'] = this._config.colors.cellHighlight;
        this._graph.getStylesheet().getDefaultVertexStyle()['cellHightlightStrokeWidth'] = 3;

        this._graph.getStylesheet().getDefaultEdgeStyle()['cellHighlightColor'] = this._config.colors.cellHighlight;
        mx.mxConstants.OUTLINE_HANDLE_FILLCOLOR = this._config.colors.cellHighlight
        mx.mxConstants.OUTLINE_HANDLE_STROKECOLOR = this._config.colors.cellHighlight;
        mx.mxConstants.OUTLINE_COLOR = this._config.colors.cellHighlight;
    }

    private overwriteMxGraphDefaults() {
        mx.mxClient.NO_FO = true;
        mx.mxEvent.disableContextMenu(this._container);
    }

    private addCustomEdgeTerminals() {
        mx.mxMarker.addMarker("one", (canvas, _shape, _type, pe, unitX, unitY, size, _source, _sw, _filled) => {
            return () => {
                const endX = pe.x - unitX * size;
                const endY = pe.y - unitY * size;

                const midX = endX - unitY * size;
                const midY = endY + unitX * size;

                const startX = endX + unitY * size;
                const startY = endY - unitX * size;

                canvas.begin();
                canvas.moveTo(startX, startY);
                canvas.lineTo(midX, midY);
                canvas.stroke();
            };
        });

        mx.mxMarker.addMarker("many", (canvas, _shape, _type, pe, unitX, unitY, size, _source, _sw, _filled) => {
            return () => {
                const arrowSize = 1.5;
                const startX = pe.x - unitX * size * arrowSize;
                const startY = pe.y - unitY * size * arrowSize;

                const Y1 = pe.y + unitX * size * arrowSize;
                const X1 = pe.x;
                const Y2 = pe.y - unitX * size * arrowSize;
                const X2 = pe.x;

                canvas.begin();
                canvas.moveTo(startX, startY);
                canvas.lineTo(X1, Y1);
                canvas.stroke();

                canvas.begin();
                canvas.moveTo(startX, startY);
                canvas.lineTo(X2, Y2);
                canvas.stroke();
            };
        });
    }

    private setupEditorOptions() {
        this._editor.layoutSwimlanes = true;
    }

    private setupGraphOptions() {
        this._graph.tooltipHandler.setEnabled(false);
        this._graph.setConnectable(this._config.isEditable);
        this._graph.setAllowDanglingEdges(false);
        this._graph.setHtmlLabels(true);
        this._graph.connectionHandler.enabled = this._config.isEditable;
        this._graph.connectionHandler.movePreviewAway = false;
        this._graph.connectionHandler.moveIconFront = true;
        this._graph.connectionHandler.connectImage = new mx.mxImage(
            this._config.icons.connectorIcon,
            24,
            24
        );
        this._graph.connectionHandler.factoryMethod = null!;
        this._layout = new SchemaDesignerLayout(this._graph);

        this._graph.setCellsDisconnectable(false);
        this._graph.autoSizeCellsOnAdd = true;
        this._graph.getSelectionModel().setSingleSelection(true);
        this._graph.setPanning(true);
        this._graph.panningHandler.useLeftButtonForPanning = true;

        this._graph.view.updateFloatingTerminalPoint = function (edge, start, end, source) {
            const next = this.getNextPoint(edge, end, source);
            if (start?.text?.node === undefined) {
                // This means that the start cell doesn't have a label.
                return;
            }

            const div = start.text.node.getElementsByClassName("sd-table-columns")[0];

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
                    const columns = div.getElementsByClassName("sd-table-column");
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

            if (start.cell.value.scrollTop) {
                div.scrollTop = start.cell.value.scrollTop;
            }

            // /**
            //  * Routes multiple incoming edges along common waypoints if the edges
            //  * have the common target row
            //  */

            // if (source && edge.cell.value !== undefined && start !== null && end !== null) {
            //     let edges = this.graph.getEdgesBetween(start.cell, end.cell, true);
            //     const tmp = [];

            //     // Filters the edges with the same source row
            //     const row = (edge.cell.value as EdgeCellValue).targetRow;

            //     for (let i = 0; i < edges.length; i++) {
            //         if (
            //             edges[i].value !== undefined &&
            //             (edges[i].value as EdgeCellValue).targetRow === row
            //         ) {
            //             tmp.push(edges[i]);
            //         }
            //     }

            //     edges = tmp;

            //     if (edges.length > 1 && edge.cell === edges[edges.length - 1]) {
            //         // Finds the vertical center
            //         const states = [];
            //         let y = 0;

            //         for (let i = 0; i < edges.length; i++) {
            //             states[i] = this.getState(edges[i]);
            //             y += states[i].absolutePoints[0].y;
            //         }

            //         y /= edges.length;

            //         for (let i = 0; i < states.length; i++) {
            //             const x = states[i].absolutePoints[1].x;

            //             if (states[i].absolutePoints.length < 5) {
            //                 states[i].absolutePoints.splice(2, 0, new mx.mxPoint(x, y));
            //             } else {
            //                 states[i].absolutePoints[2] = new mx.mxPoint(x, y);
            //             }

            //             // Must redraw the previous edges with the changed point
            //             if (i < states.length - 1) {
            //                 this.graph.cellRenderer.redraw(states[i]);
            //             }
            //         }
            //     }
            // }

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
        this._graph.isCellEditable = (_cell) => {
            return false; //this._config.isEditable && !this._model.isEdge(cell);
        }
        this._graph.isCellMovable = (cell) => {
            return this._config.isEditable && !this._model.isEdge(cell) && cell.value.editor !== true;
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
                if (state.cell.value.setupValueAndListeners !== undefined) {
                    state.cell.value.setupValueAndListeners(state.text.node, state);
                }
            }
        };

        (this._graph.connectionHandler as extendedConnectionHandler).updateRow = function (target) {
            if (target === null) {
                return target;
            }

            const column = target.closest(".sd-table-column");
            if (column !== null) {
                this.currentRow = parseInt(column.getAttribute("column-id")!) + 1;
                return column as HTMLElement;
            }

            return null;
        };

        // Adds placement of the connect icon based on the mouse event target (row)
        (this._graph.connectionHandler as extendedConnectionHandler).updateIcons = function (state, icons: any, me) {
            const targetNode = me.getSource() as HTMLElement;

            const columnDiv = this.updateRow(targetNode) as HTMLElement;
            if (columnDiv !== null && this.currentRow !== undefined) {
                const s = state.view.scale;
                icons[0].node.style.userSelect = "none";
                icons[0].node.style.visibility = "visible";
                icons[0].bounds.width = s * 24;
                icons[0].bounds.height = s * 24;
                icons[0].bounds.x = state.x + columnDiv.offsetWidth * s;
                icons[0].bounds.y =
                    state.y +
                    columnDiv.offsetTop * s +
                    - columnDiv.scrollTop +
                    (columnDiv.offsetHeight * s) / 2 -
                    icons[0].bounds.height / 2;
                if (icons[0].node.getAttribute("cell-id") === state.cell.id && icons[0].node.getAttribute("row-id") === this.currentRow.toString()) {
                    return;
                }
                icons[0].node.setAttribute("cell-id", state.cell.id);
                icons[0].node.setAttribute("row-id", this.currentRow.toString());
                icons[0].redraw();
                this.currentRowNode = columnDiv;
            } else {
                icons[0].node.style.visibility = "hidden";
            }
        };


        const oldMouseMove = this._graph.connectionHandler.mouseMove;
        (this._graph.connectionHandler as extendedConnectionHandler).mouseMove = function (_sender, me) {
            if (this.edgeState !== null) {
                this.currentRowNode = this.updateRow(me.getSource() as HTMLElement) as HTMLElement;
                const cellValue = this.edgeState.cell.value as EdgeCellValue;
                if (this.currentRow !== null && this.currentRow !== undefined) {
                    const targetCellState = (this as any).currentState as mxCellState;
                    if (targetCellState?.cell?.value) {
                        const targetCellValue = targetCellState.cell.value as SchemaDesignerEntity;
                        if (cellValue) {
                            const targetColumnName = targetCellValue.columns[this.currentRow - 1].name;
                            cellValue.targetRow = this.currentRow;
                            cellValue.referencedColumn = targetColumnName;
                            cellValue.referencedSchema = targetCellValue.schema;
                            cellValue.referencedEntity = targetCellValue.name;
                            cellValue.foreignKeyName = `FK_${cellValue.entity}_${cellValue.column}_${cellValue.referencedEntity}_${cellValue.referencedColumn}`;
                        }
                    }
                } else {
                    cellValue.targetRow = 0;
                }
            }
            oldMouseMove.apply(this, arguments as any);
        };

        (this._graph.connectionHandler as extendedConnectionHandler).createEdgeState = function (_me) {
            const sourceCellState = (this as any).currentState as mxCellState;
            const sourceCellValue = sourceCellState.cell.value as SchemaDesignerEntity;
            const targetColumnName = sourceCellValue.columns[this.currentRow ? this.currentRow - 1 : 0].name;
            const relation: EdgeCellValue = {
                sourceRow: this.currentRow || 0,
                targetRow: 0,
                foreignKeyName: '',
                schemaName: sourceCellValue.schema,
                entity: sourceCellValue.name,
                column: targetColumnName,
                referencedSchema: '',
                referencedEntity: '',
                referencedColumn: '',
                onDeleteAction: OnAction.NO_ACTION,
                onUpdateAction: OnAction.NO_ACTION
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

        this._graph.addListener(mx.mxEvent.REMOVE_CELLS, (_sender, evt) => {
            const removedCell = evt.properties.cells[0];
            if (removedCell !== undefined && removedCell.edge) {
                const source = this._graph.getModel().getTerminal(removedCell, true);
                this._graph.view.invalidate(source, false, false);
                this._graph.view.validate(source);
            }
        });

        this._graph.addListener(mx.mxEvent.DOUBLE_CLICK, (_sender, _evt) => {
            const cell = this._graph.getSelectionCell();
            if (cell !== undefined) {
                this.cellClickListeners.forEach((listener) => listener(cell));
                if (cell.edge) {
                    this._currentCellUnderEdit = this._graph.view.getCellStates([cell])[0];
                    this._config.editRelationship(cell, this._currentCellUnderEdit.x, this._currentCellUnderEdit.y, this._graph.view.scale);
                }
            }
        });
        this._graph.getStylesheet().getDefaultEdgeStyle()['edgeStyle'] = mx.mxEdgeStyle.ElbowConnector;
    }

    public set currentCellUnderEdit(value: mxCellState) {
        if (this._currentCellUnderEdit !== undefined && value.cell.id !== this._currentCellUnderEdit.cell.id
        ) {
            this._currentCellUnderEdit.cell.value.editor = false;
            this._graph.cellRenderer.redraw(this._currentCellUnderEdit);
        }
        this._currentCellUnderEdit = value;
    }

    private setupGraphOutlineOptions() {
        const outlineContainer = document.createElement("div");
        outlineContainer.classList.add("sd-outline");
        this._container.appendChild(outlineContainer);
        new mx.mxOutline(this._graph, outlineContainer);
    }

    private setupToolbar() {
        const toolbarBelt = document.createElement("div");
        toolbarBelt.classList.add("sd-toolbar-belt");
        (this._container.parentElement as HTMLElement).appendChild(toolbarBelt);
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
                this.updateEditorLocation();
            }
        );

        this._toolbar.addButton(
            this._config.icons.zoomOutIcon,
            "Zoom Out",
            () => {
                this._editor.execute("zoomOut");
                this.redrawEdges();
                this.updateEditorLocation();
            }
        );

        this._toolbar.addButton(
            this._config.icons.zoomFitIcon,
            "Fit",
            () => {
                this._graph.fit(undefined!);
                this.updateEditorLocation();
            }
        );

        this._toolbar.addDivider();

        this._toolbar.addButton(
            this._config.icons.autoArrangeCellsIcon,
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
        const entityValue = new SchemaDesignerEntity(entity, this._config, this._graph, this);
        const entityCell = new mx.mxCell(
            entityValue,
            new mx.mxGeometry(
                0,
                0,
                entityValue.getWidth(),
                entityValue.getHeight()
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

    public renderRelationship(relationship: IRelationship) {
        const cells = this._model.getChildCells(this._graph.getDefaultParent());
        const source = cells.find((cell) => cell.value.name === relationship.entity && cell.value.schema === relationship.schemaName);
        const target = cells.find((cell) => cell.value.name === relationship.referencedEntity && cell.value.schema === relationship.referencedSchema);
        if (source === undefined || target === undefined) {
            return;
        }
        const edgeValue: EdgeCellValue = {
            sourceRow: source.value.columns.findIndex((column: IColumn) => column.name === relationship.column) + 1,
            targetRow: target.value.columns.findIndex((column: IColumn) => column.name === relationship.referencedColumn) + 1,
            column: relationship.column,
            entity: relationship.entity,
            foreignKeyName: relationship.foreignKeyName,
            onDeleteAction: relationship.onDeleteAction,
            onUpdateAction: relationship.onUpdateAction,
            referencedEntity: relationship.referencedEntity,
            referencedSchema: relationship.referencedSchema,
            referencedColumn: relationship.referencedColumn,
            schemaName: relationship.schemaName
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
                    foreignKeyName: cell.value.foreignKeyName,
                    onDeleteAction: OnAction.CASCADE,
                    onUpdateAction: OnAction.CASCADE,
                    column: cell.source.value.columns[cell.value.sourceRow - 1].name,
                    entity: cell.source.value.name,
                    schemaName: cell.source.value.schema,
                    referencedEntity: cell.target.value.name,
                    referencedColumn: cell.target.value.columns[cell.value.targetRow - 1].name,
                    referencedSchema: cell.target.value.schema,
                };
                schema.relationships.push(relationship);
            }
        }
        return schema;
    }

    public autoArrange() {
        this._model.beginUpdate();
        this._layout.execute(this._graph.getDefaultParent());

        this._model.endUpdate();
    }

    public addCellClickListener(listener: (cell: mxCell) => void) {
        this.cellClickListeners.push(listener);
    }

    public scrollToCell(cell: mxCell) {
        this._graph.scrollCellToVisible(cell, true);
    }

    public updateEditorLocation() {
        this._config.updateEditorPosition(this._currentCellUnderEdit.x, this._currentCellUnderEdit.y, this._graph.view.scale);
    }

    public getRelationships(stateCell: mxCellState): {
        outgoing: mxCell[];
        incoming: mxCell[];
    } {
        const outgoing: mxCell[] = [];
        const incoming: mxCell[] = [];
        const cells = this._model.getChildCells(this._graph.getDefaultParent());
        for (let i = 0; i < cells.length; i++) {
            const cell = cells[i];
            if (cell.edge) {
                if (cell.source.id === stateCell.cell.id) {
                    outgoing.push(cell);
                } else if (cell.target.id === stateCell.cell.id) {
                    incoming.push(cell);
                }
            }
        }
        return {
            outgoing,
            incoming
        };
    }
}



