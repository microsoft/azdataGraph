import { mxCellState, mxGraph, mxGraphModel } from "mxgraph";
import { EdgeCellValue, IColumn, IEntity, SchemaDesignerConfig } from "./schemaDesignerInterfaces";
import createColor from "create-color";
import { mxGraphFactory as mx } from '../mx';
import { SchemaDesigner } from "./schemaDesigner";

export class SchemaDesignerEntity implements IEntity {
    public name: string;
    public schema: string;
    public columns: IColumn[];
    public editor!: boolean;

    private listeners: { target: HTMLElement, eventName: string, callback?: any }[] = [];

    constructor(entity: IEntity, private _config: SchemaDesignerConfig, private _graph: mxGraph, private _schemaDesigner: SchemaDesigner) {
        this.name = entity.name;
        this.schema = entity.schema;
        this.columns = entity.columns;
    }

    render(): HTMLElement {
        this.removeListeners();
        return this.renderTable();
    }

    public setupValueAndListeners(parentNode: HTMLElement, state: mxCellState): void {
        this.removeListeners();

        const columnsDiv = parentNode.getElementsByClassName("sd-table-columns")[0];
        if (columnsDiv !== undefined && columnsDiv !== null) {
            if (columnsDiv.getAttribute('scrollHandler') === null) {
                columnsDiv.setAttribute('scrollHandler', 'true');
                const updateEdges = mx.mxUtils.bind(this, () => {
                    this._graph.clearSelection();
                    const edgeCount = this.model.getEdgeCount(state.cell);
                    // Only updates edges to avoid update in DOM order
                    // for text label which would reset the scrollbar
                    for (let i = 0; i < edgeCount; i++) {
                        const edge = this.model.getEdgeAt(state.cell, i);
                        this.graph.view.invalidate(edge, true, false);
                        this.graph.view.validate(edge);
                    }
                });
                mx.mxEvent.addListener(columnsDiv, "scroll", () => {
                    state.cell.value.scrollTop = columnsDiv.scrollTop;
                    updateEdges();
                });
                mx.mxEvent.addListener(columnsDiv, "mouseup", updateEdges);
            }
        }
        const editButton = parentNode.getElementsByClassName("sd-entity-edit-button")[0];
        if (editButton !== undefined && editButton !== null) {
            this.addListeners(editButton as HTMLElement, "click", async () => {
                
                const previouslyEditedCell = this._schemaDesigner.currentCellUnderEdit;
                if (previouslyEditedCell) {
                    previouslyEditedCell.cell.value.editing = false;
                }
                this.editor = true;
                this._schemaDesigner.currentCellUnderEdit = state;
                const relationships = this._schemaDesigner.getRelationships(state);

                this.graph.model.beginUpdate();

                // Callback to edit the entity
                const { editedEntity, editedOutgoingEdges } = await this._config.editEntity(state.cell, state.x, state.y, this._graph.view.scale, relationships.incoming, relationships.outgoing, this._schemaDesigner.schema);

                // Update the entity
                this.name = editedEntity.name;
                this.schema = editedEntity.schema;
                this.columns = editedEntity.columns;

                // Update the entity cell in the graph
                this.editor = false;
                this.graph.cellRenderer.redraw(state, true);
                this.graph.resizeCell(state.cell, new mx.mxRectangle(state.x, state.y, this.getWidth(), this.getHeight()), true);
                this.graph.refresh(state.cell);

                // Delete all edges;
                const edges = this._graph.getEdges(state.cell);
                edges.forEach(e => {
                    this._graph.getModel().remove(e);
                });

                // Add new incoming edges
                relationships.incoming.forEach((edge) => {
                    // update the name and schema of the entity
                    (edge.value as EdgeCellValue).referencedEntity = editedEntity.name;
                    (edge.value as EdgeCellValue).referencedSchema = editedEntity.schema;
                    this._schemaDesigner.renderRelationship(edge.value);
                });

                // Add new outgoing edges
                editedOutgoingEdges.forEach((edge) => {
                    (edge as EdgeCellValue).entity = editedEntity.name;
                    (edge as EdgeCellValue).schemaName = editedEntity.schema;
                    this._schemaDesigner.renderRelationship(edge);
                });

                // Update the cell position
                this._schemaDesigner.autoArrange();

                this.graph.model.endUpdate();
            });
        }

    }

    public addListeners(div: HTMLElement, type: string, callback: (event: Event) => void): void {
        this.listeners.push({
            target: div,
            eventName: type,
            callback: callback
        });
        div.addEventListener(type, callback);
    }

    public removeListeners(): void {
        this.listeners.forEach(listener => {
            listener.target.removeEventListener(listener.eventName, listener.callback);
        });
    }

