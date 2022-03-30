/**
 * Copyright (c) 2006-2015, JGraph Ltd
 * Copyright (c) 2006-2015, Gaudenz Alder
 */
/**
 * Class: mxTooltipHandler
 * 
 * Graph event handler that displays tooltips. <mxGraph.getTooltip> is used to
 * get the tooltip for a cell or handle. This handler is built-into
 * <mxGraph.tooltipHandler> and enabled using <mxGraph.setTooltips>.
 *
 * Example:
 * 
 * (code>
 * new mxTooltipHandler(graph);
 * (end)
 * 
 * Constructor: mxTooltipHandler
 * 
 * Constructs an event handler that displays tooltips with the specified
 * delay (in milliseconds). If no delay is specified then a default delay
 * of 500 ms (0.5 sec) is used.
 * 
 * Parameters:
 * 
 * graph - Reference to the enclosing <mxGraph>.
 * delay - Optional delay in milliseconds.
 */
function mxTooltipHandler(graph, delay)
{
	if (graph != null)
	{
		this.graph = graph;
		this.delay = delay || 500;
		this.graph.addMouseListener(this);
	}
};

/**
 * Variable: zIndex
 * 
 * Specifies the zIndex for the tooltip and its shadow. Default is 10005.
 */
mxTooltipHandler.prototype.zIndex = 10005;

/**
 * Variable: graph
 * 
 * Reference to the enclosing <mxGraph>.
 */
mxTooltipHandler.prototype.graph = null;

/**
 * Variable: delay
 * 
 * Delay to show the tooltip in milliseconds. Default is 500.
 */
mxTooltipHandler.prototype.delay = null;

/**
 * Variable: ignoreTouchEvents
 * 
 * Specifies if touch and pen events should be ignored. Default is true.
 */
mxTooltipHandler.prototype.ignoreTouchEvents = true;

/**
 * Variable: hideOnHover
 * 
 * Specifies if the tooltip should be hidden if the mouse is moved over the
 * current cell. Default is false.
 */
mxTooltipHandler.prototype.hideOnHover = false;

/**
 * Variable: destroyed
 * 
 * True if this handler was destroyed using <destroy>.
 */
mxTooltipHandler.prototype.destroyed = false;

/**
 * Variable: enabled
 * 
 * Specifies if events are handled. Default is true.
 */
mxTooltipHandler.prototype.enabled = true;

/**
 * Function: isEnabled
 * 
 * Returns true if events are handled. This implementation
 * returns <enabled>.
 */
mxTooltipHandler.prototype.isEnabled = function()
{
	return this.enabled;
};

/**
 * Function: setEnabled
 * 
 * Enables or disables event handling. This implementation
 * updates <enabled>.
 */
mxTooltipHandler.prototype.setEnabled = function(enabled)
{
	this.enabled = enabled;
};

/**
 * Function: isHideOnHover
 * 
 * Returns <hideOnHover>.
 */
mxTooltipHandler.prototype.isHideOnHover = function()
{
	return this.hideOnHover;
};

/**
 * Function: setHideOnHover
 * 
 * Sets <hideOnHover>.
 */
mxTooltipHandler.prototype.setHideOnHover = function(value)
{
	this.hideOnHover = value;
};

/**
 * Function: init
 * 
 * Initializes the DOM nodes required for this tooltip handler.
 */
mxTooltipHandler.prototype.init = function()
{
	if (document.body != null)
	{
		this.div = document.createElement('div');
		this.div.className = 'mxTooltip';
		this.div.style.visibility = 'hidden';

		document.body.appendChild(this.div);

		mxEvent.addGestureListeners(this.div, mxUtils.bind(this, function(evt)
		{
			var source = mxEvent.getSource(evt);
			
			if (source.nodeName != 'A')
			{
				this.hideTooltip();
			}
		}));

		/**
		 * {{SQL CARBON EDIT}} we only want to show the tooltip when the mouse is over the cell.
		 * To track that when the tooltip is present over the cell we use this event.
		 * As soon as the cursor goes outside the cell bound (over the tooltip) we hide the tooltip
		 */
		mxEvent.addListener(this.div, 'mousemove', mxUtils.bind(this, function(evt)
		{
			var pt = mxUtils.convertPoint(this.graph.container, evt.clientX, evt.clientY);
			if( this.sourceCell &&
				pt.x < this.sourceCell.geometry.x ||
				pt.x > (this.sourceCell.geometry.x + this.sourceCell.geometry.width) ||
				pt.y < (this.sourceCell.geometry.y) ||
				pt.y > (this.sourceCell.geometry.y + this.sourceCell.geometry.height)
			){
				this.hideTooltip();
			}
		}));

		/**
		 * {{SQL CARBON EDIT}} Handling an edge case when the both cell and tooltip are at the edge of 
		 * the screen. When the mouse goes outside the screen we close the tooltip
		 */
		 mxEvent.addListener(this.div, 'mouseleave', mxUtils.bind(this, function(evt)
		 {
			this.hideTooltip();
		 }));
	}
};

/**
 * Function: getStateForEvent
 * 
 * Returns the <mxCellState> to be used for showing a tooltip for this event.
 */
mxTooltipHandler.prototype.getStateForEvent = function(me)
{
	return me.getState();
};

/**
 * Function: mouseDown
 * 
 * Handles the event by initiating a rubberband selection. By consuming the
 * event all subsequent events of the gesture are redirected to this
 * handler.
 */
mxTooltipHandler.prototype.mouseDown = function(sender, me)
{
	this.reset(me, false);
	this.hideTooltip();
};

/**
 * Function: mouseMove
 * 
 * Handles the event by updating the rubberband selection.
 */
