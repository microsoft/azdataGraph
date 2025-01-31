import { mxCellState, mxGraph, mxGraphModel } from "mxgraph";
import { IColumn, IEntity, SchemaDesignerConfig } from "./schemaDesignerInterfaces";
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
        if (this.editor) {
            return this.renderEditor();
        } else {
            return this.renderTable();
        }
    }

    public setupValueAndListeners(parentNode: HTMLElement, state: mxCellState): void {
        this.removeListeners();
        if (this.editor) {
            const entityNameInput = parentNode.getElementsByClassName("sd-entity-editor-name-input")[0] as HTMLInputElement;
            if (entityNameInput !== undefined && entityNameInput !== null) {
                entityNameInput.focus();
            }
            entityNameInput.value = this.name;

            const entitySchemaDropdown = parentNode.getElementsByClassName("sd-entity-editor-schema-dropdown")[0] as HTMLSelectElement;
            if (entitySchemaDropdown !== undefined && entitySchemaDropdown !== null) {
                entitySchemaDropdown.innerHTML = "";
                const schemas = this._config.schemas;
                schemas.forEach(schema => {
                    const option = document.createElement("option");
                    option.value = schema;
                    option.text = schema;
                    entitySchemaDropdown.add(option);
                });
                entitySchemaDropdown.value = this.schema;
            }

            const columnsTable = parentNode.getElementsByClassName("sd-entity-editor-columns-table")[0];
            if (columnsTable !== undefined && columnsTable !== null) {
                this.columns.forEach((column, index) => {
                    const columnRow = columnsTable.getElementsByClassName("sd-entity-editor-column-row")[index];
                    if (columnRow !== undefined && columnRow !== null) {
                        const columnName = columnRow.getElementsByTagName("input")[0] as HTMLInputElement;
                        columnName.value = column.name;
                        const columnDataType = columnRow.getElementsByTagName("select")[0] as HTMLSelectElement;
                        columnDataType.innerHTML = "";
                        const dataTypes = this._config.dataTypes;
                        dataTypes.forEach(dataType => {
                            const option = document.createElement("option");
                            option.value = dataType;
                            option.text = dataType;
                            columnDataType.add(option);
                        });
                        columnDataType.value = column.dataType;
                        const columnPK = columnRow.getElementsByTagName("input")[1] as HTMLInputElement;
                        columnPK.checked = column.isPrimaryKey;


                        const deleteButton = columnRow.getElementsByClassName("sd-entity-editor-delete-button")[0] as HTMLElement;
                        this.addListeners(deleteButton, "click", () => {

                            this.columns.splice(index, 1);

                            // move all edges to the previous row
                            const cells = this._graph.getChildCells(this._graph.getDefaultParent());
                            const vertex = cells.find(cell => cell.vertex && cell.value.name === this.name && cell.value.schema === this.schema);
                            if (vertex) {
                                const edges = this._graph.getEdges(vertex);
                                console.log(edges);
                                const outgoingEdges = edges.filter(edge => edge.source === vertex);
                                for (const edge of outgoingEdges) {
                                    if (edge.value.sourceRow > index) {
                                        edge.value.sourceRow = edge.value.sourceRow - 1;
                                    }

                                }
                                const incomingEdges = edges.filter(edge => edge.target === vertex);
                                for (const edge of incomingEdges) {
                                    if (edge.value.targetRow > index) {
                                        edge.value.targetRow = edge.value.targetRow - 1;
                                    }

                                }
                            }

                            // focus on the next row
                            if (index < this.columns.length) {
                                const nextRow = columnsTable.getElementsByClassName("sd-entity-editor-column-row")[index] as HTMLElement;
                                const nextRowInput = nextRow.getElementsByTagName("input")[0] as HTMLInputElement;
                                nextRowInput.focus();
                            }
                            columnsTable.removeChild(columnRow);

                        });

                        // disable delete button if it is has a foreign key dependency

                        const cells = this._graph.getChildCells(this._graph.getDefaultParent());
                        const vertex = cells.find(cell => cell.vertex && cell.value.name === this.name && cell.value.schema === this.schema);
                        if (vertex) {
                            const edges = this._graph.getEdges(vertex);
                            const outgoingEdges = edges.filter(edge => edge.source === vertex);
                            for (const edge of outgoingEdges) {
                                if (edge.value.sourceRow - 1 === index) {
                                    deleteButton.setAttribute("disabled", "true");
                                    deleteButton.title = "Column has a foreign key dependency";
                                }
                            }
                        }
                    }
                });
            }

            const cancelButton = parentNode.getElementsByClassName("sd-entity-editor-cancel-button")[0];
            if (cancelButton !== undefined && cancelButton !== null) {
                this.addListeners(cancelButton as HTMLElement, "click", () => {
                    this.editor = false;
                    this.graph.cellRenderer.redraw(state, true);
                });
            }

            const saveButton = parentNode.getElementsByClassName("sd-entity-editor-save-button")[0];
            if (saveButton !== undefined && saveButton !== null) {
                this.addListeners(saveButton as HTMLElement, "click", () => {
                    this.editor = false;
                    this.name = entityNameInput.value;
                    this.schema = entitySchemaDropdown.value;
                    const columnsTable = parentNode.getElementsByClassName("sd-entity-editor-columns-table")[0];
                    if (columnsTable !== undefined && columnsTable !== null) {
                        this.columns = [];
                        const columnRows = columnsTable.getElementsByClassName("sd-entity-editor-column-row");
                        for (let i = 0; i < columnRows.length; i++) {
                            const columnRow = columnRows[i];
                            const columnName = columnRow.getElementsByTagName("input")[0] as HTMLInputElement;
                            const columnDataType = columnRow.getElementsByTagName("select")[0] as HTMLSelectElement;
                            const columnPK = columnRow.getElementsByTagName("input")[1] as HTMLInputElement;
                            this.columns.push({
                                name: columnName.value,
                                dataType: columnDataType.value,
                                isPrimaryKey: columnPK.checked,
                                isIdentity: false,
                            });
                        }
                    }

                    state.height = Math.min(330, 52 + this.columns.length * 28) + 4,
                        state.cell.geometry.height = state.height;

                    this.graph.cellRenderer.redraw(state, true);
                    const edgeCount = this.model.getEdgeCount(state.cell);
                    // Only updates edges to avoid update in DOM order
                    // for text label which would reset the scrollbar
                    for (let i = 0; i < edgeCount; i++) {
                        const edge = this.model.getEdgeAt(state.cell, i);
                        this.graph.view.invalidate(edge, true, false);
                        this.graph.view.validate(edge);
                    }

                });
            }
            const addButton = parentNode.getElementsByClassName("sd-entity-editor-add-button")[0];
            if (addButton !== undefined && addButton !== null) {
                this.addListeners(addButton as HTMLElement, "click", () => {
                    const columnsTable = parentNode.getElementsByClassName("sd-entity-editor-columns-table")[0];
                    if (columnsTable !== undefined && columnsTable !== null) {
                        const columnRow = document.createElement("div");
                        columnRow.role = "row";
                        columnRow.classList.add("sd-entity-editor-column-row");
                        const columnName = document.createElement("input");
                        columnName.type = "text";
                        columnName.classList.add("sd-entity-editor-input");
                        columnRow.appendChild(columnName);
                        const columnDataType = document.createElement("select");
                        // put the data types in the dropdown
                        this._config.dataTypes.forEach(dataType => {
                            const option = document.createElement("option");
                            option.value = dataType;
                            option.text = dataType;
                            columnDataType.add(option);
                        });

                        columnDataType.classList.add("sd-entity-editor-dropdown");
                        columnRow.appendChild(columnDataType);
                        const columnPK = document.createElement("input");
                        columnPK.type = "checkbox";
                        columnRow.appendChild(columnPK);
                        const deleteButton = document.createElement("button");
                        deleteButton.innerHTML = this._config.icons.deleteIcon;
                        deleteButton.classList.add("sd-entity-editor-delete-button");
                        columnRow.appendChild(deleteButton);
                        columnsTable.appendChild(columnRow);
                        columnName.focus();
                    }
                });
            }
        }
        else {
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
                    console.log("Edit button clicked", state);
                    const editedEntity = await this._config.editEntity(state);
                    console.log("Edited entity", editedEntity);
                    // this.name = editedEntity.name;
                    // this.schema = editedEntity.schema;
                    // this.columns = editedEntity.columns;
                    
                    this.editor = true;
                    this.graph.cellRenderer.redraw(state, true);
                    this._schemaDesigner.currentCellUnderEdit = state;
                });
            }
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
        if(this._config.isEditable) {
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

    private renderEditor(): HTMLElement {
        const entityEditor = document.createElement("div");
        entityEditor.classList.add("sd-entity-editor");

        // Add entity name and schema input fields as 2 rows

        const entityNameLabel = document.createElement("label");
        entityNameLabel.innerText = "Name";
        entityEditor.appendChild(entityNameLabel);
        const entityNameInput = document.createElement("input");
        entityNameInput.classList.add("sd-entity-editor-input", "sd-entity-editor-name-input");
        entityNameInput.type = "text";
        entityNameInput.value = this.name;

        const nameRow = document.createElement("div");
        nameRow.classList.add("sd-entity-editor-row");
        nameRow.appendChild(entityNameLabel);
        nameRow.appendChild(entityNameInput);
        entityEditor.appendChild(nameRow);

        // Add schema as dropdown
        const entitySchemaLabel = document.createElement("label");
        entitySchemaLabel.innerText = "Schema";
        entityEditor.appendChild(entitySchemaLabel);
        const entitySchemaDropdown = document.createElement("select");
        entitySchemaDropdown.classList.add("sd-entity-editor-dropdown", "sd-entity-editor-schema-dropdown");
        entitySchemaDropdown.value = this.schema;
        const schemaRow = document.createElement("div");
        schemaRow.classList.add("sd-entity-editor-row");
        schemaRow.appendChild(entitySchemaLabel);
        schemaRow.appendChild(entitySchemaDropdown);
        entityEditor.appendChild(schemaRow);


        // Add columns as a table
        const columnsTable = document.createElement("div");
        columnsTable.role = "table";
        columnsTable.classList.add("sd-entity-editor-columns-table");
        this.columns.forEach(() => {
            // Add a row for editing each column
            const columnRow = document.createElement("div");
            columnRow.role = "row";
            columnRow.classList.add("sd-entity-editor-column-row");
            const columnName = document.createElement("input");
            columnName.type = "text";
            columnName.classList.add("sd-entity-editor-input");
            columnRow.appendChild(columnName);
            const columnDataType = document.createElement("select");
            columnDataType.classList.add("sd-entity-editor-dropdown");
            columnRow.appendChild(columnDataType);
            const columnPK = document.createElement("input");
            columnPK.type = "checkbox";
            columnRow.appendChild(columnPK);
            const deleteButton = document.createElement("button");
            deleteButton.innerHTML = this._config.icons.deleteIcon;
            deleteButton.classList.add("sd-entity-editor-delete-button", "sd-entity-button");
            columnRow.appendChild(deleteButton);
            columnsTable.appendChild(columnRow);
        });
        entityEditor.appendChild(columnsTable);


        // add sticky save and cancel buttons
        const buttons = document.createElement("div");
        buttons.classList.add("sd-entity-editor-buttons");
        const addButton = document.createElement("button");
        addButton.innerText = "Add Column";
        addButton.classList.add("sd-entity-editor-add-button");
        buttons.appendChild(addButton);
        const saveButton = document.createElement("button");
        saveButton.innerText = "Save";
        saveButton.classList.add("sd-entity-editor-save-button");
        const cancelButton = document.createElement("button");
        cancelButton.innerText = "Cancel";
        cancelButton.classList.add("sd-entity-editor-cancel-button");
        buttons.appendChild(saveButton);
        buttons.appendChild(cancelButton);
        entityEditor.appendChild(buttons);
        return entityEditor;
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
}
