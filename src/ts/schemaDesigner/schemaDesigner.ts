import './schemaDesigner.css';
import '../../css/common.css';

import { Column, EdgeCellValue, extendedConnectionHandler, ForeignKey, OnAction, Schema, SchemaDesignerColors, SchemaDesignerConfig, Table } from './schemaDesignerInterfaces';
import { mxCell, mxCellState, mxEditor, mxGraph, mxGraphLayout, mxGraphModel, mxOutline } from 'mxgraph';
import { mxGraphFactory as mx } from '../mx';
import { SchemaDesignerToolbar } from './schemaDesignerToolbar';
import { getRowY } from './utils';
import { SchemaDesignerTable } from './schemaDesignerEntity';
import { SchemaDesignerLayout } from './schemaDesignerLayout';
import { v4 as uuidv4 } from 'uuid';
import * as htmlToImage from 'html-to-image';

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
     * mxGraph instance for the schema designer
     */
    public mxOutline!: mxOutline;
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

    private _outlineContainer!: HTMLElement;

    public filteredCellIds: string[] = [];

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
        this.applyColors(this.config.colors);
        this.configureMxOutline();
        this.initializeToolbar();
    }

    /**
     * Applies the colors from the config to the schema designer
     */
    public applyColors(colors: SchemaDesignerColors) {
        const body = document.getElementsByTagName("body")[0];
        body.style.setProperty("--sd-toolbar-background-color", colors.toolbarBackground);
        body.style.setProperty("--sd-toolbar-foreground-color", colors.toolbarForeground);
        body.style.setProperty("--sd-toolbar-hover-background-color", colors.toolbarHoverBackground);
        body.style.setProperty("--sd-toolbar-divider-background-color", colors.toolbarDividerBackground);

        body.style.setProperty("--sd-graph-background-color", colors.graphBackground);
        body.style.setProperty("--sd-graph-grid-color", colors.graphGrid);
        body.style.setProperty("--sd-border-color", colors.cellBorder);

        body.style.setProperty("--sd-cell-html-foreground", colors.cellForeground);
        body.style.setProperty("--sd-cell-html-hover-column-background", colors.cellColumnHover);
        body.style.setProperty("--sd-cell-divider-color", colors.cellDivider);
        body.style.setProperty("--sd-graph-background-color", colors.cellBackground);

        this.mxGraph.getStylesheet().getDefaultVertexStyle()[mx.mxConstants.STYLE_FILLCOLOR] = colors.cellBackground;
        this.mxGraph.getStylesheet().getDefaultVertexStyle()['cellHighlightColor'] = colors.cellHighlight;
        this.mxGraph.getStylesheet().getDefaultVertexStyle()['cellHighlightStrokeWidth'] = 3;

        this.mxGraph.getStylesheet().getDefaultEdgeStyle()['cellHighlightColor'] = colors.cellHighlight;
        this.mxGraph.getStylesheet().getDefaultEdgeStyle()["strokeColor"] = colors.edge;

        mx.mxConstants.OUTLINE_HANDLE_FILLCOLOR = colors.outlineHandleFill
        mx.mxConstants.OUTLINE_HANDLE_STROKECOLOR = colors.outlineHandleFill;
        mx.mxConstants.OUTLINE_COLOR = colors.outline;

        this.mxGraph.graphHandler.previewColor = colors.graphHandlePreview;

        this.mxGraph.refresh();
        this.mxGraph.view.refresh();
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
            const div = start.text.node.getElementsByClassName("sd-table-columns")[0] as HTMLElement;

            let x = start.x;
            let y = start.getCenterY();

            // Checks on which side of the terminal to leave
            if (next.x > x + start.width / 2) {
                x += start.width;
            }

            if (div !== null) {
                y = start.getCenterY() - div.scrollTop;
                const edgeCellValue = edge.cell.value as EdgeCellValue;

                if (edgeCellValue !== undefined) {
                    const row = source ? edgeCellValue.sourceRow : edgeCellValue.targetRow;
                    const columns = div.getElementsByClassName("sd-table-column");
                    const column = columns[Math.min(columns.length - 1, row - 1)] as HTMLElement;
                    if (column !== null) {
                        y = getRowY(start, column);
                    }

                }
                y = Math.min(start.y + start.height, Math.max(start.y, y));
                if (edge !== null && edge.absolutePoints !== null) {
                    next.y = y;
                }
            }
            edge.setAbsoluteTerminalPoint(new mx.mxPoint(x, y), source);

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
        const oldCellIsVisible = this.mxGraph.isCellVisible;
        this.mxGraph.isCellVisible = (cell) => {
            const result = oldCellIsVisible.apply(this.mxGraph, [cell]);
            if (cell.vertex) {
                const cellValue = cell.value as SchemaDesignerTable;
                return result && cellValue.isVisible;
            } else if (cell.edge) {
                const cellValue = cell.value as EdgeCellValue;
                return result && cellValue.isVisible;
            }
            return result;
        };
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
                const columnsDiv = columnDiv.parentElement!;
                const s = state.view.scale;
                icons[0].node.style.userSelect = "none";
                icons[0].node.style.visibility = "visible";
                icons[0].bounds.width = s * 24;
                icons[0].bounds.height = s * 24;
                icons[0].bounds.x = state.x + columnDiv.offsetWidth * s;
                icons[0].bounds.y =
                    state.y +
                    columnDiv.offsetTop * s +
                    - columnsDiv.scrollTop +
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
                onUpdateAction: OnAction.CASCADE,
                isVisible: true
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
        this.mxGraph.getStylesheet().getDefaultEdgeStyle()['edgeStyle'] = mx.mxEdgeStyle.EntityRelationPerpendicular;
    }

    /**
     * Configures the mxGraph outline for the schema designer
     */
    private configureMxOutline() {
        this._outlineContainer = document.createElement("div");
        this._outlineContainer.classList.add("sd-outline");
        (this.container.parentElement as HTMLElement).appendChild(this._outlineContainer);
        this.mxOutline = new mx.mxOutline(this.mxGraph, this._outlineContainer);
    }

    /**
     * Initializes the toolbar for the schema designer
     */
    private initializeToolbar() {
        const toolbarBelt = document.createElement("div");
        toolbarBelt.classList.add("sd-toolbar-belt");
        this.toolbar = new SchemaDesignerToolbar(toolbarBelt, this.mxGraph, this.config);
        if (this.config.isEditable) {
            this.toolbar.addButton(
                this.config.icons.addTableIcon,
                "Add Table",
                () => {
                    this.addNewTable();
                },
                (_graph, evt, _cell) => {
                    this.mxGraph.stopEditing(false);
                    const pt = this.mxGraph.getPointForEvent(evt, true);
                    const entity: Table = this.createTable();
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
                this.zoomIn();
            }
        );

        this.toolbar.addButton(
            this.config.icons.zoomOutIcon,
            "Zoom Out",
            () => {
                this.zoomOut();
            }
        );

        this.toolbar.addButton(
            this.config.icons.zoomFitIcon,
            "Fit",
            () => {
                this.zoomToFit();
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
            this.toolbar.addDivider();
            this.toolbar.addButton(
                this.config.icons.exportIcon,
                "Export",
                () => {
                    const schema = this.schema;
                    this.config.publish(schema);
                }
            );
            this.toolbar.addButton(
                this.config.icons.editIcon,
                "filter",
                () => {
                    // Randomly filter the cells
                    const cells = this.mxModel.getChildCells(this.mxGraph.getDefaultParent());
                    const filteredCells = cells.filter((cell) => {
                        if (cell.vertex) {
                            return Math.random() > 0.3;
                        } else {
                            return false;
                        }
                    }).map((cell) => {
                        return cell.value.id;
                    }
                    );
                    this.filterCells(filteredCells);
                }
            )
        }

        if (this.config.showToolbar === false) {
            toolbarBelt.style.display = "none";
        } else {
            (this.container.parentElement as HTMLElement).appendChild(toolbarBelt);
        }
    }

    /**
     * Zoom in the schema designer
     */
    public zoomIn() {
        this.mxEditor.execute("zoomIn");
        this.redrawEdges();
        this.updateEditorPosition();
    }

    /**
     * Zoom out the schema designer
     */
    public zoomOut() {
        this.mxEditor.execute("zoomOut");
        this.redrawEdges();
        this.updateEditorPosition();
    }

    /**
     * Zoom to fit the schema designer
     */
    public zoomToFit() {
        this.mxGraph.view.rendering = false;
        while (true) {
            this.mxGraph.fit(null!);
            if (this.mxGraph.view.scale < 1) {
                break;
            }
        }
        this.mxGraph.view.rendering = true;
        this.autoLayout();
        this.updateEditorPosition();
    }

    /**
     * Adds a drag and drop listener for the table
     * @param element The element to make draggable
     */
    public addTableDragAndDropListener(element: HTMLElement) {
        this.makeElementDraggable(element, (_graph: mxGraph, evt: MouseEvent, _cell: mxCellState) => {
            this.mxGraph.stopEditing(false);
            const pt = this.mxGraph.getPointForEvent(evt, true);
            const entity: Table = this.createTable();
            const cell = this.renderTable(entity, pt.x, pt.y);
            // Get cell state
            const state = this.mxGraph.view.getState(cell);
            if (state !== undefined) {
                (cell.value as SchemaDesignerTable).editTable(state);
            }
        })
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

    public get activeCellState(): mxCellState {
        return this._activeCellState;
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
    public renderSchema(schema: Schema, cleanUndoManager: boolean = false) {
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

            const cells = this.mxModel.getChildCells(this.mxGraph.getDefaultParent());
            // select the cell with most edges
            let max = 0;
            let cell = cells[0]
            for (let i = 0; i < cells.length; i++) {
                const edges = this.mxModel.getEdges(cells[i]);
                if (edges.length > max) {
                    max = edges.length;
                    cell = cells[i];
                }
            }

            this.mxGraph.setSelectionCell(cell);

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
    public renderTable(entity: Table, x: number, y: number): mxCell {
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
    public renderForeignKey(foreignKey: ForeignKey, sourceTable: Table): void {
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
            const sourceRowIndex = sourceValue.columns.findIndex((column: Column) => column.name === foreignKey.columns[i]) + 1;
            const targetRowIndex = targetValue.columns.findIndex((column: Column) => column.name === foreignKey.referencedColumns[i]) + 1;
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
                id: foreignKey.id,
                isVisible: true
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
    public get schema(): Schema {
        const schema: Schema = {
            tables: []
        };
        const cells = this.mxModel.getChildCells(this.mxGraph.getDefaultParent());
        for (let i = 0; i < cells.length; i++) {
            const cell = cells[i];
            if (cell.vertex) {
                const table: Table = {
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
        if (this.activeCellState !== undefined) {
            this.config.updateEditorPosition(this._activeCellState.x, this._activeCellState.y, this.mxGraph.view.scale);
        }
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

    public addNewTable() {
        this.mxModel.beginUpdate();
        this.mxGraph.stopEditing(false);
        const entity: Table = this.createTable();
        const cell = this.renderTable(entity, 100, 100);
        this.autoLayout();
        this.mxGraph.setSelectionCell(cell);
        this.mxGraph.scrollCellToVisible(cell, true);
        // Get cell state
        const state = this.mxGraph.view.getState(cell);
        if (state !== undefined) {
            (cell.value as SchemaDesignerTable).editTable(state);
        }
        this.mxModel.endUpdate();
    }

    /**
     * Creates a new entity
     * @returns The new entity
     */
    private createTable(): Table {
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
                    isNullable: false,
                    isUnique: false,
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
    public updateActiveCellStateTable(editedTable: Table) {
        this.mxGraph.model.beginUpdate();

        const state = this._activeCellState;
        if (state === undefined) {
            // No active cell state found. Make this a no-op.
            return;
        }

        const oldTable = state.cell.value as SchemaDesignerTable;

        const incomingEdges = this.mxModel.getIncomingEdges(state.cell);

        const incomingEdgesIds = incomingEdges.map((edge) => {
            const edgeValue = edge.value as EdgeCellValue;
            return oldTable.columns[edgeValue.targetRow - 1].id;
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
            const incomingEdgeId = incomingEdgesIds[index];
            const edgeValue = edge.value as EdgeCellValue;
            edgeValue.referencedTableName = editedTable.name;
            edgeValue.referencedSchemaName = editedTable.schema;
            const column = editedTable.columns.find((column) => column.id === incomingEdgeId);
            if (column !== undefined) {
                edgeValue.referencedColumns = [column.name];
                this.renderForeignKey(edgeValue, edge.source.value);
            }
        });

        editedTable.foreignKeys.forEach((foreignKey) => {
            this.renderForeignKey(foreignKey, editedTable);
        });

        this.mxGraph.scrollCellToVisible(state.cell, true);

        this.mxGraph.model.endUpdate();
    }

    // Gets the foreign keys for a table
    public getForeignKeysForTable(tableCell: mxCell): ForeignKey[] {
        const outgoingEdges = this.mxModel.getOutgoingEdges(tableCell);

        const foreignKeyMap = outgoingEdges.reduce((map: Map<string, ForeignKey>, edge) => {
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
        }, new Map<string, ForeignKey>());

        return Array.from(foreignKeyMap.values());
    }

    public makeElementDraggable(element: HTMLElement, onDragEndCallback?: (graph: mxGraph, evt: MouseEvent, cell: mxCellState) => void) {
        if (onDragEndCallback) {
            const dragImage = element.cloneNode(true) as HTMLElement;
            dragImage.style.backgroundColor = this.config.colors.toolbarBackground;
            const ds = mx.mxUtils.makeDraggable(
                element,
                this.mxGraph,
                onDragEndCallback,
                dragImage
            );
            ds.highlightDropTargets = true;
        }
    }

    public async exportImage(format: string): Promise<{
        fileContent: string,
        format: string,
        width: number,
        height: number
    }> {
        const selectedCells = this.mxGraph.getSelectionCells();
        this.mxGraph.setSelectionCells([]);
        const width = this.mxGraph.getGraphBounds().width + 300;
        const height = this.mxGraph.getGraphBounds().height + 300;
        this._outlineContainer.style.visibility = "hidden";
        const fileContentPromise = new Promise<string>((resolve) => {
            switch (format) {
                case 'png':
                    htmlToImage.toPng(this.container, {
                        width: width,
                        height: height,
                    }).then((dataUrl) => {
                        resolve(dataUrl);
                    })
                    break;
                case 'jpeg':
                    htmlToImage.toJpeg(this.container, {
                        width: width,
                        height: height,
                    }).then((dataUrl) => {
                        resolve(dataUrl);
                    })
                    break;
                case 'svg':
                    htmlToImage.toSvg(this.container, {
                        width: width,
                        height: height,
                    }).then((dataUrl) => {
                        resolve(dataUrl);
                    })
                    break;
                default:
                    throw new Error('Invalid format');
            }
        });
        const fileContent = await fileContentPromise;
        this.mxGraph.setSelectionCells(selectedCells);
        this._outlineContainer.style.visibility = "visible";
        return {
            fileContent,
            format: format,
            width: width,
            height: height
        }
    }

    public filterCells(tableIds?: string[]) {
        const cells = this.mxModel.getChildCells(this.mxGraph.getDefaultParent());

        if (tableIds === undefined || tableIds.length === 0) {
            for (let i = 0; i < cells.length; i++) {
                const cell = cells[i];
                cell.value.isVisible = true;
                cell.value.opacity = 1;
            }
            this.autoLayout();
            this.mxGraph.refresh();
            return;
        }

        const visibleCells: mxCell[] = [];
        let partiallyVisibleCells: mxCell[] = [];
        const visibleEdges: mxCell[] = [];
        let hiddenCells: mxCell[] = [];

        for (let i = 0; i < cells.length; i++) {
            const cell = cells[i];
            if (cell.vertex) {
                const tableValue = cell.value as SchemaDesignerTable;
                if (tableIds.includes(tableValue.id)) {
                    visibleCells.push(cell);
                } else {
                    hiddenCells.push(cell);
                }
            }
            if (cell.edge) {
                if (cell.source && cell.target) {
                    const sourceTableValue = cell.source.value as SchemaDesignerTable;
                    const targetTableValue = cell.target.value as SchemaDesignerTable;
                    if (tableIds.includes(sourceTableValue.id)) {
                        visibleEdges.push(cell);
                        partiallyVisibleCells.push(cell.target);
                    }
                    if (tableIds.includes(targetTableValue.id)) {
                        visibleEdges.push(cell);
                        partiallyVisibleCells.push(cell.source);
                    }
                }
            }
        }

        //remove visible and partially visible cells from hidden cells
        hiddenCells = hiddenCells.filter((cell) => {
            return !visibleCells.includes(cell) && !partiallyVisibleCells.includes(cell);
        });
        // remove visible cells from partially visible cells
        partiallyVisibleCells = partiallyVisibleCells.filter((cell) => {
            return !visibleCells.includes(cell);
        });

        for (let i = 0; i < visibleCells.length; i++) {
            const cell = visibleCells[i];
            cell.value.isVisible = true;
            cell.value.opacity = 1;
        }

        for (let i = 0; i < partiallyVisibleCells.length; i++) {
            const cell = partiallyVisibleCells[i];
            cell.value.isVisible = true;
            cell.value.opacity = 0.5;
        }

        for (let i = 0; i < hiddenCells.length; i++) {
            const cell = hiddenCells[i];
            cell.value.isVisible = false;
        }

        for (let i = 0; i < visibleEdges.length; i++) {
            const cell = visibleEdges[i];
            cell.value.isVisible = true;
        }
        this.autoLayout();
        this.mxGraph.refresh();
    }
}



