/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA.See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------*/

import { mxCellState } from "mxgraph";

/**
 * This function should return the vertical center of the column in an entity
 * @param state cell containing the entity of the column.
 * @param column column element.
 * @returns the vertical center of the column.
 */
export function getRowY(state: mxCellState, column: HTMLElement): number {
    const s = state.view.scale;
    if (!column) {
        return state.y;
    }
    const div = column.parentNode as HTMLElement;
    let y = state.y + (column.offsetTop - div.scrollTop + column.offsetHeight / 2) * s; // 5 is the magic number to make the line completely centered to the row.
    if (div.scrollTop > column.offsetTop) { // If the column is above the visible area of the entity container div then we should use the top of the column container.
        y = state.y + (div.offsetTop - 15) * s;
    }
    if (y > state.y + div.offsetTop * s + div.clientHeight * s) { // If the column is below the visible area of the entity container div then we should use the bottom of the column container.
        y = state.y + (div.offsetTop + div.clientHeight - 5) * s;
    }
    return y;
}