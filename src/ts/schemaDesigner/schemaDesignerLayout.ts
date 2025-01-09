import { mxCell, mxGraph, mxGraphLayout } from "mxgraph";

export class SchemaDesignerLayout extends mxGraphLayout {
    constructor(graph: mxGraph) {
        super(graph);
    }

    public override execute(parent: mxCell): void {
        const childCells = this.graph.getChildCells(parent);
        console.log(childCells);
    }
}