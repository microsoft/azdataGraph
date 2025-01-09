export interface ISchema {
    entities: IEntity[];
    relationships: IRelationship[];
}


export interface IEntity {
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
    columns: IColumn[];
}

export interface IColumn {
    /**
     * Name of the column
     */
    name: string;
    /**
     * Data type of the column
     */
    dataType: string;
    /**
     * Is the column primary key
     */
    isPrimaryKey: boolean;
    /**
     * Is the column identity
     */
    isIdentity: boolean;
}

export interface IRelationship {
    /**
     * Name of the relationship
     */
    foreignKeyName: string;
    /**
     * Parent entity of the relationship
     */
    entity: string;
    /**
     * Parent column of the relationship
     */
    column: string;
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

export enum OnAction {
    CASCADE = "0",
    NO_ACTION = "1",
    SET_NULL = "2",
    SET_DEFAULT = "3"
}


export interface SchemaDesignerConfig {
    icons: {
        addTableIcon: string;
        undoIcon: string;
        redoIcon: string;
        zoomInIcon: string;
        zoomOutIcon: string;
        deleteIcon: string;
        entityIcon: string;
        dataTypeIcons: { [key: string]: string };
        connectorIcon: string;
        exportIcon: string;
        autoarrangeIcon: string;
    }
    color: {
        cellFillColor: string;
        cellHighlightColor: string;
        edgeStrokeColor: string;
        outlineColor: string;
        toolbarBackgroundColor: string;
        validColor: string;
        invalidColor: string;
    }
    graphFontFamily: string;
    isEditable: boolean;
}