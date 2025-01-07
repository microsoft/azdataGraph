import React, { useEffect } from "react";
import * as azdataGraph from '../index';
const addTableIcon = require('./resources/addTable.svg');
const undoIcon = require('./resources/undo.svg');
const redoIcon = require('./resources/redo.svg');
const zoomInIcon = require('./resources/zoomIn.svg');
const zoomOutIcon = require('./resources/zoomOut.svg');
const deleteIcon = require('./resources/delete.svg');
const entityIcon = require('./resources/tableNode.svg');
const connectorIcon = require('./resources/connector.svg');
const exportIcon = require('./resources/export.svg');
const autoArrangeIcon = require('./resources/arrange.svg');
const intIcon = require('./resources/numberDataType.svg');
import { OnAction } from "../schemaDesigner/schemaDesignerInterfaces";
import './resources/schemaDesigner.css';

export const SchemaDesigner = () => {
    useEffect(() => {
        function renderGraph() {
            const div = document.getElementById("graphContainer");
            if (!div) {
                return;
            }
            div.innerHTML = "";
            const schemaDesigner = new azdataGraph.SchemaDesigner(div, {
                icons: {
                    addTableIcon: addTableIcon,
                    undoIcon: undoIcon,
                    redoIcon: redoIcon,
                    autoarrangeIcon: autoArrangeIcon,
                    connectorIcon: connectorIcon,
                    dataTypeIcons: {
                        int: intIcon
                    },
                    deleteIcon: deleteIcon,
                    entityIcon: entityIcon,
                    exportIcon: exportIcon,
                    zoomInIcon: zoomInIcon,
                    zoomOutIcon: zoomOutIcon
                },
                color: {
                    cellFillColor: "var(--color-graph-column-indicator)",
                    cellHighlightColor: "var(--color-graph-cell-highlight)",
                    edgeStrokeColor: "black",
                    validColor: "#2ecc71",
                    invalidColor: "#e74c3c",
                    toolbarBackgroundColor: "var(--color-toolbar-bg)",
                    outlineColor: "var(--color-graph-outline)"
                },
                graphFontFamily: "Segoe UI"
            });

            schemaDesigner.renderModel({
                entities: [
                    {
                        name: "New Table",
                        schema: "dbo",
                        columns: [
                            {
                                name: "Column1",
                                type: "int",
                                isPrimaryKey: true,
                                isIdentity: true,
                            },
                            {
                                name: "Column2",
                                type: "int",
                                isPrimaryKey: false,
                                isIdentity: false,
                            },
                            {
                                name: "Column2",
                                type: "int",
                                isPrimaryKey: false,
                                isIdentity: false,
                            },
                        ],
                    },
                    {
                        name: "New Table 2",
                        schema: "dbo",
                        columns: [
                            {
                                name: "Column1",
                                type: "int",
                                isPrimaryKey: true,
                                isIdentity: true,
                            },
                            {
                                name: "Column2",
                                type: "int",
                                isPrimaryKey: false,
                                isIdentity: false,
                            },
                            {
                                name: "Column2",
                                type: "int",
                                isPrimaryKey: false,
                                isIdentity: false,
                            },
                        ],
                    },
                    {
                        name: "New Table 3",
                        schema: "dbo",
                        columns: [
                            {
                                name: "Column1",
                                type: "int",
                                isPrimaryKey: true,
                                isIdentity: true,
                            },
                        ],
                    },
                    {
                        name: "New Table 4",
                        schema: "dbo",
                        columns: [
                            {
                                name: "Column1",
                                type: "int",
                                isPrimaryKey: true,
                                isIdentity: true,
                            },
                        ],
                    }
                ],
                relationships: [
                    {
                        foreignKeyName: "",
                        onDeleteAction: OnAction.NO_ACTION,
                        onUpdateAction: OnAction.NO_ACTION,
                        column: "Column1",
                        entity: "New Table 2",
                        referencedEntity: "New Table",
                        referencedColumn: "Column2",
                    },
                    {
                        foreignKeyName: "",
                        onDeleteAction: OnAction.NO_ACTION,
                        onUpdateAction: OnAction.NO_ACTION,
                        column: "Column1",
                        entity: "New Table 4",
                        referencedEntity: "New Table 3",
                        referencedColumn: "Column1",
                    }
                ],
            }, true);
        }
        renderGraph();
    }, []);

    return (
        <div className="background">
            <div id="graphContainer" className="graphContainer"></div>
        </div>
    );
}