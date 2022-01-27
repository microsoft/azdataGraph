/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Class: azdataGraph
 * 
 * Constructor: azdataGraph
 * 
 * Constructs a new azdataGraph in the specified container. Model is an optional
 * mxGraphModel. If no model is provided, a new mxGraphModel instance is 
 * used as the model. The container must have a valid owner document prior 
 * to calling this function in Internet Explorer. RenderHint is a string to
 * affect the display performance and rendering in IE, but not in SVG-based 
 * browsers. The parameter is mapped to <dialect>, which may 
 * be one of <mxConstants.DIALECT_SVG> for SVG-based browsers, 
 * <mxConstants.DIALECT_STRICTHTML> for fastest display mode,
 * <mxConstants.DIALECT_PREFERHTML> for faster display mode,
 * <mxConstants.DIALECT_MIXEDHTML> for fast and <mxConstants.DIALECT_VML> 
 * for exact display mode (slowest). The dialects are defined in mxConstants.
 * The default values are DIALECT_SVG for SVG-based browsers and
 * DIALECT_MIXED for IE.
 *
 * Example:
 * 
 * To create a graph inside a DOM node with an id of graph:
 * (code)
 * var container = document.getElementById('graph');
 * var graph = new azdataGraph(container);
 * (end)
 * 
 * Parameters:
 * 
 * container - Optional DOM node that acts as a container for the graph.
 * If this is null then the container can be initialized later using
 * <init>.
 * model - Optional <mxGraphModel> that constitutes the graph data.
 * renderHint - Optional string that specifies the display accuracy and
 * performance. Default is mxConstants.DIALECT_MIXEDHTML (for IE).
 * stylesheet - Optional <mxStylesheet> to be used in the graph.
 */
function azdataGraph(container, model, renderHint, styleSheet) {
    mxGraph.call(this, container, model, renderHint, styleSheet);
}

azdataGraph.prototype = Object.create(mxGraph.prototype);
azdataGraph.prototype.constructor = azdataGraph;

/**
 * Function: insertInvertedEdge
 * 
 * Adds a new edge into the given parent <mxCell> using value as the user
 * object and the given source and target as the terminals of the new edge.
 * The id and style are used for the respective properties of the new
 * <mxCell>, which is returned.
 *
 * Parameters:
 * 
 * parent - <mxCell> that specifies the parent of the new edge.
 * id - Optional string that defines the Id of the new edge.
 * value - JavaScript object to be used as the user object.
 * source - <mxCell> that defines the source of the edge.
 * target - <mxCell> that defines the target of the edge.
 * style - Optional string that defines the cell style.
 */
azdataGraph.prototype.insertInvertedEdge = function (parent, id, value, source, target, style) {
    var terminalStyle = 'startArrow=classic;endArrow=none;';
    var edge = this.createEdge(parent, id, value, source, target, terminalStyle + style);

    return this.addEdge(edge, parent, source, target);
};

/**
 * Function: insertWeightedInvertedEdge
 * 
 * Adds a new edge into the given parent <mxCell> using value as the user
 * object and the given source and target as the terminals of the new edge.
 * The id and style are used for the respective properties of the new
 * <mxCell>, which is returned.
 *
 * Parameters:
 * 
 * parent - <mxCell> that specifies the parent of the new edge.
 * id - Optional string that defines the Id of the new edge.
 * value - JavaScript object to be used as the user object.
 * source - <mxCell> that defines the source of the edge.
 * target - <mxCell> that defines the target of the edge.
 * style - Optional string that defines the cell style.
 */
azdataGraph.prototype.insertWeightedInvertedEdge = function (parent, id, value, source, target, style) {
    let edgeWeight = '';

    // TDDO lewissanchez - this will eventually be based on the data size for all rows.
    let randValue = Math.floor(Math.random() * 3)
    switch (randValue) {
        case 0:
            edgeWeight = 'strokeWidth=1;';
            break;
        case 1:
            edgeWeight = 'strokeWidth=1.75;';
            break;
        case 2:
            edgeWeight = 'strokeWidth=2.5;';
            break;
    }

    return this.insertInvertedEdge(parent, id, value, source, target, edgeWeight + style);
};

