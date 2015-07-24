/*
  USAGE:

  // 4 values for each of 4 new triangles. true is for keep, false - for skip
  var tessalator = TriangleTessalator(true, true, true, true);

  // a - bottom-left vertex, b - top vertex, c - bottom-right vertex
  // returns result of tessalation - array of points
  var points = tessalator.tessalate(a, b, c, 5);
*/

window.TriangleTessalator = function(keep){
  return {
    _keep: keep,

    _points: [],

    tessalate: function(a,b,c, count){
      if (count===0){
        this.addTriangle(a,b,c);
      } else {
        var ab = mix(a,b, 0.5);
        var bc = mix(b,c, 0.5);
        var ac = mix(a,c, 0.5);

        if(this._keep.left){ this.tessalate(a, ab, ac, count-1); }
        if(this._keep.top){ this.tessalate(ab, b, bc, count-1); }
        if(this._keep.right){ this.tessalate(ac, bc, c, count-1); }
        if(this._keep.middle){ this.tessalate(ab, bc, ac, count-1); }
      }

      return this._points;
    },

    addTriangle: function(a,b,c){
      this._points.push(a);
      this._points.push(b);
      this._points.push(c);
    }
  }
}