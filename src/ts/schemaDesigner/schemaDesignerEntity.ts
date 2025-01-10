import { mxGraph } from "mxgraph";
import { IColumn, IEntity, SchemaDesignerConfig } from "./schemaDesignerInterfaces";
import createColor from "create-color";

export class SchemaDesignerEntity implements IEntity {
    public div!: HTMLElement;
    public name: string;
    public schema: string;
    public columns: IColumn[];

    constructor(entity: IEntity, private _config: SchemaDesignerConfig, private _graph: mxGraph) {
        this.name = entity.name;
        this.schema = entity.schema;
        this.columns = entity.columns;
    }

    render(): HTMLElement {
        const color = createColor(this.schema, { format: "hex" });
        const parent = document.createElement("div");
        parent.classList.add("sd-table");
        const colorIndicator = document.createElement("div");
        colorIndicator.classList.add("sd-table-color-indicator");
        parent.appendChild(colorIndicator);
        colorIndicator.style.backgroundColor = color;
        const header = document.createElement("div");
        header.classList.add("sd-table-header");
        const headerIcon = document.createElement("div");
        headerIcon.classList.add("sd-table-header-icon");
        headerIcon.style.backgroundImage = `url(${this._config.icons.entityIcon})`;
        header.appendChild(headerIcon);
        const headerText = document.createElement("div");
        headerText.classList.add("sd-table-header-text");
        headerText.innerText = `${this.schema}.${this.name}`;
        header.appendChild(headerText);
        parent.appendChild(header);

        const columns = document.createElement("div");
        columns.classList.add("sd-table-columns");
        this.columns.forEach((column, index) => {
            const columnDiv = document.createElement("div");
            columnDiv.classList.add("sd-table-column");
            const columnIcon = document.createElement("div");
            columnIcon.classList.add("sd-table-column-icon");
            columnIcon.style.backgroundImage = `url(${this._config.icons.dataTypeIcons![column.dataType]})`;
            columnDiv.appendChild(columnIcon);
            const columnText = document.createElement("div");
            columnText.classList.add("sd-table-column-text");
            columnText.innerText = column.name;
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

    private getConstraintText(col: IColumn, index: number): string {
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
}
