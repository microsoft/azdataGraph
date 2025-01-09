import { mxGraph } from "mxgraph";
import { IColumn, IEntity, SchemaDesignerConfig } from "./schemaDesignerInterfaces";
export declare class SchemaDesignerEntity implements IEntity {
    private _config;
    private _graph;
    div: HTMLElement;
    name: string;
    schema: string;
    columns: IColumn[];
    constructor(entity: IEntity, _config: SchemaDesignerConfig, _graph: mxGraph);
    render(): HTMLElement;
    private getConstraintText;
}
