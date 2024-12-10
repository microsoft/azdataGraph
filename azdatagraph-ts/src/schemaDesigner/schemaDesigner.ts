import mx from '../mxgraph';

export class SchemaDesigner {
    constructor(container: HTMLElement) {
        const editor = new mx.mxEditor();
        editor.setGraphContainer(container);
        const graph = editor.graph;
        graph.insertVertex(graph.getDefaultParent(), null, 'Hello, World!', 20, 20, 80, 30);
    }
}