/**
 * Function: getStyledTooltipForCell
 * 
 * Returns a string to be used as the tooltip for the given cell. The
 * string contains HTML and styles that will resemble tooltips found in
 * SSMS.
 * 
 * Parameters:
 * cell - <mxCell> that specifies the cell the retrieved tooltip is for.
 */
azdataGraph.prototype.getStyledTooltipForCell = function (cell) {
    const tooltipWidth = cell.edge ? 'width: 25em;' : 'width: 45em;';
    const justifyContent = 'display: flex; justify-content: space-between;';
    const boldText = 'font-weight: bold;';
    const tooltipLineHeight = 'padding-top: .13em; line-height: .5em;';
    const centerText = 'text-align: center;';
    const headerBottomMargin = 'margin-bottom: 1.5em;';
    const footerTopMargin = 'margin-top: 1.5em;';

    if (cell.value != null && cell.value.metrics != null) {
        var tooltip = `<div style=\"${tooltipWidth}\">`;

        // tooltip heading for vertices only
        if (!cell.edge) {
            tooltip += `<div style=\"${centerText}\"><span style=\"${boldText}\">${cell.value.label}</span></div>`;
            tooltip += `<div style=\"${headerBottomMargin}\"><span>[Description of operation here]</span></div>`;
        }

        // tooltip body
        let startIndex = cell.edge ? 0 : 1; // first index for vertices contains footer label, so we can skip for vertices.
        for (var i = startIndex; i < cell.value.metrics.length; ++i) {
            tooltip += `<div style=\"${tooltipLineHeight}\">`;

            tooltip += `<div style=\"${justifyContent}\">`;
            tooltip += `<span style=\"${boldText}\">${cell.value.metrics[i].name}</span>`;
            tooltip += `<span>${cell.value.metrics[i].value}</span>`;
            tooltip += '</div>';

            if (i < cell.value.metrics.length - 1) {
                tooltip += `<hr />`;
            }

            tooltip += `</div>`
        }

        // tooltip footer for vertices only
        if (!cell.edge) {
            tooltip += '<hr />';
            tooltip += `<div style=\"${footerTopMargin}\"><span style=\"${boldText}\">${cell.value.metrics[0].name}</span></div>`;
            tooltip += `<div><span>${cell.value.metrics[0].value}</span></div>`;
            tooltip += `<div><span style=\"${boldText}\">Warnings</span></div>`;
            tooltip += '<div><span>No join predicate</span></div>';

        }

        tooltip += '</div>';

        return tooltip;
    }

    return azdataGraph.prototype.getTooltipForCell.apply(this, arguments); // "supercall"
}

/**
 * Function: graphClickEventHandler
 * 
 * Handles graph click events for edges and vertices.
 * 
 * (code)
 * graph.addListener(mxEvent.CLICK, azdataGraph.prototype.graphClickEventHandler);
 * (end)
 * 
 * Parameter:
 * 
 * sender - Optional sender argument. Default is this.
 * event - The click caught by the graph listener.
 */
azdataGraph.prototype.graphClickEventHandler = function (sender, event) {
    let selectedCell = event.getProperty('cell');
    if (selectedCell && selectedCell.edge) {
        console.log(`Edge clicked: ${selectedCell}`); // replace with desired behavior

        event.consume();
    }
    else if (selectedCell && selectedCell.vertex) {
        console.log(`Vertex clicked: ${selectedCell}`); // replace with desired behavior

        event.consume();
    }
}

/**
 * Function: addZoomInListener
 * 
 * Adds the zoom in listener to the given element
 * 
 * Parameter:
 * 
 * element - The element to add the listener to.
 */
azdataGraph.prototype.addZoomInListener = function (element) {
    let self = this;
    mxEvent.addListener(element, 'click', (e) => {
        azdataGraph.prototype.zoomIn.apply(self);
        mxEvent.consume(e);
    });
}

/**
 * Function: addZoomOutListener
 * 
 * Adds the zoom out listener to the given element
 * 
 * Parameter
 * 
 * element - The element to add the listener to.
 */
azdataGraph.prototype.addZoomOutListener = function (element) {
    let self = this;
    mxEvent.addListener(element, 'click', (e) => {
        azdataGraph.prototype.zoomOut.apply(self);
        mxEvent.consume(e);
    });
}
