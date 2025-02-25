"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaDesignerLayout = void 0;
const mx_1 = require("../mx");
const dagre_1 = __importDefault(require("@dagrejs/dagre"));
class SchemaDesignerLayout extends mx_1.mxGraphFactory.mxGraphLayout {
    constructor(graph) {
        super(graph);
        this.isEdgeIgnored = (_edge) => {
            console.log('edge ignored', _edge.value);
            return true;
        };
    }
    execute(parent) {
        const selectedCell = this.graph.getSelectionCell();
        this.graph.getModel().beginUpdate();
        const g = new dagre_1.default.graphlib.Graph({
            directed: true,
            multigraph: true,
        }).setDefaultEdgeLabel(() => ({}));
        g.setGraph({
            rankdir: 'LR',
            nodesep: 10,
        });
        const dagCells = this.graph.getModel().getChildCells(parent);
        for (let i = 0; i < dagCells.length; i++) {
            const currentCell = dagCells[i];
            if (!currentCell.edge) {
                g.setNode(currentCell.id, {
                    label: currentCell.id,
                    width: currentCell.geometry.width + 50, //padding
                    height: currentCell.geometry.height + 50, //padding
                });
            }
        }
        for (let i = 0; i < dagCells.length; i++) {
            const currentCell = dagCells[i];
            if (currentCell.edge) {
                g.setEdge(currentCell.source.id, currentCell.target.id, {}, currentCell.id);
            }
        }
        dagre_1.default.layout(g);
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
exports.SchemaDesignerLayout = SchemaDesignerLayout;
