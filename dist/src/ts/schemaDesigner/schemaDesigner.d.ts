import './schemaDesigner.css';
import '../../css/common.css';
import { ISchema, SchemaDesignerConfig } from './schemaDesignerInterfaces';
import { mxCell, mxGraph } from 'mxgraph';
import { mxGraphFactory as mx } from '../mx';
export declare class SchemaDesigner {
    private _container;
    private _config;
    private _editor;
    _graph: mxGraph;
    private _model;
    private _toolbar;
    private _layout;
    private cellClickListeners;
    constructor(_container: HTMLElement, _config: SchemaDesignerConfig);
    private initializeGraph;
    private overwriteMxGraphDefaults;
    private setupEditorOptions;
    private setupGraphOptions;
    private setupGraphOutlineOptions;
    private setupToolbar;
    private redrawEdges;
    renderModel(schema: ISchema, cleanUndoManager?: boolean): void;
    private renderEntity;
    private renderRelationship;
    get schema(): ISchema;
    autoArrange(): void;
    private mostNegativeX;
    private mostNegativeY;
    addCellClickListener(listener: (cell: mxCell) => void): void;
}
export interface EdgeCellValue {
    sourceRow: number;
    targetRow: number;
}
export declare class extendedConnectionHandler extends mx.mxConnectionHandler {
    currentRow?: number;
    sourceRowNode: HTMLElement;
    currentRowNode: HTMLElement;
    updateRow: (targetNode: HTMLElement) => HTMLElement | null;
}
