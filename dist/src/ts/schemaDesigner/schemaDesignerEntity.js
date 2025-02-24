"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaDesignerTable = void 0;
const create_color_1 = __importDefault(require("create-color"));
const mx_1 = require("../mx");
class SchemaDesignerTable {
    /**
     * Creates a new instance of the SchemaDesignerEntity class
     * @param entity entity to be rendered
     * @param config schema designer configuration
     * @param mxGraph mxGraph instance
     * @param schemaDesigner schema designer instance
     */
    constructor(entity, schemaDesigner) {
        this.schemaDesigner = schemaDesigner;
        this.eventListeners = [];
        /**
         * The foreign keys of the table
         */
        this.foreignKeys = [];
        this.id = entity.id;
        this.name = entity.name;
        this.schema = entity.schema;
        this.columns = entity.columns;
        // tracking foreign keys through mxCells instead of this object.
        this.foreignKeys = [];
        this.editor = false;
    }
    /**
     * Renders the entity
     * @returns the rendered entity
     */
    render() {
        this.removeEventListeners();
        return this.renderTableDiv();
    }
    /**
     * Sets up the entity DOM
     * @param parentNode node to be set up
     * @param state state of the node
     */
    setupEntityDOM(parentNode, state) {
        const columnsDiv = parentNode.getElementsByClassName("sd-table-columns")[0];
        if (columnsDiv !== undefined && columnsDiv !== null) {
            if (columnsDiv.getAttribute('scrollHandler') === null) {
                columnsDiv.setAttribute('scrollHandler', 'true');
                const updateEdges = mx_1.mxGraphFactory.mxUtils.bind(this, () => {
                    this.mxGraph.clearSelection();
                    const edgeCount = this.mxModel.getEdgeCount(state.cell);
                    // Only updates edges to avoid update in DOM order
                    // for text label which would reset the scrollbar
                    for (let i = 0; i < edgeCount; i++) {
                        const edge = this.mxModel.getEdgeAt(state.cell, i);
                        this.mxGraph.view.invalidate(edge, true, false);
                        this.mxGraph.view.validate(edge);
                    }
                });
                mx_1.mxGraphFactory.mxEvent.addListener(columnsDiv, "scroll", () => {
                    state.cell.value.scrollTop = columnsDiv.scrollTop;
                    updateEdges();
                });
                mx_1.mxGraphFactory.mxEvent.addListener(columnsDiv, "mouseup", updateEdges);
            }
        }
        const editButton = parentNode.getElementsByClassName("sd-entity-edit-button")[0];
        if (editButton !== undefined && editButton !== null) {
            if (editButton.getAttribute('clickHandler') !== null) {
                return;
            }
            editButton.setAttribute('clickHandler', 'true');
            this.addEventListeners(editButton, "click", () => __awaiter(this, void 0, void 0, function* () {
                this.editTable(state);
            }));
        }
    }
    /**
     * Edits the table
     * @param state state of the entity
     */
    editTable(state) {
        return __awaiter(this, void 0, void 0, function* () {
            this.schemaDesigner.activeCellState = state;
            this.editor = true;
            const mxCellTableValue = state.cell.value;
            const table = {
                id: mxCellTableValue.id,
                name: mxCellTableValue.name,
                schema: mxCellTableValue.schema,
                columns: JSON.parse(JSON.stringify(mxCellTableValue.columns)), // clone the columns
                foreignKeys: JSON.parse(JSON.stringify(mxCellTableValue.schemaDesigner.getForeignKeysForTable(state.cell)))
            };
            yield this.schemaDesigner.config.editTable(table, state.cell, state.x, state.y, this.mxGraph.view.scale, this.schemaDesigner.schema);
        });
    }
    /**
     * Adds event listeners to the entity
     */
    addEventListeners(div, type, callback) {
        this.eventListeners.push({
            target: div,
            eventName: type,
            callback: callback
        });
        div.addEventListener(type, callback);
    }
    /**
     * Removes event listeners from the entity
     */
    removeEventListeners() {
        this.eventListeners.forEach(listener => {
            listener.target.removeEventListener(listener.eventName, listener.callback);
        });
    }
    /**
     * Gets the mxGraph model
     */
    get mxModel() {
        return this.schemaDesigner.mxGraph.getModel();
    }
    /**
     * Gets the mxGraph instance
     */
    get mxGraph() {
        return this.schemaDesigner.mxGraph;
    }
    /**
     * Gets the schema designer configuration
     */
    get schemaDesignerConfig() {
        return this.schemaDesigner.config;
    }
    /**
     * Renders the table div
     * @returns the table div
     */
    renderTableDiv() {
        const FONT_SIZE = "13px";
        const LINE_HEIGHT = "18px";
        const FONT_WEIGHT = "400";
        if (this.parentDiv) {
            this.removeEventListeners();
            this.parentDiv.remove();
        }
        const parent = document.createElement("div");
        this.parentDiv = parent;
        parent.classList.add("sd-table");
        parent.style.width = "400px";
        parent.style.height = "100%";
        parent.style.borderRadius = "2px";
        parent.style.color = "var(--sd-cell-html-foreground)";
        parent.style.boxShadow = "0px 3px 8px rgba(0, 0, 0, 0.35), 0px 1px 3px rgba(0, 0, 0, 0.5), inset 0px 0.5px 0px rgba(255, 255, 255, 0.08), inset 0px 0px 0.5px rgba(255, 255, 255, 0.3)";
        parent.style.display = "flex";
        parent.style.flexDirection = "column";
        parent.style.backgroundColor = "var(--sd-graph-background-color)";
        // Tables are colored based on the schema
        const tableColor = (0, create_color_1.default)(this.schema, { format: "hex" });
        const colorIndicator = document.createElement("div");
        colorIndicator.classList.add("sd-table-color-indicator");
        colorIndicator.style.backgroundColor = tableColor;
        colorIndicator.style.width = "100%";
        colorIndicator.style.height = "6px";
        colorIndicator.style.borderRadius = "2px 2px 0 0";
        parent.appendChild(colorIndicator);
        // Table header
        const header = document.createElement("div");
        header.classList.add("sd-table-header");
        header.style.display = "flex";
        header.style.gap = "10px";
        header.style.height = "40px";
        header.style.borderBottom = "1px solid var(--sd-cell-divider-color)";
        const headerIcon = document.createElement("div");
        headerIcon.innerHTML = this.schemaDesignerConfig.icons.entityIcon;
        headerIcon.classList.add("sd-table-header-icon");
        headerIcon.style.width = "24px";
        headerIcon.style.height = "100%";
        headerIcon.style.backgroundSize = "16px 16px";
        headerIcon.style.backgroundRepeat = "no-repeat";
        headerIcon.style.backgroundPosition = "center";
        headerIcon.style.marginLeft = "10px";
        headerIcon.style.display = "flex";
        headerIcon.style.justifyContent = "center";
        headerIcon.style.alignItems = "center";
        headerIcon.style.color = "var(--sd-cell-html-foreground)";
        headerIcon.innerHTML = this.schemaDesignerConfig.icons.entityIcon;
        header.appendChild(headerIcon);
        const headerText = document.createElement("div");
        headerText.classList.add("sd-table-header-text");
        headerText.style.fontSize = "14px";
        headerText.style.fontWeight = "500";
        headerText.style.alignSelf = "center";
        headerText.style.textAlign = "left";
        headerText.style.flex = "1";
        headerText.style.userSelect = "none";
        headerText.style.textOverflow = "ellipsis";
        headerText.style.overflow = "hidden";
        const tableTitle = `${this.schema}.${this.name}`;
        headerText.innerText = tableTitle;
        headerText.title = tableTitle;
        header.appendChild(headerText);
        // Add edit button if the schema designer is editable
        if (this.schemaDesignerConfig.isEditable) {
            const button = document.createElement("button");
            button.type = "button";
            button.classList.add("sd-entity-button", "sd-entity-edit-button");
            button.title = "Edit";
            button.innerHTML = this.schemaDesignerConfig.icons.editIcon;
            header.appendChild(button);
        }
        // Adding header to the parent
        parent.appendChild(header);
        // Adding columns
        // TODO: Make this keyboard accessible
        const columns = document.createElement("div");
        columns.classList.add("sd-table-columns");
        columns.style.display = "flex";
        columns.style.flexDirection = "column";
        columns.style.maxHeight = "280px";
        columns.style.overflowY = "auto";
        columns.style.marginTop = "5px";
        columns.style.padding = "0";
        columns.style.boxSizing = "border-box";
        this.columns.forEach((column, index) => {
            const columnDiv = document.createElement("div");
            columnDiv.classList.add("sd-table-column");
            columnDiv.style.display = "flex";
            columnDiv.style.gap = "10px";
            columnDiv.style.height = "28px";
            columnDiv.style.minHeight = "28px";
            columnDiv.style.boxSizing = "border-box";
            columnDiv.addEventListener("mouseenter", () => {
                columnDiv.style.backgroundColor = "var(--sd-cell-html-hover-column-background);";
            });
            columnDiv.addEventListener("mouseleave", () => {
                columnDiv.style.backgroundColor = "transparent";
            });
            // Add column constraint icon
            const keyIcon = document.createElement("div");
            keyIcon.classList.add("sd-table-column-icon");
            keyIcon.style.width = "18px";
            keyIcon.style.height = "18px";
            keyIcon.style.height = "100%";
            keyIcon.style.backgroundSize = "16px 16px";
            keyIcon.style.backgroundRepeat = "no-repeat";
            keyIcon.style.backgroundPosition = "center";
            keyIcon.style.marginLeft = "10px";
            keyIcon.style.display = "flex";
            keyIcon.style.justifyContent = "center";
            keyIcon.style.alignItems = "center";
            if (column.isPrimaryKey) {
                keyIcon.innerHTML = this.schemaDesignerConfig.icons.primaryKeyIcon;
                keyIcon.title = "Primary key";
            }
            if (this.hasForeignKey(index)) {
                keyIcon.innerHTML = this.schemaDesignerConfig.icons.foreignKeyIcon;
                keyIcon.title = "Foreign key";
            }
            columnDiv.appendChild(keyIcon);
            // Add column name
            const columnNameDiv = document.createElement("div");
            columnNameDiv.classList.add("sd-table-column-text");
            columnNameDiv.style.fontSize = FONT_SIZE;
            columnNameDiv.style.lineHeight = LINE_HEIGHT;
            columnNameDiv.style.fontWeight = FONT_WEIGHT;
            columnNameDiv.style.alignSelf = "center";
            columnNameDiv.style.textAlign = "left";
            columnNameDiv.style.userSelect = "none";
            columnNameDiv.style.flex = "1";
            columnNameDiv.style.overflow = "hidden";
            columnNameDiv.style.textOverflow = "ellipsis";
            columnNameDiv.title = column.name;
            columnNameDiv.innerText = column.name;
            columnNameDiv.title = this.getColumnTooltip(index);
            columnDiv.appendChild(columnNameDiv);
            // Add column data type
            const columnDataTypeDiv = document.createElement("div");
            columnDataTypeDiv.classList.add("sd-table-column-datatype-text");
            columnDataTypeDiv.style.fontSize = FONT_SIZE;
            columnDataTypeDiv.style.lineHeight = LINE_HEIGHT;
            columnDataTypeDiv.style.fontWeight = FONT_WEIGHT;
            columnDataTypeDiv.style.alignSelf = "center";
            columnDataTypeDiv.style.textAlign = "left";
            columnDataTypeDiv.style.marginRight = "10px";
            columnDataTypeDiv.style.userSelect = "none";
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
    hasForeignKey(index) {
        const cells = this.mxGraph.getChildCells(this.mxGraph.getDefaultParent());
        const vertex = cells.find(cell => cell.vertex && cell.value.name === this.name && cell.value.schema === this.schema);
        if (vertex) {
            const edges = this.mxGraph.getEdges(vertex);
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
    getColumnTooltip(index) {
        const column = this.columns[index];
        let columnTitle = `${column.name}`;
        if (column.isPrimaryKey) {
            columnTitle += ` Primary key`;
        }
        const cells = this.mxGraph.getChildCells(this.mxGraph.getDefaultParent());
        const vertex = cells.find(cell => cell.vertex && cell.value.name === this.name && cell.value.schema === this.schema);
        if (vertex) {
            const edges = this.mxGraph.getEdges(vertex);
            const outgoingEdges = edges.filter(edge => edge.source === vertex);
            for (const edge of outgoingEdges) {
                if (edge.value.sourceRow - 1 === index) {
                    return columnTitle + ` Foreign key`;
                }
            }
        }
        return columnTitle;
    }
    get width() {
        return 400;
    }
    get height() {
        return Math.min(330, 52 + this.columns.length * 28) + 4;
    }
}
exports.SchemaDesignerTable = SchemaDesignerTable;
