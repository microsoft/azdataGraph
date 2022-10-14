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
    return this.insertInvertedEdge(parent, id, value, source, target, `strokeWidth=${value.weight.toFixed(1)};` + style);
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
    const tooltipWidth = 'width: 45em;';
    const justifyContent = 'display: flex; justify-content: space-between;';
    const boldText = 'font-weight: bold;';
    const tooltipLineHeight = 'padding-top: .13em; line-height: .5em;';
    const centerText = 'text-align: center;';
    const headerBottomMargin = 'margin-bottom: 1.5em;';
    const headerTopMargin = 'margin-top: 1.5em;';
    const footerTopMargin = 'margin-top: 1.5em;';
    const metricLabelMargin = 'margin-right: 4em;';

    if (cell?.value != null && cell?.value?.metrics != null) {
        var tooltip = `<div style=\"${tooltipWidth}\">`;

        // tooltip heading for vertices only
        if (!cell.edge) {
            let tooltipTitle = this.truncateTooltipTitle(cell.value.tooltipTitle);
            tooltip += `<div style=\"${centerText}\"><span style=\"${boldText}\">${tooltipTitle}</span></div>`;
            if (cell.value.description) {
                tooltip += `<div style=\"${headerBottomMargin} ${headerTopMargin}\"><span>${cell.value.description}</span></div>`;
            }
        }

        // tooltip body
        let startIndex = cell.edge ? 0 : 1; // first index for vertices contains footer label, so we can skip for vertices.
        for (var i = startIndex; i < cell.value.metrics.length; ++i) {
            if (cell.value.metrics[i].isLongString) { // Skipping all strings as they go to the bottom of tooltip
                continue;
            }
            tooltip += `<div style=\"${tooltipLineHeight}\">`;

            tooltip += `<div style=\"${justifyContent}\">`;
            tooltip += `<span style=\"${boldText} ${metricLabelMargin}\">${cell.value.metrics[i].name}</span>`;
            tooltip += `<span>${cell.value.metrics[i].value}</span>`;
            tooltip += '</div>';

            if (i < cell.value.metrics.length - 1) {
                tooltip += `<hr />`;
            }

            tooltip += `</div>`;
        }

        // tooltip footer for vertices only
        if (!cell.edge) {
            cell.value.metrics.filter(m => m.isLongString).forEach(m => {
                tooltip += '<hr />';
                tooltip += `<div style=\"${footerTopMargin}\"><span style=\"${boldText}\">${m.name}</span></div>`;

                let metricLabel = m.value.replace(/(\r\n|\n|\r)/gm, " ");
                if (metricLabel.length > 103) {
                    metricLabel = metricLabel.substring(0, 100) + '...';
                }
                tooltip += `<div><span>${metricLabel}</span></div>`; // Removing all line breaks as they look bad in tooltips
            })
        }

        tooltip += '</div>';

        return tooltip;
    }

    return azdataGraph.prototype.getTooltipForCell.apply(this, arguments); // "supercall"
};

azdataGraph.prototype.truncateTooltipTitle = function (title) {
    let hasWindowsEOL = title.includes('\r\n');
    let titleSegments = hasWindowsEOL ? title.split('\r\n') : title.split('\n');
    let truncatedTitleSegments = titleSegments.map(segment => {
        if (segment.length > 50) {
            return segment.substring(0, 50) + '...';
        }
        else {
            return segment;
        }
    });

    if (hasWindowsEOL) {
        title = truncatedTitleSegments.join('\r\n');
    }
    else {
        title = truncatedTitleSegments.join('\n');
    }

    return title;
};

/**
 * Function: graphEventHandler
 * 
 * Event listener for the entire graph.
 * 
 * Parameter:
 * 
 * sender - Optional sender argument. Default is this.
 * event - The event caught by the listener.
 * callback - The callback to invoke with the passed in selected cell.
 */
azdataGraph.prototype.graphEventHandler = function (sender, event, eventCallback) {
    let selectedCell = event.getProperty('cell');
    if (eventCallback && selectedCell) {
        eventCallback(selectedCell);
    }
    event.consume();
};

/**
 * Function: addDomEventListener
 * 
 * Adds a listener to the given element
 * 
 * Parameter
 * 
 * element - The element to add the listener to.
 * eventType - The event type (i.e. 'click') that should trigger the callback
 * callback - The callback function that is executed by the event listener.
 */
azdataGraph.prototype.addDomEventListener = function (element, eventType, eventCallback) {
    mxEvent.addListener(element, eventType, (e) => {
        if (eventCallback) {
            eventCallback();
        }
        mxEvent.consume(e);
    });
};

__mxOutput.azDataGraph = typeof azDataGraph !== 'undefined' ? azDataGraph : undefined;
