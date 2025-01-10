import { mxCell, mxGraph } from "mxgraph";
import { mxGraphFactory as mx } from '../mx';

export class SchemaDesignerLayout extends mx.mxHierarchicalLayout {
    constructor(graph: mxGraph) {
        super(graph, mx.mxConstants.DIRECTION_EAST, true);
    }

    public override execute(_parent: mxCell): void {
        //super.execute(parent);

        let cells = this.graph.getModel().getChildCells(this.graph.getDefaultParent());
        cells = cells.filter(cell => !cell.edge);
        const cellSet = new Set(cells.map(cell => cell.id));

        this.graph.getModel().beginUpdate();
        // Find all subgraphs
        const subGraphs: mxCell[][] = [];
        for (const cell of cells) {
            if (cellSet.has(cell.id)) {
                const subGraph: mxCell[] = [];
                const queue: mxCell[] = [cell];
                cellSet.delete(cell.id);
                while (queue.length > 0) {
                    const current = queue.shift() as mxCell;
                    cellSet.delete(current.id);
                    subGraph.push(current);
                    const edges = this.graph.getModel().getEdges(current);
                    for (const edge of edges) {
                        let nextNode: mxCell | undefined = undefined;
                        if (edge.source.id === current.id) {
                            nextNode = edge.target;
                        } else if (edge.target.id === current.id) {
                            nextNode = edge.source;
                        }
                        if (nextNode) {
                            if (cellSet.has(nextNode.id)) {
                                queue.push(nextNode);
                                cellSet.delete(nextNode.id);
                            }
                        }
                    }
                }
                subGraphs.push(subGraph);
            }
        }

        let offsetX = 200;
        const offsetY = 200;
        const SPACING_BETWEEN_SUBGRAPHS = 100;

        for (const subGraph of subGraphs) {
            // const { maxX } = this.layoutSubGraph(subGraph, offsetX, offsetY);
            const { maxX } = this.layoutSubGraph(subGraph, offsetX, offsetY);
            offsetX = maxX + SPACING_BETWEEN_SUBGRAPHS;
            //offsetY = Math.max(offsetY, height);
        }

        for (const subGraph of subGraphs) {
            for (const cell of subGraph) {
                let inDegree = 0;
                let outDegree = 0;
                const edges = this.graph.getModel().getEdges(cell);
                for (const edge of edges) {
                    if(edge.source.id === edge.target.id) {
                        console.log('Self loop');
                        continue;
                    }
                    if (edge.source.id === cell.id) {
                        outDegree++;
                    } else if (edge.target.id === cell.id) {
                        inDegree++;
                    }
                }
                console.log(`cell: ${cell.value.name}, inDegree: ${inDegree}, outDegree: ${outDegree}`);
            }
            console.log('---');
        }

        // this.graph.refresh();

        this.graph.getModel().endUpdate();
    }


    public layoutSubGraph(cells: mxCell[], offsetX: number, offsetY: number) {
        const SPACING_X = 100;
        const SPACING_Y = 100;

        let currentX = offsetX;
        let currentY = offsetY;

        let rowHeight = 0;

        for (let i = 0; i < cells.length; i++) {
            const node = cells[i];
            node.geometry.x = currentX;
            node.geometry.y = currentY;

            rowHeight = Math.max(rowHeight, node.geometry.height);

            currentX += node.geometry.width + SPACING_X;

            // Check if we need to start a new row
            if (i < cells.length - 1 && currentX + cells[i + 1].geometry.width > offsetX + 3000) {
                currentX = offsetX;
                currentY += rowHeight + SPACING_Y;
                rowHeight = 0;
            }
        }

        let maxX = -1;
        for (const cell of cells) {
            maxX = Math.max(maxX, cell.geometry.x + cell.geometry.width);
        }

        return {
            maxX: maxX,
        }
    }
}