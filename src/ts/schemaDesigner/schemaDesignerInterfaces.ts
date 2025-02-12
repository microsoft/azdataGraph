import { mxCell } from "mxgraph";
import { mxGraphFactory as mx } from '../mx';

export interface ISchema {
    entities: IEntity[];
    relationships: IRelationship[];
}


export interface IEntity {
    /**
     * Name of the entity
     */
    name: string;
    /**
     * Schema of the entity
     */
    schema: string;
    /**
     * Columns of the entity
     */
    columns: IColumn[];
}

export interface IColumn {
    /**
     * Name of the column
     */
    name: string;
    /**
     * Data type of the column
     */
    dataType: string;
    /**
     * Is the column primary key
     */
    isPrimaryKey: boolean;
    /**
     * Is the column identity
     */
    isIdentity: boolean;
}

export interface IRelationship {
    /**
     * Name of the relationship
     */
    foreignKeyName: string;
    /**
     * Schema of the relationship
     */
    schemaName: string;
    /**
     * Parent entity of the relationship
     */
    entity: string;
    /**
     * Parent column of the relationship
     */
    column: string;
    /**
     * Referenced schema of the relationship
     */
    referencedSchema: string;
    /**
     * Referenced entity of the relationship
     */
    referencedEntity: string;
    /**
     * Referenced column of the relationship
     */
    referencedColumn: string;
    /**
     * On delete action of the relationship
     */
    onDeleteAction: OnAction;
    /**
     * On update action of the relationship
     */
    onUpdateAction: OnAction;
}

export enum OnAction {
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
    }
    /**
     * Colors for the schema designer
     */
    colors: {
        /**
         * Cell highlight color
         */
        cellHighlight: string;
        cellForeground: string;
        cellBackground: string;
        cellBorder: string;
        cellColumnHover: string;
        cellDivider: string;
        /**
         * Toolbar colors
         */
        toolbarBackground: string;
        toolbarForeground: string;
        toolbarHoverBackground: string;
        toolbarDividerBackground: string;
        /**
         * Graph background colors
         */
        graphBackground: string;
        graphGrid: string;
        /**
         * Edge colors
         */
        edge: string;
        /**
         * Background color for the outline
         */
        outlineCellBackground: string;
        /**
         * Border color for the outline
         */
        outlineBorder: string;
        /**
         * Size of the outline
         */
        outlineSize: string;
        /**
         * Rectangle color for the outline
         */
        outlineSizerRectangle: string;
    }
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
    editEntity: (cell: mxCell, x: number, y: number, scale: number, incomingEdges: mxCell[], outgoingEdges: mxCell[], model: ISchema) => void
    /**
     * Callback to show the editor to edit the relationship
     * @param cell cell to edit
     * @param x x coordinate of the editor
     * @param y y coordinate of the editor
     * @param scale scale of the graph
     * @returns relationship edited
     */
    editRelationship: (cell: mxCell, x: number, y: number, scale: number) => IRelationship;
    /**
     * Update the position of the editor based on changed in the graph
     * @param x x coordinate of the editor
     * @param y y coordinate of the editor
     * @param scale scale of the graph
     */
    updateEditorPosition: (x: number, y: number, scale: number) => void;
}

/**
 * Interface for edge cells in schema designer
 */
export interface EdgeCellValue extends IRelationship {
    /**
     * Source row of the edge
     */
    sourceRow: number;
    /**
     * Target row of the edge
     */
    targetRow: number;
}

export class extendedConnectionHandler extends mx.mxConnectionHandler {
    public currentRow?: number = 0;
    public sourceRowNode!: HTMLElement;
    public currentRowNode!: HTMLElement;
    public updateRow!: (targetNode: HTMLElement) => HTMLElement | null;
}