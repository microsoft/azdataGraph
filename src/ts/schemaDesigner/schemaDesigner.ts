import './schemaDesigner.css';
import '../../css/common.css';

import { EdgeCellValue, extendedConnectionHandler, IColumn, IForeignKey, ISchema, ITable, OnAction, SchemaDesignerConfig } from './schemaDesignerInterfaces';
import { mxCell, mxCellState, mxEditor, mxGraph, mxGraphLayout, mxGraphModel } from 'mxgraph';
import { mxGraphFactory as mx } from '../mx';
import { SchemaDesignerToolbar } from './schemaDesignerToolbar';
import { getRowY } from './utils';
import { SchemaDesignerTable } from './schemaDesignerEntity';
import { SchemaDesignerLayout } from './schemaDesignerLayout';
import { v4 as uuidv4 } from 'uuid';

export class SchemaDesigner {
    /**
     * Array of registered listeners for cell clicks
     */
    private cellClickListeners: ((cell: mxCell) => void)[] = [];
    /**
     * mxCellState for the currently edited cell
     */
    private _activeCellState!: mxCellState;

    /**
     * mxEditor instance for the schema designer
     */
    public mxEditor!: mxEditor;
    /**
     * mxGraph instance for the schema designer
     */
    public mxGraph!: mxGraph;
    /**
     * mxModel instance for the schema designer
     */
    public mxModel!: mxGraphModel;
    /**
     * mxLayout instance for the schema designer
     */
    public mxLayout!: mxGraphLayout;
    /**
     * Toolbar for the schema designer
     */
    public toolbar!: SchemaDesignerToolbar;


    constructor(
        private container: HTMLElement,
        public config: SchemaDesignerConfig
    ) {
        this.initializeGraph();
    }

    /**
     * Sets up the mxGraph instance for the schema designer
     */
    private initializeGraph() {
        this.overwriteMxGraphDefaults();
        this.configureEdgeTerminals();
        this.mxEditor = new mx.mxEditor();
        this.mxEditor.setGraphContainer(this.container);
        this.mxGraph = this.mxEditor.graph;
        this.mxModel = this.mxGraph.getModel();
        this.configureMxEditor();
        this.configureMxGraph();
        this.applyColors();
        this.configureMxOutline();
        this.initializeToolbar();
    }

    /**
     * Applies the colors from the config to the schema designer
     */
    private applyColors() {
        const body = document.getElementsByTagName("body")[0];
        body.style.setProperty("--sd-toolbar-background-color", this.config.colors.toolbarBackground);
        body.style.setProperty("--sd-toolbar-foreground-color", this.config.colors.toolbarForeground);
        body.style.setProperty("--sd-toolbar-hover-background-color", this.config.colors.toolbarHoverBackground);
        body.style.setProperty("--sd-toolbar-divider-background-color", this.config.colors.toolbarDividerBackground);

        body.style.setProperty("--sd-graph-background-color", this.config.colors.graphBackground);
        body.style.setProperty("--sd-graph-grid-color", this.config.colors.graphGrid);
        body.style.setProperty("--sd-border-color", this.config.colors.cellBorder);

        body.style.setProperty("--sd-cell-html-foreground", this.config.colors.cellForeground);
        body.style.setProperty("--sd-cell-html-hover-column-background", this.config.colors.cellColumnHover);
        body.style.setProperty("--sd-cell-divider-color", this.config.colors.cellDivider);
        body.style.setProperty("--sd-graph-background-color", this.config.colors.cellBackground);

        this.mxGraph.getStylesheet().getDefaultVertexStyle()[mx.mxConstants.STYLE_FILLCOLOR] = this.config.colors.cellBackground;
        this.mxGraph.getStylesheet().getDefaultVertexStyle()['cellHighlightColor'] = this.config.colors.cellHighlight;
        this.mxGraph.getStylesheet().getDefaultVertexStyle()['cellHighlightStrokeWidth'] = 3;

        this.mxGraph.getStylesheet().getDefaultEdgeStyle()['cellHighlightColor'] = this.config.colors.cellHighlight;
        this.mxGraph.getStylesheet().getDefaultEdgeStyle()["strokeColor"] = this.config.colors.edge;

        mx.mxConstants.OUTLINE_HANDLE_FILLCOLOR = this.config.colors.outlineHandleFill
        mx.mxConstants.OUTLINE_HANDLE_STROKECOLOR = this.config.colors.outlineHandleFill;
        mx.mxConstants.OUTLINE_COLOR = this.config.colors.outline;

        this.mxGraph.graphHandler.previewColor = this.config.colors.graphHandlePreview;
    }

