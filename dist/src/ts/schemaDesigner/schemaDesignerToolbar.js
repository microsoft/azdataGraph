"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaDesignerToolbar = void 0;
const mx_1 = require("../mx");
class SchemaDesignerToolbar {
    constructor(_container, _graph, _config) {
        this._container = _container;
        this._graph = _graph;
        this._config = _config;
        this._toolbarDiv = document.createElement("div");
        this._container.appendChild(this._toolbarDiv);
        this._toolbarDiv.classList.add("sd-toolbar");
    }
    addButton(icon, title, callback, onDragEndCallback) {
        const button = document.createElement("div");
        this._toolbarDiv.appendChild(button);
        button.classList.add("sd-toolbar-button");
        button.style.backgroundImage = `url(${icon})`;
        button.onclick = callback;
        button.title = title;
        if (onDragEndCallback) {
            const dragImage = button.cloneNode(true);
            dragImage.style.backgroundColor = this._config.colors.toolbarBackground;
            const ds = mx_1.mxGraphFactory.mxUtils.makeDraggable(button, this._graph, onDragEndCallback, dragImage);
            ds.highlightDropTargets = true;
        }
    }
    addDivider() {
        const divider = document.createElement("div");
        this._toolbarDiv.appendChild(divider);
        divider.classList.add("sd-toolbar-divider");
    }
}
exports.SchemaDesignerToolbar = SchemaDesignerToolbar;
