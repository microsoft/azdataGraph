
/**
 * Interface for the entity
 */
interface Entity {
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

interface Column {
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

interface Relationship {
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