    public get model(): mxGraphModel {
        return this._graph.getModel();
    }

    public get graph(): mxGraph {
        return this._graph;
    }

    private renderTable(): HTMLElement {
        const parent = document.createElement("div");
        parent.classList.add("sd-table");

        // Tables are colored based on the schema
        const tableColor = createColor(this.schema, { format: "hex" });
        const colorIndicator = document.createElement("div");
        colorIndicator.classList.add("sd-table-color-indicator");
        colorIndicator.style.backgroundColor = tableColor;
        parent.appendChild(colorIndicator);

        // Table header
        const header = document.createElement("div");
        header.classList.add("sd-table-header");
        const headerIcon = document.createElement("div");
        headerIcon.innerHTML = this._config.icons.entityIcon;
        headerIcon.classList.add("sd-table-header-icon");
        headerIcon.innerHTML = this._config.icons.entityIcon;
        header.appendChild(headerIcon);
        const headerText = document.createElement("div");
        headerText.classList.add("sd-table-header-text");
        const tableTitle = `${this.schema}.${this.name}`;
        headerText.innerText = tableTitle;
        headerText.title = tableTitle;
        header.appendChild(headerText);

        // Add edit button if the schema designer is editable
        if (this._config.isEditable) {
            const button = document.createElement("button");
            button.type = "button";
            button.classList.add("sd-entity-button", "sd-entity-edit-button");
            button.title = "Edit";
            button.innerHTML = this._config.icons.editIcon;
            header.appendChild(button);
        }

        // Adding header to the parent
        parent.appendChild(header);



        // Adding columns
        // TODO: Make this keyboard accessible
        const columns = document.createElement("div");
        columns.classList.add("sd-table-columns");
        this.columns.forEach((column, index) => {
            const columnDiv = document.createElement("div");
            columnDiv.classList.add("sd-table-column");

            // Add column constraint icon
            const keyIcon = document.createElement("div");
            keyIcon.classList.add("sd-table-column-icon");
            if (column.isPrimaryKey) {
                keyIcon.innerHTML = this._config.icons.primaryKeyIcon;
                keyIcon.title = "Primary key";
            }
            if (this.isForeignKey(index)) {
                keyIcon.innerHTML = this._config.icons.foreignKeyIcon;
                keyIcon.title = "Foreign key";
            }
            columnDiv.appendChild(keyIcon);

            // Add column name
            const columnNameDiv = document.createElement("div");
            columnNameDiv.classList.add("sd-table-column-text");
            columnNameDiv.title = column.name;
            columnNameDiv.innerText = column.name;
            columnNameDiv.title = this.getColumnTitle(index);
            columnDiv.appendChild(columnNameDiv);

            // Add column data type
            const columnDataTypeDiv = document.createElement("div");
            columnDataTypeDiv.classList.add("sd-table-column-datatype-text");
            columnDataTypeDiv.innerText = column.dataType;
            columnDiv.appendChild(columnDataTypeDiv);
            columnDiv.setAttribute("column-id", index.toString());

            columns.appendChild(columnDiv);
        });
        parent.appendChild(columns);
        return parent;
    }

    /**
     * Checks if the columns has a foreign key dependency
     * @param index index of the column
     * @returns true if the column has a foreign key dependency
     */
    private isForeignKey(index: number): boolean {
        const cells = this._graph.getChildCells(this._graph.getDefaultParent());
        const vertex = cells.find(cell => cell.vertex && cell.value.name === this.name && cell.value.schema === this.schema);
        if (vertex) {
            const edges = this._graph.getEdges(vertex);
            const outgoingEdges = edges.filter(edge => edge.source === vertex);
            for (const edge of outgoingEdges) {
                if (edge.value.sourceRow - 1 === index) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Gets the column title for the tooltip
     * @param index index of the column
     * @returns column title
     */
    private getColumnTitle(index: number): string {
        const column = this.columns[index];
        let columnTitle = `${column.name}`;
        if (column.isPrimaryKey) {
            columnTitle += ` Primary key`;
        }
        const cells = this._graph.getChildCells(this._graph.getDefaultParent());
        const vertex = cells.find(cell => cell.vertex && cell.value.name === this.name && cell.value.schema === this.schema);
        if (vertex) {
            const edges = this._graph.getEdges(vertex);
            const outgoingEdges = edges.filter(edge => edge.source === vertex);
            for (const edge of outgoingEdges) {
                if (edge.value.sourceRow - 1 === index) {
                    return columnTitle + ` Foreign key`;
                }
            }
        }
        return columnTitle;
    }

    public getWidth(): number {
        return 400;
    }

    public getHeight(): number {
        return Math.min(330, 52 + this.columns.length * 28) + 4;
    }
}
