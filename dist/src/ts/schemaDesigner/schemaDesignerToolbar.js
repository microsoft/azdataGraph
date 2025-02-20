"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaDesignerToolbar = void 0;
const mx_1 = require("../mx");
class SchemaDesignerToolbar {
    constructor(_container, _graph, _config) {
        this._container = _container;
        this._graph = _graph;
        this._config = _config;
        this.buttons = new Map();
        this._toolbarDiv = document.createElement("div");
        this._container.appendChild(this._toolbarDiv);
        this._toolbarDiv.classList.add("sd-toolbar");
        this._toolbarDiv.style.color = this._config.colors.toolbarForeground;
    }
    addButton(icon, title, callback, onDragEndCallback) {
        const button = document.createElement("div");
        this._toolbarDiv.appendChild(button);
        button.classList.add("sd-toolbar-button");
        button.innerHTML = icon;
        button.onclick = () => {
            if (!this.isButtonDisabled(title)) {
                callback();
            }
        };
        button.title = title;
        if (onDragEndCallback) {
            const dragImage = button.cloneNode(true);
            dragImage.style.backgroundColor = this._config.colors.toolbarBackground;
            const ds = mx_1.mxGraphFactory.mxUtils.makeDraggable(button, this._graph, onDragEndCallback, dragImage);
            ds.highlightDropTargets = true;
        }
        this.buttons.set(title, button);
    }
    disableButton(title) {
        var _a;
        (_a = this.buttons.get(title)) === null || _a === void 0 ? void 0 : _a.classList.add("sd-toolbar-button-disabled");
    }
    enableButton(title) {
        var _a;
        (_a = this.buttons.get(title)) === null || _a === void 0 ? void 0 : _a.classList.remove("sd-toolbar-button-disabled");
    }
    isButtonDisabled(title) {
        var _a;
        return (_a = this.buttons.get(title)) === null || _a === void 0 ? void 0 : _a.classList.contains("sd-toolbar-button-disabled");
    }
    addDivider() {
        const divider = document.createElement("div");
        this._toolbarDiv.appendChild(divider);
        divider.classList.add("sd-toolbar-divider");
    }
}
exports.SchemaDesignerToolbar = SchemaDesignerToolbar;
