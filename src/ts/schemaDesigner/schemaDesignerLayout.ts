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
            marginx: 50,
            marginy: 50,
            nodesep: 50,
            ranksep: 50,
        });

        const dagCells = this.graph.getModel().getChildCells(parent);

        for (let i = 0; i < dagCells.length; i++) {
            const currentCell = dagCells[i];
            if (!currentCell.edge) {
                const value = currentCell.value as SchemaDesignerTable;
                if (!value.isVisible) {
                    continue;
                }
                g.setNode(
                    currentCell.id,
                    {
                        label: currentCell.id,
                        width: value.width + 20,
                        height: value.height,
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
                if (!currentCell.value.isVisible) {
                    continue;
                }
                const computedNode = g.node(currentCell.id);
                currentCell.geometry.x = computedNode.x - (currentCell.value.width + 20) / 2;
                currentCell.geometry.y = computedNode.y - (currentCell.value.height) / 2;
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