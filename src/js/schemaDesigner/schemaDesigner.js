/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

class SchemaDesigner {
  tableCellMap = new Map();
  relationshipEdgeMap = new Map();

  constructor(container, config) {
    // Must be disabled to compute positions inside the DOM tree of the cell label.
    mxGraphView.prototype.optimizeVmlReflows = false;
    mxConnectionHandler.prototype.movePreviewAway = false;
    // Disables foreignObjects
    mxClient.NO_FO = true;

    // Enables move preview in HTML to appear on top
    mxGraphHandler.prototype.htmlPreview = true;

    // Enables connect icons to appear on top of HTML
    mxConnectionHandler.prototype.moveIconFront = true;

    // Defines an icon for creating new connections in the connection handler.
    // This will automatically disable the highlighting of the source vertex.
    mxConnectionHandler.prototype.connectImage = new mxImage(
      config.icons.connector,
      24,
      24
    );

    // Disables the context menu
    mxEvent.disableContextMenu(container);

    mxConnectionHandler.prototype.getTargetPerimeterPoint = function (
      state,
      me
    ) {
      // Determines the y-coordinate of the target perimeter point
      // by using the currentRowNode assigned in updateRow
      var y = me.getY();
      if (this.currentRowNode != null) {
        y = getRowY(state, this.currentRowNode);
      }

      // Checks on which side of the terminal to leave
      var x = state.x;

      if (this.previous.getCenterX() > state.getCenterX()) {
        x += state.width;
      }

      return new mxPoint(x, y);
    };

    // Overrides source perimeter point for connection previews
    mxConnectionHandler.prototype.getSourcePerimeterPoint = function (
      state,
      next,
      me
    ) {
      var y = me.getY();
      if (this.sourceRowNode != null) {
        y = getRowY(state, this.sourceRowNode);
      }

      // Checks on which side of the terminal to leave
      var x = state.x;

      if (next.x > state.getCenterX()) {
        x += state.width;
      }

      return new mxPoint(x, y);
    };

    // Disables connections to invalid rows
    mxConnectionHandler.prototype.isValidTarget = function (cell) {
      return this.currentRowNode != null;
    };

    this.container = container;
    this.config = config;

    const graphContainer = document.createElement("div");
    graphContainer.classList.add("sd-graph");

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
      if (cell?.value?.render != null) {
        return cell.value.render();
      }
      {
        return document.createElement("div");
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
      return !this.model.isEdge(cell);
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
    cellStyle[mxConstants.STYLE_FONTFAMILY] = "var(--graph-font-family)";
    cellStyle[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
    cellStyle[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
    cellStyle[mxConstants.STYLE_FILLCOLOR] = "#bdc3c7";
    cellStyle[mxConstants.STYLE_CELL_HIGHLIGHT_DASHED] = false;
    cellStyle[mxConstants.STYLE_CELL_HIGHLIGHT_STROKE_WIDTH] = "2";
    cellStyle[mxConstants.STYLE_CELL_HIGHLIGHT_COLOR] =
      "var(--color-graph-cell-highlight)";
    graph.getStylesheet().putDefaultVertexStyle(cellStyle);

    var tableStyle = new Object();
    tableStyle[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_SWIMLANE;
    tableStyle[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
    tableStyle[mxConstants.STYLE_FILLCOLOR] =
      "var(--color-graph-column-indicator)";
    graph.getStylesheet().putCellStyle("table", tableStyle);

    var columnStyle = new Object();
    columnStyle[mxConstants.STYLE_FILLCOLOR] =
      "var(--color-graph-column-indicator)";
    graph.getStylesheet().putCellStyle("column", columnStyle);

    graph.stylesheet.getDefaultEdgeStyle()[mxConstants.STYLE_EDGE] =
      mxEdgeStyle.EntityRelation;
    graph.stylesheet.getDefaultEdgeStyle()[mxConstants.STYLE_STROKECOLOR] =
      "black";
    graph.stylesheet.getDefaultEdgeStyle()[mxConstants.STYLE_FONTCOLOR] =
      "black";
    graph.stylesheet.getDefaultEdgeStyle()[
      mxConstants.STYLE_CELL_HIGHLIGHT_COLOR
    ] = "var(--color-graph-cell-highlight)";

    graph.setConnectable(true);
    graph.setPanning(true);
    graph.centerZoom = false;
    graph.setAllowDanglingEdges(false);
    graph.setCellsDisconnectable(false);

    const toolbarBelt = document.createElement("div");
    toolbarBelt.classList.add("sd-toolbar-belt");
    this.container.appendChild(toolbarBelt);
    this.toolbar = new Toolbar(toolbarBelt, graph);

    this.toolbar.addButton(
      config.toolbar.addTable.icon,
      config.toolbar.addTable.title,
      () => {
        console.log("Add button clicked");
      },
      (graph, evt, cell) => {
        graph.stopEditing(false);
        var pt = graph.getPointForEvent(evt);
        var tableObject = new Table("newTable", "dbo", [], pt.x, pt.y, config);
        tableObject.addColumn(
          new Column("id", "int", true, false, false, true, true, null, config)
        );
        tableObject.addColumn(
          new Column(
            "name",
            "text",
            true,
            true,
            false,
            false,
            false,
            null,
            config
          )
        );
        tableObject.addColumn(
          new Column(
            "name",
            "text",
            true,
            true,
            false,
            false,
            false,
            null,
            config
          )
        );
        tableObject.addColumn(
          new Column(
            "name",
            "text",
            true,
            true,
            false,
            false,
            false,
            null,
            config
          )
        );
        tableObject.addColumn(
          new Column(
            "name",
            "text",
            true,
            true,
            false,
            false,
            false,
            null,
            config
          )
        );
        tableObject.addColumn(
          new Column(
            "name",
            "text",
            true,
            true,
            false,
            false,
            false,
            null,
            config
          )
        );
        tableObject.addColumn(
          new Column(
            "name",
            "text",
            true,
            true,
            false,
            false,
            false,
            null,
            config
          )
        );
        tableObject.addColumn(
          new Column(
            "name",
            "text",
            true,
            true,
            false,
            false,
            false,
            null,
            config
          )
        );
        tableObject.addColumn(
          new Column(
            "name",
            "text",
            true,
            true,
            false,
            false,
            false,
            null,
            config
          )
        );
        tableObject.addColumn(
          new Column(
            "name",
            "text",
            true,
            true,
            false,
            false,
            false,
            null,
            config
          )
        );
        tableObject.addColumn(
          new Column(
            "name",
            "text",
            true,
            true,
            false,
            false,
            false,
            null,
            config
          )
        );
        tableObject.addColumn(
          new Column(
            "name",
            "text",
            true,
            true,
            false,
            false,
            false,
            null,
            config
          )
        );
        tableObject.addColumn(
          new Column(
            "name",
            "text",
            true,
            true,
            false,
            false,
            false,
            null,
            config
          )
        );
        tableObject.addColumn(
          new Column(
            "name",
            "text",
            true,
            true,
            false,
            false,
            false,
            null,
            config
          )
        );
        tableObject.addColumn(
          new Column(
            "name",
            "text",
            true,
            true,
            false,
            false,
            false,
            null,
            config
          )
        );
        tableObject.addColumn(
          new Column(
            "name",
            "text",
            true,
            true,
            false,
            false,
            false,
            null,
            config
          )
        );
        tableObject.addColumn(
          new Column(
            "name",
            "text",
            true,
            true,
            false,
            false,
            false,
            null,
            config
          )
        );
        tableObject.addColumn(
          new Column(
            "name",
            "text",
            true,
            true,
            false,
            false,
            false,
            null,
            config
          )
        );
        tableObject.addColumn(
          new Column(
            "name",
            "text",
            true,
            true,
            false,
            false,
            false,
            null,
            config
          )
        );

        this.renderTable(tableObject);
      }
    );

    this.toolbar.addDivider();

    this.toolbar.addButton(
      config.toolbar.undo.icon,
      config.toolbar.undo.title,
      () => {
        this.editor.execute("undo");
      }
    );

    this.toolbar.addButton(
      config.toolbar.redo.icon,
      config.toolbar.redo.title,
      () => {
        this.editor.execute("redo");
      }
    );

    this.toolbar.addDivider();

    this.toolbar.addButton(
      config.toolbar.zoomIn.icon,
      config.toolbar.zoomIn.title,
      () => {
        this.editor.execute("zoomIn");
        this.redrawEdges();
      }
    );

    this.toolbar.addButton(
      config.toolbar.zoomOut.icon,
      config.toolbar.zoomOut.title,
      () => {
        this.editor.execute("zoomOut");
        this.redrawEdges();
      }
    );

    this.toolbar.addDivider();

    this.toolbar.addButton(
      config.toolbar.delete.icon,
      config.toolbar.delete.title,
      () => {
        const cell = graph.getSelectionCell();
        if (cell != null) {
          editor.execute("delete", cell);
        }
      }
    );

    // Creating the outline for the graph.
    const outlineContainer = document.createElement("div");
    outlineContainer.classList.add("sd-outline");
    this.container.appendChild(outlineContainer);
    mxConstants.OUTLINE_COLOR = "var(--color-outline-color)";
    mxConstants.OUTLINE_STROKEWIDTH = 1;
    mxConstants.OUTLINE_HANDLE_FILLCOLOR = "var(--color-outline-color)";
    mxConstants.OUTLINE_HANDLE_STROKECOLOR = "var(--color-outline-color)";
    const outline = new mxOutline(graph, outlineContainer);
    outline.sizerSize = 5;
    outline.createSizer();
    outline.labelsVisible = true;

    // Enables HTML markup in all labels
    graph.setHtmlLabels(true);

    var oldRedrawLabel = graph.cellRenderer.redrawLabel;
    graph.cellRenderer.redrawLabel = function (state) {
      oldRedrawLabel.apply(this, arguments); // "supercall"
      var graph = state.view.graph;
      var model = graph.model;

      if (model.isVertex(state.cell) && state.text != null) {
        // Scrollbars are on the div
        var div = state.text.node.getElementsByClassName("sd-table-columns")[0];
        if (div != null) {
          // Installs the handler for updating connected edges
          if (div.scrollHandler == null) {
            div.scrollHandler = true;

            var updateEdges = mxUtils.bind(this, function () {
              graph.clearSelection();
              var edgeCount = model.getEdgeCount(state.cell);
              // Only updates edges to avoid update in DOM order
              // for text label which would reset the scrollbar
              for (var i = 0; i < edgeCount; i++) {
                var edge = model.getEdgeAt(state.cell, i);
                graph.view.invalidate(edge, true, false);
                graph.view.validate(edge);
              }
            });

            mxEvent.addListener(div, "scroll", updateEdges);
            mxEvent.addListener(div, "mouseup", updateEdges);
          }
        }
      }
    };

    // Adds a new function to update the currentRow based on the given event
    // and return the DOM node for that row
    graph.connectionHandler.updateRow = function (target) {
      while (
        target != null &&
        target.className.includes != null &&
        target?.className?.includes("sd-table-column-")
      ) {
        target = target.parentNode;
      }

      this.currentRow = null;

      // Checks if we're dealing with a row in the correct table
      if (target != null && target.className == "sd-table-column") {
        // Stores the current row number in a property so that it can
        // be retrieved to create the preview and final edge
        var rowNumber = 0;
        var current = target.parentNode.firstChild;

        while (target != current && current != null) {
          current = current.nextSibling;
          rowNumber++;
        }

        this.currentRow = rowNumber + 1;
      } else {
        target = null;
      }

      return target;
    };

    // Adds placement of the connect icon based on the mouse event target (row)
    graph.connectionHandler.updateIcons = function (state, icons, me) {
      var target = me.getSource();
      target = this.updateRow(target);

      if (target != null && this.currentRow != null) {
        var div = target.parentNode;
        var s = state.view.scale;

        icons[0].node.style.visibility = "visible";
        icons[0].bounds.width = s * 24;
        icons[0].bounds.height = s * 24;
        icons[0].bounds.x = state.x + target.offsetWidth * s;
        icons[0].bounds.y =
          state.y +
          target.offsetTop * s +
          (target.offsetHeight * s) / 2 -
          icons[0].bounds.height / 1.2; // 1.2 makes the icon completely centered to the target row. Ideally it should be 2 but it is not working as expected.
        icons[0].redraw();
        this.currentRowNode = target;
      } else {
        icons[0].node.style.visibility = "hidden";
      }
    };

    graph.connectionHandler.factoryMethod = null;

    // Updates the targetRow in the preview edge State
    var oldMouseMove = graph.connectionHandler.mouseMove;
    graph.connectionHandler.mouseMove = function (sender, me) {
      if (this.edgeState != null) {
        this.currentRowNode = this.updateRow(me.getSource());
        if (this.currentRow != null) {
          this.edgeState.cell.value.targetRow = this.currentRow;
        } else {
          this.edgeState.cell.value.targetRow = 0;
        }

        // Destroys icon to prevent event redirection via image in IE
        this.destroyIcons();
      }

      oldMouseMove.apply(this, arguments);
    };

    // Creates the edge state that may be used for preview
    graph.connectionHandler.createEdgeState = function (me) {
      var relation = {};
      relation.sourceRow = this.currentRow || 0;
      relation.targetRow = 0;

      var edge = this.createEdge(relation);
      var style = this.graph.getCellStyle(edge);
      var state = new mxCellState(this.graph.view, edge, style);
      // Stores the source row in the handler
      this.sourceRowNode = this.currentRowNode;

      return state;
    };

    if (config.schema) {
      this.renderSchema(config.schema);
    }
  }

  renderSchema(schema) {
    this.config.schema = schema;
    this.config.schema.tables.forEach((table) => {
      this.renderTable(table);
    });
    this.config.schema.relationships.forEach((relationship) => {
      this.renderRelationship(relationship);
    });
  }

  renderTable(tableObject) {
    var parent = this.graph.getDefaultParent();
    var model = this.graph.getModel();
    var table = new mxCell(
      tableObject,
      new mxGeometry(
        0,
        0,
        260,
        Math.min(330, 50 + tableObject.columns.length * 30),
        "table"
      )
    );
    table.setVertex(true);
    model.beginUpdate();
    try {
      table.value = tableObject;
      table.geometry.x = tableObject.x;
      table.geometry.y = tableObject.y;
      // table.geometry.alternateBounds = new mxRectangle(0, 0, table.geometry.width, table.geometry.height);
      this.graph.addCell(table, parent);
    } finally {
      this.model.endUpdate();
    }
    this.graph.setSelectionCell(table);
    this.tableCellMap.set(tableObject.name, table);
  }

  renderRelationship(relationship) {
    const sourceTable = this.tableCellMap.get(relationship.fromTable);
    const targetTable = this.tableCellMap.get(relationship.toTable);
    if (!sourceTable || !targetTable) {
      return;
    }
    const parent = this.graph.getDefaultParent();
    const sourceRowNumber = sourceTable.value.columns.findIndex(
      (c) => c.name === relationship.sourceRowName
    );
    const targetRowNumber = targetTable.value.columns.findIndex(
      (c) => c.name === relationship.targetRowName
    );
    relationship.sourceRow = sourceRowNumber + 1;
    relationship.targetRow = targetRowNumber + 1;
    this.graph.insertEdge(parent, null, relationship, sourceTable, targetTable);
  }

  configureStyleSheet() {}

  redrawEdges() {
    const cells = this.model.getChildCells(this.graph.getDefaultParent());
    for (var i = 0; i < cells.length; i++) {
      if (!cells[i].edge) {
        continue;
      }
      var edge = cells[i];
      this.graph.view.invalidate(edge, true, false);
      this.graph.view.validate(edge);
    }
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
    this.columns = this.columns.filter((c) => c !== column);
  }

  render() {
    console.log("rendering table");
    const parent = document.createElement("div");
    parent.classList.add("sd-table");
    const colorIndicator = document.createElement("div");
    colorIndicator.classList.add("sd-table-color-indicator");
    parent.appendChild(colorIndicator);
    const header = document.createElement("div");
    header.classList.add("sd-table-header");
    const headerIcon = document.createElement("div");
    headerIcon.classList.add("sd-table-header-icon");
    headerIcon.style.backgroundImage = `url(${this.config.icons.table})`;
    header.appendChild(headerIcon);
    const headerText = document.createElement("div");
    headerText.classList.add("sd-table-header-text");
    headerText.innerText = `${this.schema}.${this.name}`;
    header.appendChild(headerText);
    parent.appendChild(header);

    const columns = document.createElement("div");
    columns.classList.add("sd-table-columns");
    this.columns.forEach((column) => {
      const columnDiv = document.createElement("div");
      columnDiv.classList.add("sd-table-column");
      const columnIcon = document.createElement("div");
      columnIcon.classList.add("sd-table-column-icon");
      columnIcon.style.backgroundImage = `url(${
        this.config.dataTypeIcon[column.datatype]
      })`;
      columnDiv.appendChild(columnIcon);
      const columnText = document.createElement("div");
      columnText.classList.add("sd-table-column-text");
      columnText.innerText = column.name;
      columnDiv.appendChild(columnText);
      const columnConstraints = document.createElement("div");
      columnConstraints.classList.add("sd-table-column-constraints");
      columnConstraints.innerText = column.getConstraintText();
      columnDiv.appendChild(columnConstraints);
      columns.appendChild(columnDiv);
    });
    parent.appendChild(columns);
    this.div = parent;
    return parent;
  }
}

class Column {
  constructor(
    name,
    datatype,
    isPrimaryKey,
    isForeignKey,
    isNullable,
    isIdentity,
    isUnique,
    defaultValue,
    config
  ) {
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
      constraints.push("PK");
    }
    if (this.isForeignKey) {
      constraints.push("FK");
    }
    return constraints.join(", ");
  }
}

class Relationship {
  constructor(fromTable, toTable, sourceRowName, targetRowName, config) {
    this.fromTable = fromTable;
    this.toTable = toTable;
    this.sourceRowName = sourceRowName;
    this.targetRowName = targetRowName;
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

    const toolbarDiv = document.createElement("div");
    this.belt.appendChild(toolbarDiv);
    toolbarDiv.classList.add("sd-toolbar");
    this.toolbarDiv = toolbarDiv;
  }

  addButton(icon, title, callback, onDragEndCallback) {
    const button = document.createElement("div");
    this.toolbarDiv.appendChild(button);
    button.classList.add("sd-toolbar-button");
    button.style.backgroundImage = `url(${icon})`;
    button.onclick = callback;
    button.title = title;

    if (onDragEndCallback) {
      var dragImage = button.cloneNode(true);
      dragImage.style.backgroundColor = "var(--color-toolbar-bg)";
      var ds = mxUtils.makeDraggable(
        button,
        this.graph,
        onDragEndCallback,
        dragImage
      );
      ds.highlightDropTargets = true;
    }
  }

  addDivider() {
    const divider = document.createElement("div");
    this.toolbarDiv.appendChild(divider);
    divider.classList.add("sd-toolbar-divider");
  }
}

mxGraphView.prototype.updateFloatingTerminalPoint = function (
  edge,
  start,
  end,
  source
) {
  var next = this.getNextPoint(edge, end, source);

  if (start?.text?.node == undefined) {
    return;
  }

  var div = start.text.node.getElementsByClassName("sd-table-columns")[0];

  var x = start.x;
  var y = start.getCenterY();

  // Checks on which side of the terminal to leave
  if (next.x > x + start.width / 2) {
    x += start.width;
  }

  if (div != null) {
    y = start.getCenterY() - div.scrollTop;
    if (
      edge.cell.value != undefined &&
      !this.graph.isCellCollapsed(start.cell)
    ) {
      var attr = source ? "sourceRow" : "targetRow";
      var row = parseInt(edge.cell.value[attr]);
      // HTML labels contain an outer table which is built-in
      // var table = div.getElementsByTagName('table')[0];
      // var trs = table.getElementsByTagName('tr');

      const columns = div.getElementsByClassName("sd-table-column");
      var column = columns[Math.min(columns.length - 1, row - 1)];
      // Gets vertical center of source or target row
      if (column != null) {
        y = getRowY(start, column);
      }
    }

    // Updates the vertical position of the nearest point if we're not
    // dealing with a connection preview, in which case either the
    // edgeState or the absolutePoints are null
    if (edge != null && edge.absolutePoints != null) {
      next.y = y;
    }
  }

  edge.setAbsoluteTerminalPoint(new mxPoint(x, y), source);

  // Routes multiple incoming edges along common waypoints if
  // the edges have a common target row
  if (source && edge.cell.value != undefined && start != null && end != null) {
    var edges = this.graph.getEdgesBetween(start.cell, end.cell, true);
    var tmp = [];

    // Filters the edges with the same source row
    var row = edge.cell.value["targetRow"];

    for (var i = 0; i < edges.length; i++) {
      if (
        mxUtils.isNode(edges[i].value) &&
        edges[i].value["targetRow"] == row
      ) {
        tmp.push(edges[i]);
      }
    }

    edges = tmp;

    if (edges.length > 1 && edge.cell == edges[edges.length - 1]) {
      // Finds the vertical center
      var states = [];
      var y = 0;

      for (var i = 0; i < edges.length; i++) {
        states[i] = this.getState(edges[i]);
        y += states[i].absolutePoints[0].y;
      }

      y /= edges.length;

      for (var i = 0; i < states.length; i++) {
        var x = states[i].absolutePoints[1].x;

        if (states[i].absolutePoints.length < 5) {
          states[i].absolutePoints.splice(2, 0, new mxPoint(x, y));
        } else {
          states[i].absolutePoints[2] = new mxPoint(x, y);
        }

        // Must redraw the previous edges with the changed point
        if (i < states.length - 1) {
          this.graph.cellRenderer.redraw(states[i]);
        }
      }
    }
  }
};

var getRowY = function (state, column) {
  var s = state.view.scale;
  var div = column.parentNode;
  var y = state.y + (column.offsetTop - div.scrollTop + 5) * s; // 5 is the magic number to make the line completely centered to the row.
  if (div.scrollTop > column.offsetTop) {
    y = state.y + (div.offsetTop - 15) * s;
  }

  if (y > state.y + div.offsetTop * s + div.clientHeight * s) {
    y = state.y + (div.offsetTop + div.clientHeight - 5) * s;
  }
  return y;
};
