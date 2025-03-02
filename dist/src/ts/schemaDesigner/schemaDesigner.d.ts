import './schemaDesigner.css';
import '../../css/common.css';
import { IForeignKey, ISchema, ITable, SchemaDesignerColors, SchemaDesignerConfig } from './schemaDesignerInterfaces';
import { mxCell, mxCellState, mxEditor, mxGraph, mxGraphLayout, mxGraphModel } from 'mxgraph';
import { SchemaDesignerToolbar } from './schemaDesignerToolbar';
export declare class SchemaDesigner {
    private container;
    config: SchemaDesignerConfig;
    /**
     * Array of registered listeners for cell clicks
     */
    private cellClickListeners;
    /**
     * mxCellState for the currently edited cell
     */
    private _activeCellState;
    /**
     * mxEditor instance for the schema designer
     */
    mxEditor: mxEditor;
    /**
     * mxGraph instance for the schema designer
     */
    mxGraph: mxGraph;
    /**
     * mxModel instance for the schema designer
     */
    mxModel: mxGraphModel;
    /**
     * mxLayout instance for the schema designer
     */
    mxLayout: mxGraphLayout;
    /**
     * Toolbar for the schema designer
     */
    toolbar: SchemaDesignerToolbar;
    private _outlineContainer;
    constructor(container: HTMLElement, config: SchemaDesignerConfig);
    /**
     * Sets up the mxGraph instance for the schema designer
     */
    private initializeGraph;
    /**
     * Applies the colors from the config to the schema designer
     */
    applyColors(colors: SchemaDesignerColors): void;
    /**
     * Overwrites the default mxGraph settings
     */
    private overwriteMxGraphDefaults;
    /**
     * Configures the edge terminals for the schema designer for different cardinalities
     */
    private configureEdgeTerminals;
    /**
     * Configures the mxEditor instance for the schema designer
     */
    private configureMxEditor;
    /**
     * Configures the mxGraph instance for the schema designer
     */
    private configureMxGraph;
    /**
     * Configures the mxGraph outline for the schema designer
     */
    private configureMxOutline;
    /**
     * Initializes the toolbar for the schema designer
     */
    private initializeToolbar;
    /**
     * Zoom in the schema designer
     */
    zoomIn(): void;
    /**
     * Zoom out the schema designer
     */
    zoomOut(): void;
    /**
     * Zoom to fit the schema designer
     */
    zoomToFit(): void;
    /**
     * Adds a drag and drop listener for the table
     * @param element The element to make draggable
     */
    addTableDragAndDropListener(element: HTMLElement): void;
    /**
     * Redraws the edges in the schema designer
     */
    private redrawEdges;
    get activeCellState(): mxCellState;
    /**
     * Sets the current cell under edit
     */
    set activeCellState(value: mxCellState);
    /**
     * Renders the schema in the schema designer
     * @param schema The schema to render
     * @param cleanUndoManager Whether to clean the undo manager so that the user can't undo the rendering
     */
    renderSchema(schema: ISchema, cleanUndoManager?: boolean): void;
    /**
     * Renders an entity in the schema designer
     * @param entity The entity to render
     * @param x the x position to render the entity at
     * @param y the y position to render the entity at
     * @returns The cell that was rendered
     */
    renderTable(entity: ITable, x: number, y: number): mxCell;
    /**
     * Renders a relationship in the schema designer
     * @param relationship The relationship to render
     * @returns The edge that was rendered
     */
    renderForeignKey(foreignKey: IForeignKey, sourceTable: ITable): void;
    /**
     * Gets the current schema from the schema designer
     */
    get schema(): ISchema;
    /**
     * Automatically arranges the cells in the schema designer
     */
    autoLayout(): void;
    /**
     * Registers a listener for cell clicks
     * @param listener The listener to register
     */
    addCellClickListener(listener: (cell: mxCell) => void): void;
    /**
     * Scrolls to a cell in the schema designer
     * @param cell The cell to scroll to
     */
    scrollToCell(cell: mxCell): void;
    /**
     * Updates the position of the editor in the schema designer. This is called
     * when the graph scales or when the graph is moved
     */
    updateEditorPosition(): void;
    /**
     * Gets the relationships of an entity
     * @param entityCellState The cell state of the entity
     * @returns The relationships of the entity
     */
    getTableRelationships(entityCellState: mxCellState): {
        outgoing: mxCell[];
        incoming: mxCell[];
    };
    addNewTable(): void;
    /**
     * Creates a new entity
     * @returns The new entity
     */
    private createTable;
    /**
     * Updates the active cell state entity
     * @param editedTable describes the new entity
     * @param editedOutgoingEdges describes the new relationships
     * @returns void
     */
    updateActiveCellStateTable(editedTable: ITable): void;
    getForeignKeysForTable(tableCell: mxCell): IForeignKey[];
    makeElementDraggable(element: HTMLElement, onDragEndCallback?: (graph: mxGraph, evt: MouseEvent, cell: mxCellState) => void): void;
    exportImage(format: string): Promise<{
        fileContent: string;
        format: string;
        width: number;
        height: number;
    }>;
}
