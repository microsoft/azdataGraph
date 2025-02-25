import { mxCell, mxGraph } from "mxgraph";
import { mxGraphFactory as mx } from '../mx';
import dagre from '@dagrejs/dagre';

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
        const g = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
        g.setGraph({ 
            rankdir: 'LR',
         });

        const dagCells = this.graph.getModel().getChildCells(parent);

        for (let i = 0; i < dagCells.length; i++){
            const currentCell = dagCells[i];
            if(!currentCell.edge){
                g.setNode(
                    currentCell.id,
                    {
                        label: currentCell.id,
                        width: currentCell.geometry.width,
                        height: currentCell.geometry.height + 30, //padding
                    }
                )
            }
        }

        for (let i = 0; i < dagCells.length; i++){
            const currentCell = dagCells[i];
            if(currentCell.edge){
                g.setEdge(currentCell.source.id, currentCell.target.id)
            }
        }

        dagre.layout(g);

        for (let i = 0; i < dagCells.length; i++){
            const currentCell = dagCells[i];
            if(!currentCell.edge){
                const computedNode = g.node(currentCell.id);
                currentCell.geometry.x = computedNode.x;
                currentCell.geometry.y = computedNode.y;
            }
        }

        this.graph.refresh();
        if(selectedCell){
            this.graph.setSelectionCell(selectedCell);
            this.graph.scrollCellToVisible(selectedCell);
        }
        this.graph.getModel().endUpdate();
    }
}