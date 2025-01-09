"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaDesignerLayout = void 0;
const mx_1 = require("../mx");
class SchemaDesignerLayout extends mx_1.mxGraphFactory.mxHierarchicalLayout {
    constructor(graph) {
        super(graph, mx_1.mxGraphFactory.mxConstants.DIRECTION_EAST, true);
    }
    execute(parent) {
        super.execute(parent);
    }
}
exports.SchemaDesignerLayout = SchemaDesignerLayout;
