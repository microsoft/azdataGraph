import { mxCellState, mxGraph, mxGraphModel } from "mxgraph";
import { Column, ForeignKey, SchemaDesignerConfig, Table } from "./schemaDesignerInterfaces";
import { SchemaDesigner } from "./schemaDesigner";
export declare class SchemaDesignerTable implements Table {
    private schemaDesigner;
    private eventListeners;
    /**
     * The id of the table
     */
    id: string;
    /**
     * The name of the table
     */
    name: string;
    /**
     * The schema of the table
     */
    schema: string;
    /**
     * The columns of the table
     */
    columns: Column[];
    /**
     * Indicates if the table is being edited
     */
    editor: boolean;
    /**
     * The parent div of the table
     */
    parentDiv: HTMLElement;
    /**
     * The foreign keys of the table
     */
    foreignKeys: ForeignKey[];
    /**
     * Opacity of the table
     * @default 1
     */
    opacity: number;
    /**
     * Indicates if the table is visible
     */
    isVisible: boolean;
    /**
     * Creates a new instance of the SchemaDesignerEntity class
     * @param entity entity to be rendered
     * @param config schema designer configuration
     * @param mxGraph mxGraph instance
     * @param schemaDesigner schema designer instance
     */
    constructor(entity: Table, schemaDesigner: SchemaDesigner);
    /**
     * Renders the entity
     * @returns the rendered entity
     */
    render(): HTMLElement;
    /**
     * Sets up the entity DOM
     * @param parentNode node to be set up
     * @param state state of the node
     */
    setupEntityDOM(parentNode: HTMLElement, state: mxCellState): void;
    /**
     * Edits the table
     * @param state state of the entity
     */
    editTable(state: mxCellState): Promise<void>;
    /**
     * Adds event listeners to the entity
     */
    addEventListeners(div: HTMLElement, type: string, callback: (event: Event) => void): void;
    /**
     * Removes event listeners from the entity
     */
    removeEventListeners(): void;
    /**
     * Gets the mxGraph model
     */
    get mxModel(): mxGraphModel;
    /**
     * Gets the mxGraph instance
     */
    get mxGraph(): mxGraph;
    /**
     * Gets the schema designer configuration
     */
    get schemaDesignerConfig(): SchemaDesignerConfig;
    /**
     * Renders the table div
     * @returns the table div
     */
    private renderTableDiv;
    /**
     * Checks if the columns has a foreign key dependency
     * @param index index of the column
     * @returns true if the column has a foreign key dependency
     */
    private hasForeignKey;
    /**
     * Gets the column title for the tooltip
     * @param index index of the column
     * @returns column title
     */
    private getColumnTooltip;
    get width(): number;
    get height(): number;
}
