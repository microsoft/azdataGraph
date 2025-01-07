/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA.See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------*/

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