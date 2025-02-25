import { mxCell, mxGraph } from "mxgraph";
import { mxGraphFactory as mx } from '../mx';
export declare class SchemaDesignerLayout extends mx.mxGraphLayout {
    constructor(graph: mxGraph);
    execute(parent: mxCell): void;
}
