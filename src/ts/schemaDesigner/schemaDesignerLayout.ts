import { mxCell, mxGraph } from "mxgraph";
import { mxGraphFactory as mx } from '../mx';

export class SchemaDesignerLayout extends mx.mxHierarchicalLayout {
    constructor(graph: mxGraph) {
        super(graph, mx.mxConstants.DIRECTION_EAST, true);
    }

    public override execute(parent: mxCell): void {
        super.execute(parent);
    }
}