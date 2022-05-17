 function mxPolygon(points, fill, stroke, strokewidth)
 {
     mxPolyline.call(this);
     this.points = points;
     this.stroke = stroke;
     this.fill = fill; 
     this.strokewidth = (strokewidth != null) ? strokewidth : 1;
 };
 
 /**
  * Extends mxPolyline.
  */
  mxUtils.extend(mxPolygon, mxPolyline);
 
 /**
  * Function: paintLine: overriding paintline function of polyline to paint the entire shape instead of just the line
  * 
  * Paints the polygon
  */
  mxPolygon.prototype.paintLine = function(c, pts, rounded)
 {
     var arcSize = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2;
     c.begin();
     this.addPoints(c, pts, rounded, arcSize, true);
     c.fillAndStroke();
 };