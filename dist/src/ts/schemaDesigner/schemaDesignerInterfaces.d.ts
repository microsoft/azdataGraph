import { mxCell } from "mxgraph";
import { mxGraphFactory as mx } from '../mx';
/**
 * Represents a schema model
 * This is the schema model that is used to create the schema designer
 */
export interface Schema {
    /**
     * Tables in the schema
     */
    tables: Table[];
}
export interface Table {
    /**
     * Id of the table
     */
    id: string;
    /**
     * Name of the table
     */
    name: string;
    /**
     * Schema of the table
     */
    schema: string;
    /**
     * Columns of the table
     */
    columns: Column[];
    /**
     * Foreign keys of the table
     */
    foreignKeys: ForeignKey[];
}
export interface Column {
    /**
     * Id of the column
     */
    id: string;
    /**
     * Name of the column
     */
    name: string;
    /**
     * Data type of the column
     */
    dataType: string;
    /**
     * Max length of the column
     */
    maxLength: number;
    /**
     * Precision of the column
     */
    precision: number;
    /**
     * Scale of the column
     */
    scale: number;
    /**
     * Is the column primary key
     */
    isPrimaryKey: boolean;
    /**
     * Is the column identity
     */
    isIdentity: boolean;
    /**
     * Is the column nullable
     */
    isNullable: boolean;
    /**
     * Unique constraint of the column
     */
    isUnique: boolean;
    /**
     * Collation of the column
     */
    collation: string;
}
export interface ForeignKey {
    /**
     * Id of the foreign key
     */
    id: string;
    /**
     * Name of the foreign key
     */
    name: string;
    /**
     * Parent columns of the relationship
     */
    columns: string[];
    /**
     * Referenced schema of the relationship
     */
    referencedSchemaName: string;
    /**
     * Referenced table of the relationship
     */
    referencedTableName: string;
    /**
     * Referenced columns of the relationship
     */
    referencedColumns: string[];
    /**
     * On delete action of the relationship
     */
    onDeleteAction: OnAction;
    /**
     * On update action of the relationship
     */
    onUpdateAction: OnAction;
}
export declare enum OnAction {
    CASCADE = "0",
    NO_ACTION = "1",
    SET_NULL = "2",
    SET_DEFAULT = "3"
}
export interface SchemaDesignerConfig {
    /**
     * Icons for the schema designer
     */
    icons: {
        addTableIcon: string;
        undoIcon: string;
        redoIcon: string;
        zoomInIcon: string;
        zoomOutIcon: string;
        zoomFitIcon: string;
        deleteIcon: string;
        entityIcon: string;
        connectorIcon: string;
        exportIcon: string;
        autoArrangeCellsIcon: string;
        editIcon: string;
        cancelIcon: string;
        primaryKeyIcon: string;
        foreignKeyIcon: string;
    };
    /**
     * Colors for the schema designer
     */
    colors: SchemaDesignerColors;
    /**
     * Font family for the graph
     */
    graphFontFamily: string;
    /**
     * If the schema designer is editable
     */
    isEditable: boolean;
    /**
     * Callback to show the editor to edit the entity
     * @param cell cell to edit
     * @param x x coordinate of the editor
     * @param y y coordinate of the editor
     * @param scale scale of the graph
     */
    editTable: (table: Table, cell: mxCell, x: number, y: number, scale: number, model: Schema) => void;
    /**
     * Update the position of the editor based on changed in the graph
     * @param x x coordinate of the editor
     * @param y y coordinate of the editor
     * @param scale scale of the graph
     */
    updateEditorPosition: (x: number, y: number, scale: number) => void;
    /**
     * Callback to publish the schema
     * @param model schema model
     */
    publish: (model: Schema) => void;
    /**
     * If the toolbar should be shown
     */
    showToolbar: boolean;
    /**
     * Validate foreign key
     */
    isForeignKeyValid: (source: mxCell, target: mxCell, sourceColumn: number, targetColumn: number) => boolean;
}
/**
 * Interface for edge cells in schema designer
 */
export interface EdgeCellValue extends ForeignKey {
    /**
     * Source row of the edge
     */
    sourceRow: number;
    /**
     * Target row of the edge
     */
    targetRow: number;
    /**
     * Source cell of the edge
     */
    isVisible: boolean;
}
export declare class extendedConnectionHandler extends mx.mxConnectionHandler {
    currentRow?: number;
    sourceRowNode: HTMLElement;
    currentRowNode: HTMLElement;
    updateRow: (targetNode: HTMLElement) => HTMLElement | null;
}
export interface SchemaDesignerColors {
    /**
     * Defines the color to be used for the cell highlight
     */
    cellHighlight: string;
    /**
     * Defines the color to be used for the cell foreground
     */
    cellForeground: string;
    /**
     * Defines the color to be used for the cell background
     */
    cellBackground: string;
    /**
     * Defines the color to be used for the cell border
     */
    cellBorder: string;
    /**
     * Defines the color to be used for the cell column when the mouse is over it
     */
    cellColumnHover: string;
    /**
     * Defines the color to be used for dividers in cell html
     */
    cellDivider: string;
    /**
     * Defines the color to be used for the toolbar background
     */
    toolbarBackground: string;
    /**
     * Defines the color to be used for the toolbar buttons icons
     */
    toolbarForeground: string;
    /**
     * Defines the color to be used for the toolbar buttons when the mouse is over them
     */
    toolbarHoverBackground: string;
    /**
     * Defines the color to be used for the toolbar divider
     */
    toolbarDividerBackground: string;
    /**
     * Defines the color to be used for the graph background
     */
    graphBackground: string;
    /**
     * Defines the color to be used for the graph grid dots
     */
    graphGrid: string;
    /**
     * Defines the color to be used for edges (relationships)
     */
    edge: string;
    /**
     * Defines the color to be used for the outline sizer fill color
     */
    outlineHandleFill: string;
    /**
     * Defines the color to be used for the outline rectangle border
     */
    outline: string;
    /**
     * Specifies the color of the preview shape when the cell is moved
     */
    graphHandlePreview: string;
}
