import { mxCell, mxGraph } from "mxgraph";
import { mxGraphFactory as mx } from '../mx';
import dagre from '@dagrejs/dagre';
import { SchemaDesignerTable } from "./schemaDesignerEntity";

export class SchemaDesignerLayout extends mx.mxGraphLayout {
    constructor(graph: mxGraph) {

        super(graph);
        this.isEdgeIgnored = (_edge: mxCell) => {
            console.log('edge ignored', _edge.value);
            return true;
        };
    }

    public override execute(parent: mxCell): void {
        const selectedCell = this.graph.getSelectionCell();
        this.graph.getModel().beginUpdate();
        const g = new dagre.graphlib.Graph({
            directed: true,
            multigraph: true,
        }).setDefaultEdgeLabel(() => ({}));
        g.setGraph({
            rankdir: 'LR',
            align: 'UL',
            ranksep: 50,
        });

        const dagCells = this.graph.getModel().getChildCells(parent);

        for (let i = 0; i < dagCells.length; i++) {
            const currentCell = dagCells[i];
            if (!currentCell.edge) {
                const value = currentCell.value as SchemaDesignerTable;
                g.setNode(
                    currentCell.id,
                    {
                        label: currentCell.id,
                        width: value.width + 50,
                        height: value.height + 50,
                    }
                )
            }
        }

        for (let i = 0; i < dagCells.length; i++) {
            const currentCell = dagCells[i];
            if (currentCell.edge) {
                g.setEdge(currentCell.source.id, currentCell.target.id, {

                }, currentCell.id);
            }
        }

        dagre.layout(g);

        for (let i = 0; i < dagCells.length; i++) {
            const currentCell = dagCells[i];
            if (!currentCell.edge) {
                const computedNode = g.node(currentCell.id);
                currentCell.geometry.x = computedNode.x;
                currentCell.geometry.y = computedNode.y;
            }
        }

        this.graph.refresh();

        if (selectedCell) {
            this.graph.setSelectionCell(selectedCell);
            this.graph.scrollCellToVisible(selectedCell);
        }

        this.graph.getModel().endUpdate();
    }
}