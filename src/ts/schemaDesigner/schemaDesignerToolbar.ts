import { mxCellState, mxGraph } from "mxgraph";
import {mxGraphFactory as mx} from '../mx';
import { SchemaDesignerConfig } from "./schemaDesignerInterfaces";

export class SchemaDesignerToolbar {
    private _toolbarDiv: HTMLElement;
    constructor(private _container: HTMLElement, private _graph: mxGraph, private _config: SchemaDesignerConfig) {
        this._toolbarDiv = document.createElement("div");
        this._container.appendChild(this._toolbarDiv);
        this._toolbarDiv.classList.add("sd-toolbar");
        this._toolbarDiv.style.color = this._config.colors.toolbarForeground;
    }

    public addButton(
        icon: string,
        title: string,
        callback: () => void,
        onDragEndCallback?: (graph: mxGraph, evt: MouseEvent, cell: mxCellState) => void) {
        const button = document.createElement("div");
        this._toolbarDiv.appendChild(button);
        button.classList.add("sd-toolbar-button");
        button.innerHTML = icon;
        button.onclick = callback;
        button.title = title;
        if (onDragEndCallback) {
            const dragImage = button.cloneNode(true) as HTMLElement;
            dragImage.style.backgroundColor = this._config.colors.toolbarBackground;
            const ds = mx.mxUtils.makeDraggable(
                button,
                this._graph,
                onDragEndCallback,
                dragImage
            );
            ds.highlightDropTargets = true;
        }
    }

    public addDivider() {
        const divider = document.createElement("div");
        this._toolbarDiv.appendChild(divider);
        divider.classList.add("sd-toolbar-divider");
    }
}