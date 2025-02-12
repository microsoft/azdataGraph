import { mxCellState, mxGraph, mxGraphModel } from "mxgraph";
import { IColumn, IEntity, SchemaDesignerConfig } from "./schemaDesignerInterfaces";
import { SchemaDesigner } from "./schemaDesigner";
export declare class SchemaDesignerEntity implements IEntity {
    private _config;
    private _graph;
    private _schemaDesigner;
    name: string;
    schema: string;
    columns: IColumn[];
    editor: boolean;
    parentDiv: HTMLElement;
    private listeners;
    constructor(entity: IEntity, _config: SchemaDesignerConfig, _graph: mxGraph, _schemaDesigner: SchemaDesigner);
    render(): HTMLElement;
    setupValueAndListeners(parentNode: HTMLElement, state: mxCellState): void;
    addListeners(div: HTMLElement, type: string, callback: (event: Event) => void): void;
    removeListeners(): void;
    get model(): mxGraphModel;
    get graph(): mxGraph;
    private renderTable;
    /**
     * Checks if the columns has a foreign key dependency
     * @param index index of the column
     * @returns true if the column has a foreign key dependency
     */
    private isForeignKey;
    /**
     * Gets the column title for the tooltip
     * @param index index of the column
     * @returns column title
     */
    private getColumnTitle;
    getWidth(): number;
    getHeight(): number;
}