mxTooltipHandler.prototype.mouseMove = function(sender, me)
{
	if (me.getX() != this.lastX || me.getY() != this.lastY)
	{
		this.reset(me, true);
		var state = this.getStateForEvent(me);
		
		if (this.isHideOnHover() || state != this.state || (me.getSource() != this.node &&
			(!this.stateSource || (state != null && this.stateSource ==
			(me.isSource(state.shape) || !me.isSource(state.text))))))
		{
			this.hideTooltip();
		}
	}
	
	this.lastX = me.getX();
	this.lastY = me.getY();
};

/**
 * Function: mouseUp
 * 
 * Handles the event by resetting the tooltip timer or hiding the existing
 * tooltip.
 */
mxTooltipHandler.prototype.mouseUp = function(sender, me)
{
	this.reset(me, true);
	this.hideTooltip();
};


/**
 * Function: resetTimer
 * 
 * Resets the timer.
 */
mxTooltipHandler.prototype.resetTimer = function()
{
	if (this.thread != null)
	{
		window.clearTimeout(this.thread);
		this.thread = null;
	}
};

/**
 * Function: reset
 * 
 * Resets and/or restarts the timer to trigger the display of the tooltip.
 */
mxTooltipHandler.prototype.reset = function(me, restart, state)
{
	if (!this.ignoreTouchEvents || mxEvent.isMouseEvent(me.getEvent()))
	{
		this.resetTimer();
		state = (state != null) ? state : this.getStateForEvent(me);
		
		if (restart && this.isEnabled() && state != null && (this.div == null ||
			this.div.style.visibility == 'hidden'))
		{
			var node = me.getSource();
			var x = me.getX();
			var y = me.getY();
			var stateSource = me.isSource(state.shape) || me.isSource(state.text);
	
			this.thread = window.setTimeout(mxUtils.bind(this, function()
			{
				// {{SQL CARBON EDIT}} saving source cell to be used in the events for hiding the tooltip
				this.sourceCell = me.sourceState.cell;
				if (!this.graph.isEditing() && !this.graph.popupMenuHandler.isMenuShowing() && !this.graph.isMouseDown)
				{
					// Uses information from inside event cause using the event at
					// this (delayed) point in time is not possible in IE as it no
					// longer contains the required information (member not found)
					var tip = this.graph.getTooltip(state, node, x, y);
					this.show(tip, x, y);
					this.state = state;
					this.node = node;
					this.stateSource = stateSource;
				}
			}), this.delay);
		}
	}
};

/**
 * Function: hide
 * 
 * Hides the tooltip and resets the timer.
 */
mxTooltipHandler.prototype.hide = function()
{
	this.resetTimer();
	this.hideTooltip();
};

/**
 * Function: hideTooltip
 * 
 * Hides the tooltip.
 */
mxTooltipHandler.prototype.hideTooltip = function()
{
	if (this.div != null)
	{
		this.div.style.visibility = 'hidden';
		this.div.innerHTML = '';
	}
	// {{SQL CARBON EDIT}} setting sourceCell to undefined when we hide the tooltip
	this.sourceCell = undefined;
};

/**
 * Function: show
 * 
 * Shows the tooltip for the specified cell and optional index at the
 * specified location (with a vertical offset of 10 pixels).
 */
mxTooltipHandler.prototype.show = function(tip, x, y)
{
	if (!this.destroyed && tip != null && tip.length > 0)
	{
		// Initializes the DOM nodes if required
		if (this.div == null)
		{
			this.init();
		}
		
		var origin = mxUtils.getScrollOrigin();

		this.div.style.zIndex = this.zIndex;
		this.div.style.left = (x + origin.x) + 'px';
		this.div.style.top = (y + mxConstants.TOOLTIP_VERTICAL_OFFSET +
			origin.y) + 'px';

		if (!mxUtils.isNode(tip))
		{	
			this.div.innerHTML = tip.replace(/\n/g, '<br>');
		}
		else
		{
			this.div.innerHTML = '';
			this.div.appendChild(tip);
		}

		/**
		 * {{SQL CARBON EDIT}} Adding smart placement of tooltip for better viewing.
		 * This takes into account the tooltip width and height and sees if the tooltip 
		 * is visible within in the window if not then it adjusts the position of the tooltip
		 */
		const tooltipPadding = 4;
		const tooltipWidth = this.div.offsetWidth + tooltipPadding;
		const tooltipHeight = this.div.offsetHeight + tooltipPadding;

		const windowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;

		if ((windowWidth - x) < tooltipWidth) {
			this.div.style.left = windowWidth - tooltipWidth + "px";
		}

		if ((windowHeight - y) < tooltipHeight) {
			this.div.style.top = windowHeight - tooltipHeight + "px";
		}

		/**
		 * {{SQL CARBON EDIT}} end of code
		 */
		this.div.style.visibility = '';
		/**
		 * {{SQL CARBON EDIT}} Commenting out the check to see if the tooltip 
		 * fits in the screen or not as we always want to show it.
		 */
		//mxUtils.fit(this.div); 

	}
};

/**
 * Function: destroy
 * 
 * Destroys the handler and all its resources and DOM nodes.
 */
mxTooltipHandler.prototype.destroy = function()
{
	if (!this.destroyed)
	{
		this.graph.removeMouseListener(this);
		mxEvent.release(this.div);
		
		if (this.div != null && this.div.parentNode != null)
		{
			this.div.parentNode.removeChild(this.div);
		}
		
		this.destroyed = true;
		this.div = null;
	}
};

__mxOutput.mxTooltipHandler = typeof mxTooltipHandler !== 'undefined' ? mxTooltipHandler : undefined;
