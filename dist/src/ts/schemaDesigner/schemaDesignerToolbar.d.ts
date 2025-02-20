import { mxCellState, mxGraph } from "mxgraph";
import { SchemaDesignerConfig } from "./schemaDesignerInterfaces";
export declare class SchemaDesignerToolbar {
    private _container;
    private _graph;
    private _config;
    private _toolbarDiv;
    buttons: Map<string, HTMLElement>;
    constructor(_container: HTMLElement, _graph: mxGraph, _config: SchemaDesignerConfig);
    addButton(icon: string, title: string, callback: () => void, onDragEndCallback?: (graph: mxGraph, evt: MouseEvent, cell: mxCellState) => void): void;
    disableButton(title: string): void;
    enableButton(title: string): void;
    isButtonDisabled(title: string): boolean | undefined;
    addDivider(): void;
}
