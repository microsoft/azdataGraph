/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

class SchemaDesigner {
    constructor(container, config) {
        this.container = container;
        this.config = config;

        const graphContainer = document.createElement('div');
        graphContainer.classList.add('sd-graph');


        this.container.appendChild(graphContainer);


        const editor = new mxEditor();
        editor.setGraphContainer(graphContainer);
        const graph = editor.graph;
        const model = graph.model;

        this.editor = editor;
        this.graph = graph;
        this.model = model;

        graph.setGridEnabled(true);
        graph.tooltipHandler.setEnabled(false);
        graph.getLabel = function (cell) {
            console.log(cell);
            if (cell.value != null) {
                return cell.value.render();
            }
        };
        // Columns are dynamically created HTML labels
        graph.isHtmlLabel = function (cell) {
            return !this.model.isEdge(cell);
        };
        graph.setPanning(true);
        graph.panningHandler.useLeftButtonForPanning = true;
        // Edges are not editable
        graph.isCellEditable = function (cell) {
            return !this.model.isEdge(cell);
        };
        graph.swimlaneNesting = false;
        // Only tables are movable
        graph.isCellMovable = function (cell) {
            console.log(graph.isSwimlane(cell));
            return graph.isSwimlane(cell);
        };
        // Only tables are resizable
        graph.isCellResizable = function (cell) {
            return false;
        };
        // Override folding to allow for tables
        graph.isCellFoldable = function (cell, collapse) {
            return false;
        };
        editor.layoutSwimlanes = true;
        editor.createSwimlaneLayout = function () {
            var layout = new mxStackLayout(this.graph, false);
            layout.fill = true;
            layout.resizeParent = true;
            // Overrides the function to always return true
            layout.isVertexMovable = function (cell) {
                return true;
            };
            return layout;
        };

        graph.convertValueToString = function (cell) {
            if (cell.value != null && cell.value.name != null) {
                return cell.value.name;
            }

            return mxGraph.prototype.convertValueToString.apply(this, arguments); // "supercall"
        };

        // Text label changes will go into the name field of the user object
        graph.model.valueForCellChanged = function (cell, value) {
                var old = cell.value.name;
                cell.value.name = value;
                return old;
        };

        var cellStyle = new Object();
        cellStyle[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
        cellStyle[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
        cellStyle[mxConstants.STYLE_FILLCOLOR] = "#bdc3c7";
        cellStyle[mxConstants.STYLE_CELL_HIGHLIGHT_DASHED] = false;
        cellStyle[mxConstants.STYLE_CELL_HIGHLIGHT_STROKE_WIDTH] = "2";
        cellStyle[mxConstants.STYLE_CELL_HIGHLIGHT_COLOR] = "var(--color-graph-cell-highlight)";
        graph.getStylesheet().putDefaultVertexStyle(cellStyle);

        var tableStyle = new Object();
        tableStyle[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_SWIMLANE;
        tableStyle[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
        tableStyle[mxConstants.STYLE_FILLCOLOR] = "var(--color-graph-table-indicator)";
        graph.getStylesheet().putCellStyle("table", tableStyle);

        var columnStyle = new Object();
        columnStyle[mxConstants.STYLE_FILLCOLOR] = "var(--color-graph-column-indicator)";
        graph.getStylesheet().putCellStyle("column", columnStyle);

        const toolbarBelt = document.createElement('div');
        toolbarBelt.classList.add('sd-toolbar-belt');
        this.container.appendChild(toolbarBelt);
        this.toolbar = new Toolbar(toolbarBelt, graph);

        this.toolbar.addButton(
            config.toolbar.addTable.icon,
            config.toolbar.addTable.title,
            () => {
                console.log('Add button clicked');
            },
            (graph, evt, cell) => {
                graph.stopEditing(false);
                var pt = graph.getPointForEvent(evt);
                var tableObject = new Table('newTable', 'dbo', [], pt.x, pt.y, config);
                tableObject.addColumn(new Column('id', 'int', true, false, false, true, true, null, config));
                tableObject.addColumn(new Column('name', 'text', true, true, false, false, false, null, config));
                this.renderTable(tableObject);
            }
        );

        this.toolbar.addDivider();

        this.toolbar.addButton(
            config.toolbar.undo.icon,
            config.toolbar.undo.title,
            () => {
                this.editor.execute('undo');
            }
        );

        this.toolbar.addButton(
            config.toolbar.redo.icon,
            config.toolbar.redo.title,
            () => {
                this.editor.execute('redo');
            }
        );

        this.toolbar.addDivider();

        this.toolbar.addButton(
            config.toolbar.zoomIn.icon,
            config.toolbar.zoomIn.title,
            () => {
                this.editor.execute('zoomIn');
            }
        );

        this.toolbar.addButton(
            config.toolbar.zoomOut.icon,
            config.toolbar.zoomOut.title,
            () => {
                this.editor.execute('zoomOut');
            }
        );

        this.toolbar.addDivider();

        this.toolbar.addButton(
            config.toolbar.delete.icon,
            config.toolbar.delete.title,
            () => {
                const cell = graph.getSelectionCell();
                if (cell != null) {
                    editor.execute('delete', cell);
                }
            }
        );


        // Creating the outline for the graph.
        const outlineContainer = document.createElement('div');
        outlineContainer.classList.add('sd-outline');
        this.container.appendChild(outlineContainer);
        mxConstants.OUTLINE_COLOR = 'var(--color-outline-color)';
        mxConstants.OUTLINE_STROKEWIDTH = 1;
        mxConstants.OUTLINE_HANDLE_FILLCOLOR = 'var(--color-outline-color)';
        mxConstants.OUTLINE_HANDLE_STROKECOLOR = 'var(--color-outline-color)';
        const outline = new mxOutline(graph, outlineContainer);
        outline.sizerSize = 5;
        outline.createSizer();
        outline.labelsVisible = true;
    }

    renderSchema(schema) {
        this.config.schema = schema;
    }

    renderTable(tableObject) {
        var parent = this.graph.getDefaultParent();
        var model = this.graph.getModel();
        var table = new mxCell(tableObject, new mxGeometry(0, 0, 260, 60), 'table');
        table.setVertex(true);
        model.beginUpdate();
        try {
            table.value = tableObject;
            table.geometry.x = tableObject.x;
            table.geometry.y = tableObject.y;
            this.graph.addCell(table, parent);
            table.geometry.alternateBounds = new mxRectangle(0, 0, table.geometry.width, table.geometry.height);

            for (let i = 0; i < tableObject.columns.length; i++) {
                var column = new mxCell(tableObject.columns[i], new mxGeometry(0, 0, 260, 28), 'column');
                column.value = tableObject.columns[i];
                column.setVertex(true);
                column.setConnectable(false);
                table.insert(column);
            }
        }
        finally {
            this.model.endUpdate();
        }
        this.graph.setSelectionCell(table);
    }

    configureStyleSheet() {

    }
}


class Table {
    constructor(name, schema, columns, x, y, config) {
        this.name = name;
        this.schema = schema;
        this.columns = columns;
        this.x = x;
        this.y = y;
        this.config = config;
    }

    addColumn(column) {
        this.columns.push(column);
    }

    removeColumn(column) {
        this.columns = this.columns.filter(c => c !== column);
    }

    render() {
        const parent = document.createElement('div');
        parent.classList.add('sd-table-parent');
        const indicator = document.createElement('div');
        indicator.classList.add('sd-table-indicator');
        parent.appendChild(indicator);
        const div = document.createElement('div');
        div.classList.add('sd-table');
        const icon = document.createElement('div');
        icon.classList.add('sd-table-icon');
        div.appendChild(icon);
        icon.style.backgroundImage = `url(${this.config.icons.table})`;
        const name = document.createElement('div');
        name.classList.add('sd-table-name');
        name.innerText = `${this.schema}.${this.name}`;
        div.appendChild(name);
        parent.appendChild(div);
        return parent;
    }
}

class Column {
    constructor(name, datatype, isPrimaryKey, isForeignKey, isNullable, isIdentity, isUnique, defaultValue, config) {
        this.name = name;
        this.datatype = datatype;
        this.isPrimaryKey = isPrimaryKey;
        this.isForeignKey = isForeignKey;
        this.isNullable = isNullable;
        this.isIdentity = isIdentity;
        this.isUnique = isUnique;
        this.defaultValue = defaultValue;
        this.config = config;
    }

    getConstraintText() {
        let constraints = [];
        if (this.isPrimaryKey) {
            constraints.push('PK');
        }
        if (this.isForeignKey) {
            constraints.push('FK');
        }
        // if (!this.isNullable) {
        //     constraints.push('NOT NULL');
        // }
        // if (this.isIdentity) {
        //     constraints.push('IDENTITY');
        // }
        // if (this.isUnique) {
        //     constraints.push('UNIQUE');
        // }
        return constraints.join(', ');
    }

    render() {
        const div = document.createElement('div');
        div.classList.add('sd-column');
        const icon = document.createElement('div');
        icon.classList.add('sd-column-icon');
        icon.style.backgroundImage = `url(${this.config.dataTypeIcon[this.datatype]})`;
        div.appendChild(icon);
        const name = document.createElement('div');
        name.classList.add('sd-column-name');
        name.innerText = this.name;
        div.appendChild(name);
        const constraints = document.createElement('div');
        constraints.classList.add('sd-column-constraints');
        constraints.innerText = this.getConstraintText();
        div.appendChild(constraints);
        return div;
    }
}

class Relationship {
    constructor(name, fromTable, fromSchema, fromColumn, toTable, toSchema, toColumn, relationshipType) {
        this.name = name;
        this.fromTable = fromTable;
        this.fromSchema = fromSchema;
        this.fromColumn = fromColumn;
        this.toTable = toTable;
        this.toSchema = toSchema;
        this.toColumn = toColumn;
        this.relationshipType = relationshipType;
    }
}


// Makes a toolbar at the bottom of the container
class Toolbar {
    /**
     * Creates a toolbar at the bottom of the container
     * @param {*} beltContainer 
     */
    constructor(beltContainer, graph) {
        this.belt = beltContainer;
        this.graph = graph;

        const toolbarDiv = document.createElement('div');
        this.belt.appendChild(toolbarDiv);
        toolbarDiv.classList.add('sd-toolbar');
        this.toolbarDiv = toolbarDiv;
    }

    addButton(icon, title, callback, onDragEndCallback) {
        const button = document.createElement('div');
        this.toolbarDiv.appendChild(button);
        button.classList.add('sd-toolbar-button');
        button.style.backgroundImage = `url(${icon})`;
        button.onclick = callback;
        button.title = title;

        if (onDragEndCallback) {
            var dragImage = button.cloneNode(true);
            dragImage.style.backgroundColor = 'var(--color-toolbar-bg)';
            var ds = mxUtils.makeDraggable(button, this.graph, onDragEndCallback, dragImage);
            ds.highlightDropTargets = true;
        }
    }

    addDivider() {
        const divider = document.createElement('div');
        this.toolbarDiv.appendChild(divider);
        divider.classList.add('sd-toolbar-divider');
    }
}