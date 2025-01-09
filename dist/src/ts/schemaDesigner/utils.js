"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRowY = getRowY;
/**
 * This function should return the vertical center of the column in an entity
 * @param state cell containing the entity of the column.
 * @param column column element.
 * @returns the vertical center of the column.
 */
function getRowY(state, column) {
    const s = state.view.scale;
    if (!column) {
        return state.y;
    }
    const div = column.parentNode;
    let y = state.y + (column.offsetTop - div.scrollTop + column.offsetHeight / 2) * s; // 5 is the magic number to make the line completely centered to the row.
    if (div.scrollTop > column.offsetTop) { // If the column is above the visible area of the entity container div then we should use the top of the column container.
        y = state.y + (div.offsetTop - 15) * s;
    }
    if (y > state.y + div.offsetTop * s + div.clientHeight * s) { // If the column is below the visible area of the entity container div then we should use the bottom of the column container.
        y = state.y + (div.offsetTop + div.clientHeight - 5) * s;
    }
    return y;
}
