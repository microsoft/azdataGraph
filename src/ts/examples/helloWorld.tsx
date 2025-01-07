import { useEffect } from "react";
import * as azdataGraph from '../index';
import React from "react";

export function HelloWorld() {
    useEffect(() => {
        function renderGraph() {
            const div = document.getElementById("graphContainer");
            if (!div) {
                return;
            }
            div.innerHTML = "";
            const mxClient = azdataGraph.mx();
            const mxGraph = new mxClient.mxGraph(
                document.getElementById("graphContainer")!
            );
            const parent = mxGraph.getDefaultParent();
            mxGraph.getModel().beginUpdate();
            try {
                const v1 = mxGraph.insertVertex(
                    parent,
                    null,
                    "Hello",
                    20,
                    20,
                    80,
                    30
                );
                const v2 = mxGraph.insertVertex(
                    parent,
                    null,
                    "World",
                    200,
                    150,
                    80,
                    30
                );
                mxGraph.insertEdge(parent, null, "", v1, v2);
            } finally {
                mxGraph.getModel().endUpdate();
            }
        }
        renderGraph()
    }, [])
    return (
        <div id="graphContainer" className="graphContainer"></div>
    );
}