    /**
     * Overwrites the default mxGraph settings
     */
    private overwriteMxGraphDefaults() {
        mx.mxClient.NO_FO = true;
        mx.mxEvent.disableContextMenu(this.container);
    }

    /**
     * Configures the edge terminals for the schema designer for different cardinalities
     */
    private configureEdgeTerminals() {
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

    /**
     * Configures the mxEditor instance for the schema designer
     */
    private configureMxEditor() {
        this.mxEditor.layoutSwimlanes = true;
    }

    /**
     * Configures the mxGraph instance for the schema designer
     */
    private configureMxGraph() {
        this.mxGraph.tooltipHandler.setEnabled(false);
        this.mxGraph.setConnectable(this.config.isEditable);
        this.mxGraph.setAllowDanglingEdges(false);
        this.mxGraph.setHtmlLabels(true);
        this.mxGraph.connectionHandler.enabled = this.config.isEditable;
        this.mxGraph.connectionHandler.movePreviewAway = false;
        this.mxGraph.connectionHandler.moveIconFront = true;
        this.mxGraph.connectionHandler.connectImage = new mx.mxImage(
            this.config.icons.connectorIcon,
            24,
            24
        );
        this.mxGraph.connectionHandler.factoryMethod = null!;
        this.mxLayout = new SchemaDesignerLayout(this.mxGraph);

        this.mxGraph.setCellsDisconnectable(false);
        this.mxGraph.autoSizeCellsOnAdd = true;
        this.mxGraph.getSelectionModel().setSingleSelection(true);
        this.mxGraph.setPanning(true);
        this.mxGraph.panningHandler.useLeftButtonForPanning = true;

        this.mxGraph.view.updateFloatingTerminalPoint = function (edge, start, end, source) {
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

        this.mxGraph.getLabel = (cell) => {
            if (cell?.value?.render !== undefined) {
                return cell.value.render();
            }
            return document.createElement("div");
        };
        this.mxGraph.isHtmlLabel = (cell) => {
            return !this.mxModel.isEdge(cell);
        }
        this.mxGraph.isCellEditable = (_cell) => {
            return false; //this._config.isEditable && !this._model.isEdge(cell);
        }
        this.mxGraph.isCellMovable = (cell) => {
            return this.config.isEditable && !this.mxModel.isEdge(cell);
        }
        this.mxGraph.isCellResizable = (_cell) => {
            return false;
        }
        this.mxGraph.isCellFoldable = (_cell) => {
            return false;
        }
        this.mxGraph.convertValueToString = function (cell) {
            if (cell?.value?.entity?.name !== undefined) {
                return cell.value.entity.name;
            }
            return mx.mxGraph.prototype.convertValueToString.apply(this, [cell]);
        }
        this.mxGraph.model.valueForCellChanged = function (cell, value) {
            const old = {
                id: cell.value.id,
                name: cell.value.name,
                schema: cell.value.schema,
                columns: cell.value.columns
            };
            cell.value.id = value.id;
            cell.value.name = value.name;
            cell.value.schema = value.schema;
            cell.value.columns = value.columns;
            return old;
        }
        const oldRedrawLabel = this.mxGraph.cellRenderer.redrawLabel;
        this.mxGraph.cellRenderer.redrawLabel = function (state) {
            oldRedrawLabel.apply(this, arguments as any); // super call;
            const graph = state.view.graph;
            const model = graph.model;
            if (model.isVertex(state.cell) && state.text !== null) {
                const value = state.cell.value as SchemaDesignerTable;
                if (value.setupEntityDOM !== undefined) {
                    value.setupEntityDOM(state.text.node, state);
                }
            }
        };

        (this.mxGraph.connectionHandler as extendedConnectionHandler).updateRow = function (target) {
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
        (this.mxGraph.connectionHandler as extendedConnectionHandler).updateIcons = function (state, icons: any, me) {
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

        const oldMouseMove = this.mxGraph.connectionHandler.mouseMove;
        (this.mxGraph.connectionHandler as extendedConnectionHandler).mouseMove = function (_sender, me) {
            if (this.edgeState !== null) {
                this.currentRowNode = this.updateRow(me.getSource() as HTMLElement) as HTMLElement;
                const cellValue = this.edgeState.cell.value as EdgeCellValue;
                const sourceTableValue = (this as any).previous.cell.value as SchemaDesignerTable;
                if (this.currentRow !== null && this.currentRow !== undefined) {
                    const targetCellState = (this as any).currentState as mxCellState;
                    if (targetCellState?.cell?.value) {
                        const targetCellValue = targetCellState.cell.value as SchemaDesignerTable;
                        if (cellValue) {
                            const targetColumnName = targetCellValue.columns[this.currentRow - 1].name;
                            cellValue.targetRow = this.currentRow;
                            cellValue.referencedColumns = [targetColumnName];
                            cellValue.referencedSchemaName = targetCellValue.schema;
                            cellValue.referencedTableName = targetCellValue.name;
                            cellValue.name = `FK_${sourceTableValue.name}_${cellValue.referencedTableName}`;
                        }
                    }
                } else {
                    cellValue.targetRow = 0;
                }
            }
            oldMouseMove.apply(this, arguments as any);
        };

        (this.mxGraph.connectionHandler as extendedConnectionHandler).createEdgeState = function (_me) {
            const sourceCellState = (this as any).currentState as mxCellState;
            const sourceCellValue = sourceCellState.cell.value as SchemaDesignerTable;
            const targetColumnName = sourceCellValue.columns[this.currentRow ? this.currentRow - 1 : 0].name;
            const foreignKey: EdgeCellValue = {
                sourceRow: this.currentRow || 0,
                targetRow: 0,
                id: uuidv4(),
                name: '',
                columns: [targetColumnName],
                referencedSchemaName: '',
                referencedTableName: '',
                referencedColumns: [],
                onDeleteAction: OnAction.CASCADE,
                onUpdateAction: OnAction.CASCADE
            };
            const edge = this.createEdge(foreignKey);
            const style = this.graph.getCellStyle(edge);
            const state = new mx.mxCellState(this.graph.view, edge, style);
            this.sourceRowNode = this.currentRowNode;
            return state;
        };

        (this.mxGraph.connectionHandler as extendedConnectionHandler).isValidTarget = function (_cell) {
            return this.currentRowNode !== null;
        };

        (this.mxGraph.connectionHandler as extendedConnectionHandler).validateConnection = function (source, target) {
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

        (this.mxGraph.connectionHandler as extendedConnectionHandler).getTargetPerimeterPoint = function (state, me) {
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

        (this.mxGraph.connectionHandler as extendedConnectionHandler).getSourcePerimeterPoint = function (state, next, me) {
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

        this.mxGraph.connectionHandler.addListener(mx.mxEvent.CONNECT, (_sender, evt) => {
            const edge = evt.getProperty('cell');
            const source = this.mxGraph.getModel().getTerminal(edge, true);
            this.mxGraph.view.invalidate(source, false, false);
            this.mxGraph.view.validate(source);
        });

        this.mxGraph.addListener(mx.mxEvent.REMOVE_CELLS, (_sender, evt) => {
            const removedCell = evt.properties.cells[0];
            if (removedCell !== undefined && removedCell.edge) {
                const source = this.mxGraph.getModel().getTerminal(removedCell, true);
                this.mxGraph.view.invalidate(source, false, false);
                this.mxGraph.view.validate(source);
            }
        });

        this.mxGraph.addListener(mx.mxEvent.DOUBLE_CLICK, (_sender, _evt) => {
            const cell = this.mxGraph.getSelectionCell();
            if (cell !== undefined) {
                this.cellClickListeners.forEach((listener) => listener(cell));
            }
        });
        this.mxGraph.getStylesheet().getDefaultEdgeStyle()['edgeStyle'] = mx.mxEdgeStyle.ElbowConnector;
    }

    /**
     * Configures the mxGraph outline for the schema designer
     */
    private configureMxOutline() {
        const outlineContainer = document.createElement("div");
        outlineContainer.classList.add("sd-outline");
        this.container.appendChild(outlineContainer);
        new mx.mxOutline(this.mxGraph, outlineContainer);
    }

    /**
     * Initializes the toolbar for the schema designer
     */
    private initializeToolbar() {
        const toolbarBelt = document.createElement("div");
        toolbarBelt.classList.add("sd-toolbar-belt");
        (this.container.parentElement as HTMLElement).appendChild(toolbarBelt);
        this.toolbar = new SchemaDesignerToolbar(toolbarBelt, this.mxGraph, this.config);
        if (this.config.isEditable) {
            this.toolbar.addButton(
                this.config.icons.addTableIcon,
                "Add Table",
                () => {
                },
                (_graph, evt, _cell) => {
                    this.mxGraph.stopEditing(false);
                    const pt = this.mxGraph.getPointForEvent(evt, true);
                    const entity: ITable = this.createTable();
                    const cell = this.renderTable(entity, pt.x, pt.y);
                    // Get cell state
                    const state = this.mxGraph.view.getState(cell);
                    if (state !== undefined) {
                        (cell.value as SchemaDesignerTable).editTable(state);
                    }
                }
            );
            this.toolbar.addDivider();
            this.toolbar.addButton(
                this.config.icons.undoIcon,
                "Undo",
                () => {
                    this.mxEditor.execute("undo");
                }
            );
            this.toolbar.addButton(
                this.config.icons.redoIcon,
                "Redo",
                () => {
                    this.mxEditor.execute("redo");
                }
            );
            this.toolbar.addDivider();
        }


        this.toolbar.addButton(
            this.config.icons.zoomInIcon,
            "Zoom In",
            () => {
                this.mxEditor.execute("zoomIn");
                this.redrawEdges();
                this.updateEditorPosition();
            }
        );

        this.toolbar.addButton(
            this.config.icons.zoomOutIcon,
            "Zoom Out",
            () => {
                this.mxEditor.execute("zoomOut");
                this.redrawEdges();
                this.updateEditorPosition();
            }
        );

        this.toolbar.addButton(
            this.config.icons.zoomFitIcon,
            "Fit",
            () => {
                this.mxGraph.fit(undefined!);
                this.updateEditorPosition();
            }
        );

        this.toolbar.addDivider();

        this.toolbar.addButton(
            this.config.icons.autoArrangeCellsIcon,
            "Auto Arrange",
            () => {
                this.autoLayout();
            }
        );

        if (this.config.isEditable) {
            this.toolbar.addDivider();
            this.toolbar.addButton(
                this.config.icons.deleteIcon,
                "Delete",
                () => {
                    const cell = this.mxGraph.getSelectionCell();
                    if (cell !== undefined) {
                        this.mxEditor.execute("delete", cell);
                    }
                }
            );
        }
    }

    /**
     * Redraws the edges in the schema designer
     */
    private redrawEdges() {
        const cells = this.mxModel.getChildCells(this.mxGraph.getDefaultParent());
        for (let i = 0; i < cells.length; i++) {
            if (!cells[i].edge) {
                continue;
            }
            const edge = cells[i];
            this.mxGraph.view.invalidate(edge, true, false);
            this.mxGraph.view.validate(edge);
        }
    }

    /**
     * Sets the current cell under edit
     */
    public set activeCellState(value: mxCellState) {
        if (this._activeCellState !== undefined && value.cell.id !== this._activeCellState.cell.id
        ) {
            this._activeCellState.cell.value.editor = false;
        }
        this._activeCellState = value;
    }

    /**
     * Renders the schema in the schema designer
     * @param schema The schema to render
     * @param cleanUndoManager Whether to clean the undo manager so that the user can't undo the rendering
     */
    public renderSchema(schema: ISchema, cleanUndoManager: boolean = false) {
        const parent = this.mxGraph.getDefaultParent();
        this.mxModel.beginUpdate();
        try {
            this.mxGraph.removeCells(this.mxModel.getChildCells(parent));
            const tables = schema.tables;
            for (let i = 0; i < tables.length; i++) {
                const table = tables[i];
                this.renderTable(table, 100 + i * 50, 100 + i * 50);
            }

            for (let i = 0; i < tables.length; i++) {
                const table = tables[i];
                for (let j = 0; j < table.foreignKeys.length; j++) {
                    const foreignKey = table.foreignKeys[j];
                    this.renderForeignKey(foreignKey, table);
                }
            }
        } finally {
            this.mxModel.endUpdate();
            this.mxGraph.view.refresh();
            const parentCells = [];
            for (let i = 0; i < this.mxModel.cells.length; i++) {
                if (this.mxModel.cells[i].vertex) {
                    if (this.mxModel.getIncomingEdges(this.mxModel.cells[i]).length === 0) {
                        parentCells.push(this.mxModel.cells[i]);
                    }

                }
            }
            this.autoLayout();
            if (cleanUndoManager) {
                this.mxEditor.undoManager.clear();
            }
        }
    }

    /**
     * Renders an entity in the schema designer
     * @param entity The entity to render
     * @param x the x position to render the entity at
     * @param y the y position to render the entity at
     * @returns The cell that was rendered
     */
    public renderTable(entity: ITable, x: number, y: number): mxCell {
        const entityValue = new SchemaDesignerTable(entity, this);
        const entityCell = new mx.mxCell(
            entityValue,
            new mx.mxGeometry(
                0,
                0,
                entityValue.width,
                entityValue.height
            )
        );
        entityCell.setVertex(true);
        this.mxModel.beginUpdate();
        try {
            entityCell.geometry.x = x;
            entityCell.geometry.y = y;
            entityCell.geometry.alternateBounds = new mx.mxRectangle(0, 0, entityCell.geometry.width, entityCell.geometry.height);
            this.mxGraph.addCell(entityCell, this.mxGraph.getDefaultParent());
        } finally {
            this.mxModel.endUpdate();
        }
        this.mxGraph.setSelectionCell(entityCell);
        return entityCell;
    }

    /**
     * Renders a relationship in the schema designer
     * @param relationship The relationship to render
     * @returns The edge that was rendered
     */
    public renderForeignKey(foreignKey: IForeignKey, sourceTable: ITable): void {
        const cells = this.mxModel.getChildCells(this.mxGraph.getDefaultParent());
        const source = cells.find((cell) => {
            const value = cell.value as SchemaDesignerTable
            return value.name === sourceTable.name && value.schema === sourceTable.schema;
        });
        const target = cells.find((cell) => {
            const value = cell.value as SchemaDesignerTable
            return value.name === foreignKey.referencedTableName && value.schema === foreignKey.referencedSchemaName
        });
        if (source === undefined || target === undefined) {
            return;
        }

        const sourceValue = source.value as SchemaDesignerTable;
        const targetValue = target.value as SchemaDesignerTable;

        // One edge for each column mapping
        for (let i = 0; i < foreignKey.columns.length; i++) {
            const sourceRowIndex = sourceValue.columns.findIndex((column: IColumn) => column.name === foreignKey.columns[i]) + 1;
            const targetRowIndex = targetValue.columns.findIndex((column: IColumn) => column.name === foreignKey.referencedColumns[i]) + 1;
            const edgeValue: EdgeCellValue = {
                sourceRow: sourceRowIndex,
                targetRow: targetRowIndex,
                columns: [foreignKey.columns[i]],
                name: foreignKey.name,
                onDeleteAction: foreignKey.onDeleteAction,
                onUpdateAction: foreignKey.onUpdateAction,
                referencedTableName: targetValue.name,
                referencedColumns: [foreignKey.referencedColumns[i]],
                referencedSchemaName: targetValue.schema,
                id: foreignKey.id
            };
            this.mxGraph.insertEdge(this.mxGraph.getDefaultParent(), null!, edgeValue, source, target);
        }
        this.mxGraph.view.invalidate(source, false, false);
        this.mxGraph.view.validate(source);
        this.mxGraph.view.invalidate(target, false, false);
        this.mxGraph.view.validate(target);
    }

    /**
     * Gets the current schema from the schema designer
     */
    public get schema(): ISchema {
        const schema: ISchema = {
            tables: []
        };
        const cells = this.mxModel.getChildCells(this.mxGraph.getDefaultParent());
        for (let i = 0; i < cells.length; i++) {
            const cell = cells[i];
            if (cell.vertex) {
                const table: ITable = {
                    columns: cell.value.columns,
                    name: cell.value.name,
                    schema: cell.value.schema,
                    foreignKeys: [],
                    id: cell.value.id
                };
                schema.tables.push(table);
                table.foreignKeys = this.getForeignKeysForTable(cell);
            }
        }
        return schema;
    }

    /**
     * Automatically arranges the cells in the schema designer
     */
    public autoLayout() {
        this.mxModel.beginUpdate();
        this.mxLayout.execute(this.mxGraph.getDefaultParent());
        this.mxModel.endUpdate();
    }

    /**
     * Registers a listener for cell clicks
     * @param listener The listener to register
     */
    public addCellClickListener(listener: (cell: mxCell) => void) {
        this.cellClickListeners.push(listener);
    }

    /**
     * Scrolls to a cell in the schema designer
     * @param cell The cell to scroll to
     */
    public scrollToCell(cell: mxCell) {
        this.mxGraph.scrollCellToVisible(cell, true);
    }

    /**
     * Updates the position of the editor in the schema designer. This is called
     * when the graph scales or when the graph is moved
     */
    public updateEditorPosition() {
        this.config.updateEditorPosition(this._activeCellState.x, this._activeCellState.y, this.mxGraph.view.scale);
    }

    /**
     * Gets the relationships of an entity
     * @param entityCellState The cell state of the entity
     * @returns The relationships of the entity
     */
    public getTableRelationships(entityCellState: mxCellState): {
        outgoing: mxCell[];
        incoming: mxCell[];
    } {
        const outgoing: mxCell[] = [];
        const incoming: mxCell[] = [];
        const cells = this.mxModel.getChildCells(this.mxGraph.getDefaultParent());
        for (let i = 0; i < cells.length; i++) {
            const cell = cells[i];
            if (cell.edge) {
                if (cell.source.id === entityCellState.cell.id) {
                    outgoing.push(cell);
                } else if (cell.target.id === entityCellState.cell.id) {
                    incoming.push(cell);
                }
            }
        }
        return {
            outgoing,
            incoming
        };
    }

    /**
     * Creates a new entity
     * @returns The new entity
     */
    private createTable(): ITable {
        let index = 1;
        let name = `Table${index}`;
        for (this.schema.tables.length; this.schema.tables.find((tables) => tables.name === name); index++) {
            name = `Table${index}`;
        }
        const schemas = new Set(this.schema.tables.map((tables) => tables.schema));

        return {
            id: uuidv4(),
            name: name,
            schema: schemas.size > 0 ? Array.from(schemas)[0] : 'dbo',
            columns: [
                {
                    id: uuidv4(),
                    name: "column_1",
                    dataType: "int",
                    isPrimaryKey: true,
                    isIdentity: true,
                }
            ],
            foreignKeys: []
        }
    }

    /**
     * Updates the active cell state entity
     * @param editedTable describes the new entity
     * @param editedOutgoingEdges describes the new relationships
     * @returns void
     */
    public updateActiveCellStateTable(editedTable: ITable) {
        this.mxGraph.model.beginUpdate();

        const state = this._activeCellState;
        if (state === undefined) {
            // No active cell state found. Make this a no-op.
            return;
        }

        const oldTable = state.cell.value as SchemaDesignerTable;

        const incomingEdges = this.mxModel.getIncomingEdges(state.cell);
        const outgoingEdges = this.mxModel.getOutgoingEdges(state.cell);

        const incomingEdgesIds = incomingEdges.map((edge) => {
            const edgeValue = edge.value as EdgeCellValue;
            return oldTable.columns[edgeValue.targetRow - 1].id;
        });

        const outgoingEdgesIds = outgoingEdges.map((edge) => {
            const edgeValue = edge.value as EdgeCellValue;
            return editedTable.columns[edgeValue.sourceRow - 1].id;
        });

        this.mxGraph.labelChanged(state.cell, {
            id: editedTable.id,
            name: editedTable.name,
            schema: editedTable.schema,
            columns: editedTable.columns
        });

        state.cell.value.editor = false;

        this.mxGraph.resizeCell(state.cell, new mx.mxRectangle(state.x, state.y, oldTable.width, oldTable.height), true);
        this.mxGraph.refresh(state.cell);

        // Delete all edges;
        const edges = this.mxGraph.getEdges(state.cell);
        edges.forEach(e => {
            this.mxGraph.getModel().remove(e);
        });

        incomingEdges.forEach((edge, index) => {
            const edgeValue = edge.value as EdgeCellValue;
            edgeValue.referencedTableName = editedTable.name;
            edgeValue.referencedSchemaName = editedTable.schema;
            const column = editedTable.columns.find((column) => column.id === incomingEdgesIds[index]);
            if (column !== undefined) {
                edgeValue.referencedColumns = [column.name];
                const columnIndex = editedTable.columns.findIndex((column) => column.id === incomingEdgesIds[index]);
                edgeValue.targetRow = columnIndex + 1;
                this.renderForeignKey(edgeValue, edge.source.value);
            }
        });

        outgoingEdges.forEach((edge, index) => {
            const edgeValue = edge.value as EdgeCellValue;
            const column = editedTable.columns.find((column) => column.id === outgoingEdgesIds[index]);
            if (column !== undefined) {
                edgeValue.columns = [column.name];
                const columnIndex = editedTable.columns.findIndex((column) => column.id === outgoingEdgesIds[index]);
                edgeValue.sourceRow = columnIndex + 1;
                this.renderForeignKey(edgeValue, editedTable);
            }
        });

        // Update the cell position
        this.autoLayout();

        this.mxGraph.model.endUpdate();
    }

    // Gets the foreign keys for a table
    public getForeignKeysForTable(tableCell: mxCell): IForeignKey[] {
        const outgoingEdges = this.mxModel.getOutgoingEdges(tableCell);

        const foreignKeyMap = outgoingEdges.reduce((map: Map<string, IForeignKey>, edge) => {
            const edgeValue = edge.value as EdgeCellValue;
            if (map.has(edgeValue.id)) {
                const existingForeignKey = map.get(edgeValue.id)!;
                existingForeignKey.columns.push(...edgeValue.columns.slice());
                existingForeignKey.referencedColumns.push(...edgeValue.referencedColumns.slice());
            } else {
                map.set(edgeValue.id, {
                    id: edgeValue.id,
                    name: edgeValue.name,
                    columns: edgeValue.columns.slice(),
                    referencedSchemaName: edgeValue.referencedSchemaName,
                    referencedTableName: edgeValue.referencedTableName,
                    referencedColumns: edgeValue.referencedColumns.slice(),
                    onDeleteAction: edgeValue.onDeleteAction,
                    onUpdateAction: edgeValue.onUpdateAction
                });
            }
            return map;
        }, new Map<string, IForeignKey>());

        return Array.from(foreignKeyMap.values());
    }
}



