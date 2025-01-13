"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaDesignerLayout = void 0;
const mx_1 = require("../mx");
class SchemaDesignerLayout extends mx_1.mxGraphFactory.mxHierarchicalLayout {
    constructor(graph) {
        super(graph, mx_1.mxGraphFactory.mxConstants.DIRECTION_EAST, true);
    }
    execute(parent) {
        this.interHierarchySpacing = 100;
        this.orientation = mx_1.mxGraphFactory.mxConstants.DIRECTION_WEST;
        super.execute(parent);
        // let cells = this.graph.getModel().getChildCells(this.graph.getDefaultParent());
        // cells = cells.filter(cell => !cell.edge);
        // const cellSet = new Set(cells.map(cell => cell.id));
        // this.graph.getModel().beginUpdate();
        // // Find all subgraphs
        // const subGraphs: mxCell[][] = [];
        // for (const cell of cells) {
        //     if (cellSet.has(cell.id)) {
        //         const subGraph: mxCell[] = [];
        //         const queue: mxCell[] = [cell];
        //         cellSet.delete(cell.id);
        //         while (queue.length > 0) {
        //             const current = queue.shift() as mxCell;
        //             cellSet.delete(current.id);
        //             subGraph.push(current);
        //             const edges = this.graph.getModel().getEdges(current);
        //             for (const edge of edges) {
        //                 let nextNode: mxCell | undefined = undefined;
        //                 if (edge.source.id === current.id) {
        //                     nextNode = edge.target;
        //                 } else if (edge.target.id === current.id) {
        //                     nextNode = edge.source;
        //                 }
        //                 if (nextNode !== undefined) {
        //                     if (cellSet.has(nextNode!.id)) {
        //                         queue.push(nextNode!);
        //                         cellSet.delete(nextNode!.id);
        //                     }
        //                 }
        //             }
        //         }
        //         subGraphs.push(subGraph);
        //     }
        // }
        // const boundingBoxes = subGraphs.map(subGraph => {
        //     let minX = Number.MAX_VALUE;
        //     let minY = Number.MAX_VALUE;
        //     let maxX = Number.MIN_VALUE;
        //     let maxY = Number.MIN_VALUE;
        //     for (const cell of subGraph) {
        //         const geo = cell.getGeometry();
        //         if (geo) {
        //             minX = Math.min(minX, geo.x);
        //             minY = Math.min(minY, geo.y);
        //             maxX = Math.max(maxX, geo.x + geo.width);
        //             maxY = Math.max(maxY, geo.y + geo.height);
        //         }
        //     }
        //     return { minX, minY, maxX, maxY };
        // });
        // console.log(boundingBoxes);
        // this.graph.getModel().endUpdate();
    }
}
exports.SchemaDesignerLayout = SchemaDesignerLayout;
