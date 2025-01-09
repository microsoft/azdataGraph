import { mxCell, mxGraph } from "mxgraph";
import { mxGraphFactory as mx } from '../mx';
export declare class SchemaDesignerLayout extends mx.mxHierarchicalLayout {
    constructor(graph: mxGraph);
    execute(parent: mxCell): void;
}
