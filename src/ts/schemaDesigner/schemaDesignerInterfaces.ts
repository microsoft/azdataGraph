/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA.See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------*/

export interface Entity {
    /**
     * Name of the entity
     */
    name: string;
    /**
     * Schema of the entity
     */
    schema: string;
    /**
     * Columns of the entity
     */
    columns: Column[];
}

export interface Column {
    /**
     * Name of the column
     */
    name: string;
    /**
     * Data type of the column
     */
    type: string;
    /**
     * Is the column primary key
     */
    isPrimaryKey: boolean;
    /**
     * Is the column identity
     */
    isIdentity: boolean;
}

export interface Relationship {
    /**
     * Name of the relationship
     */
    foreignKeyName: string;
    /**
     * Parent entity of the relationship
     */
    parentEntity: string;
    /**
     * Parent column of the relationship
     */
    parentColumn: string;
    /**
     * Referenced entity of the relationship
     */
    referencedEntity: string;
    /**
     * Referenced column of the relationship
     */
    referencedColumn: string;
    /**
     * On delete action of the relationship
     */
    onDeleteAction: OnAction;
    /**
     * On update action of the relationship
     */
    onUpdateAction: OnAction;
}

enum OnAction {
    CASCADE = "0",
    NO_ACTION = "1",
    SET_NULL = "2",
    SET_DEFAULT = "3"
}


export interface SchemaDesignerConfig {
    graphFontFamily: string;
    cellFillColor: string;
    cellHighlightColor: string;
    edgeStrokeColor: string;
    outlineColor: string;
    toolbarBackgroundColor: string;
    addTableIcon: string;
    undoIcon: string;
    redoIcon: string;
    zoomInIcon: string;
    zoomOutIcon: string;
    deleteIcon: string;
    entityIcon: string;
    dataTypeIcons: { [key: string]: string };
    connectorIcon: string;
    validColor: string;
    invalidColor: string;
}