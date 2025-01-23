"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaDesignerEntity = void 0;
const create_color_1 = __importDefault(require("create-color"));
class SchemaDesignerEntity {
    constructor(entity, _config, _graph) {
        this._config = _config;
        this._graph = _graph;
        this.name = entity.name;
        this.schema = entity.schema;
        this.columns = entity.columns;
    }
    render() {
        const color = (0, create_color_1.default)(this.schema, { format: "hex" });
        const parent = document.createElement("div");
        parent.classList.add("sd-table");
        const colorIndicator = document.createElement("div");
        colorIndicator.classList.add("sd-table-color-indicator");
        parent.appendChild(colorIndicator);
        colorIndicator.style.backgroundColor = color;
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
        parent.appendChild(header);
        const columns = document.createElement("div");
        columns.classList.add("sd-table-columns");
        this.columns.forEach((column, index) => {
            const columnDiv = document.createElement("div");
            columnDiv.classList.add("sd-table-column");
            const columnIcon = document.createElement("div");
            columnIcon.classList.add("sd-table-column-icon");
            if (this._config.icons.dataTypeIcons[column.dataType] !== undefined) {
                columnIcon.innerHTML = this._config.icons.dataTypeIcons[column.dataType];
            }
            else {
                columnIcon.innerHTML = this._config.icons.customDataTypeIcon;
            }
            columnIcon.title = column.dataType;
            columnDiv.appendChild(columnIcon);
            const columnText = document.createElement("div");
            columnText.classList.add("sd-table-column-text");
            columnText.title = column.name;
            columnText.innerText = column.name;
            columnText.title = this.getColumnTitle(column, index);
            columnDiv.appendChild(columnText);
            const columnConstraints = document.createElement("div");
            columnConstraints.classList.add("sd-table-column-constraints");
            columnConstraints.innerText = this.getConstraintText(column, index);
            columnDiv.appendChild(columnConstraints);
            columnDiv.setAttribute("column-id", index.toString());
            columns.appendChild(columnDiv);
        });
        parent.appendChild(columns);
        this.div = parent;
        return parent;
    }
    getConstraintText(col, index) {
        const constraints = [];
        if (col.isPrimaryKey) {
            constraints.push("PK");
        }
        const cells = this._graph.getChildCells(this._graph.getDefaultParent());
        const vertex = cells.find(cell => cell.vertex && cell.value.name === this.name && cell.value.schema === this.schema);
        if (vertex) {
            const edges = this._graph.getEdges(vertex);
            const outgoingEdges = edges.filter(edge => edge.source === vertex);
            for (const edge of outgoingEdges) {
                if (edge.value.sourceRow - 1 === index) {
                    constraints.push("FK");
                    break;
                }
            }
        }
        return constraints.join(", ");
    }
    getColumnTitle(column, index) {
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
exports.SchemaDesignerEntity = SchemaDesignerEntity;
