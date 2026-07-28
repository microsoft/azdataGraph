/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

function loadAzdataGraph() {
    function mxGraph() {}
    mxGraph.prototype.getTooltipForCell = function () {
        return '';
    };

    const context = vm.createContext({ mxGraph });
    const source = fs.readFileSync(
        path.join(__dirname, '..', 'src', 'js', 'azdata', 'view', 'azDataGraph.js'),
        'utf8'
    );
    vm.runInContext(source, context);
    return context.azdataGraph;
}

test('escapeTooltipText encodes HTML-significant characters', () => {
    const AzdataGraph = loadAzdataGraph();
    const graph = Object.create(AzdataGraph.prototype);

    assert.equal(
        graph.escapeTooltipText(`&<>"'`),
        '&amp;&lt;&gt;&quot;&#39;'
    );
});

test('styled tooltips encode all dynamic text fields', () => {
    const AzdataGraph = loadAzdataGraph();
    const graph = Object.create(AzdataGraph.prototype);
    const tooltip = graph.getStyledTooltipForCell({
        edge: false,
        value: {
            tooltipTitle: '<b>Title & text</b>',
            description: '<img src=x onerror=alert(1)>',
            metrics: [
                {
                    name: 'Footer',
                    value: '',
                    isLongString: false,
                },
                {
                    name: '<Metric & name>',
                    value: `"</span><svg onload=alert(1)>'`,
                    isLongString: false,
                },
                {
                    name: '<Long metric>',
                    value: 'first line\n<script>alert(1)</script>',
                    isLongString: true,
                },
            ],
        },
    });

    assert.match(tooltip, /&lt;b&gt;Title &amp; text&lt;\/b&gt;/);
    assert.match(tooltip, /&lt;img src=x onerror=alert\(1\)&gt;/);
    assert.match(tooltip, /&lt;Metric &amp; name&gt;/);
    assert.match(tooltip, /&quot;&lt;\/span&gt;&lt;svg onload=alert\(1\)&gt;&#39;/);
    assert.match(tooltip, /&lt;Long metric&gt;/);
    assert.match(tooltip, /first line &lt;script&gt;alert\(1\)&lt;\/script&gt;/);
    assert.doesNotMatch(tooltip, /<img|<svg|<script/);
});
