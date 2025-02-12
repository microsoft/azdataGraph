import { mxCellState, mxGraph, mxGraphModel } from "mxgraph";
import { IColumn, IEntity, SchemaDesignerConfig } from "./schemaDesignerInterfaces";
import { SchemaDesigner } from "./schemaDesigner";
export declare class SchemaDesignerEntity implements IEntity {
    private schemaDesigner;
    private eventListeners;
    /**
     * The name of the entity
     */
    name: string;
    /**
     * The schema of the entity
     */
    schema: string;
    /**
     * The columns of the entity
     */
    columns: IColumn[];
    /**
     * Indicates if the entity is being edited
     */
    editor: boolean;
    /**
     * The parent div of the entity
     */
    parentDiv: HTMLElement;
    /**
     * Creates a new instance of the SchemaDesignerEntity class
     * @param entity entity to be rendered
     * @param config schema designer configuration
     * @param mxGraph mxGraph instance
     * @param schemaDesigner schema designer instance
     */
    constructor(entity: IEntity, schemaDesigner: SchemaDesigner);
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
     * Edits the entity
     * @param state state of the entity
     */
    editEntity(state: mxCellState): Promise<void>;
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
