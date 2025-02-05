import './schemaDesigner.css';
import '../../css/common.css';
import { IRelationship, ISchema, SchemaDesignerConfig } from './schemaDesignerInterfaces';
import { mxCell, mxCellState, mxGraph } from 'mxgraph';
export declare class SchemaDesigner {
    private _container;
    private _config;
    private _editor;
    _graph: mxGraph;
    private _model;
    private _toolbar;
    private _layout;
    private _currentCellUnderEdit;
    private cellClickListeners;
    constructor(_container: HTMLElement, _config: SchemaDesignerConfig);
    private initializeGraph;
    private setupColors;
    private overwriteMxGraphDefaults;
    private addCustomEdgeTerminals;
    private setupEditorOptions;
    private setupGraphOptions;
    set currentCellUnderEdit(value: mxCellState);
    private setupGraphOutlineOptions;
    private setupToolbar;
    private redrawEdges;
    renderModel(schema: ISchema, cleanUndoManager?: boolean): void;
    private renderEntity;
    renderRelationship(relationship: IRelationship): void;
    get schema(): ISchema;
    autoArrange(): void;
    addCellClickListener(listener: (cell: mxCell) => void): void;
    scrollToCell(cell: mxCell): void;
    updateEditorLocation(): void;
    getRelationships(stateCell: mxCellState): {
        outgoing: mxCell[];
        incoming: mxCell[];
    };
}
