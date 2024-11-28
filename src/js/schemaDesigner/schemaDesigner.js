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
        const graph = editor.graph;
        const model = graph.model;
        this.editor = editor;
        this.graph = graph;
        this.model = model;
        editor.setGraphContainer(graphContainer);
        graph.enablePanning = true;
        graph.panningHandler.useLeftButtonForPanning = true;

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
                console.log('Delete button clicked');
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
    }

    renderSchema(schema) {
        this.config.schema = schema;
    }
}


class Table {
    constructor(name, schema, columns, relationships) {
        this.name = name;
        this.schema = schema;
        this.columns = columns;
    }

    addColumn(column) {
        this.columns.push(column);
    }

    removeColumn(column) {
        this.columns = this.columns.filter(c => c !== column);
    }
}

class Column {
    constructor(name, datatype, isPrimaryKey, isForeignKey, isNullable, isIdentity, isUnique, defaultValue) {
        this.name = name;
        this.datatype = datatype;
        this.isPrimaryKey = isPrimaryKey;
        this.isForeignKey = isForeignKey;
        this.isNullable = isNullable;
        this.isIdentity = isIdentity;
        this.isUnique = isUnique;
        this.defaultValue = defaultValue;
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