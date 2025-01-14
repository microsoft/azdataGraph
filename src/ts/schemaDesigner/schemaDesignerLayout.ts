import { mxCell, mxGraph } from "mxgraph";
import { mxGraphFactory as mx } from '../mx';

export class SchemaDesignerLayout extends mx.mxHierarchicalLayout {
    constructor(graph: mxGraph) {
        super(graph, mx.mxConstants.DIRECTION_EAST, true);
    }

    public override execute(parent: mxCell): void {

        this.graph.getModel().beginUpdate();
        this.interHierarchySpacing = 100;
        this.orientation = mx.mxConstants.DIRECTION_WEST;

        super.execute(parent);

        // Move all cells to the right by 100px
        let cells = this.graph.getModel().getChildCells(this.graph.getDefaultParent());
        this.graph.moveCells(cells, 100, 0, false);

        cells = cells.filter(cell => !cell.edge);
        const cellSet = new Set(cells.map(cell => cell.id));

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
                        if (nextNode !== undefined) {
                            if (cellSet.has(nextNode!.id)) {
                                queue.push(nextNode!);
                                cellSet.delete(nextNode!.id);
                            }
                        }
                    }
                }
                subGraphs.push(subGraph);
            }
        }

        // Arranging all standalone cells in a grid layout. The grid row width is determined by the width of the biggest subgraph.

        const boundingBoxes = subGraphs.map(subGraph => {
            let minX = Number.MAX_VALUE;
            let minY = Number.MAX_VALUE;
            let maxX = Number.MIN_VALUE;
            let maxY = Number.MIN_VALUE;
            for (const cell of subGraph) {
                const geo = cell.getGeometry();
                if (geo) {
                    minX = Math.min(minX, geo.x);
                    minY = Math.min(minY, geo.y);
                    maxX = Math.max(maxX, geo.x + geo.width);
                    maxY = Math.max(maxY, geo.y + geo.height);
                }
            }
            return { minX, minY, maxX, maxY };
        });

        const maxX = Math.max(...boundingBoxes.map(box => box.maxX));

        const standaloneCells: mxCell[] = [];

        for (const subGraph of subGraphs) {
            if (subGraph.length === 1) {
                standaloneCells.push(...subGraph);
            }
        }
        console.log(standaloneCells);

        const startX = Math.min(...standaloneCells.map(cell => cell.geometry.x));
        const startY = Math.min(...standaloneCells.map(cell => cell.geometry.y));

        const intercellSpacing = 100;

        console.log(startX, startY, maxX);

        let currentX = startX;
        let currentY = startY;
        let currentRowMaxHeight = 0;
        for (let i = 0; i < standaloneCells.length; i++) {
            if(currentX + intercellSpacing > maxX) {
                currentX = startX;
                currentY = currentY + currentRowMaxHeight + intercellSpacing;
                currentRowMaxHeight = 0;
            }
            const cell = standaloneCells[i];
            cell.geometry.x = currentX;
            cell.geometry.y = currentY;

            currentX = currentX + cell.geometry.width + intercellSpacing;
            currentRowMaxHeight = Math.max(currentRowMaxHeight, cell.geometry.height);
        }

        this.graph.getModel().endUpdate();
    }
}