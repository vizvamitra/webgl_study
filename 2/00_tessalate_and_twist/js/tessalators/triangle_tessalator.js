window.TriangleTessalator = function(keep){
  return {
    _keep: keep || [ true, true, true, true ],

    _points: [],

    tessalate: function(a,b,c, count){
      if (count===0){
        this.addTriangle(a,b,c);
      } else {
        var ab = mix(a,b, 0.5);
        var bc = mix(b,c, 0.5);
        var ac = mix(a,c, 0.5);

        if(this._keep[0]){ this.tessalate(ab, b, bc, count-1); }
        if(this._keep[1]){ this.tessalate(ab, bc, ac, count-1); }
        if(this._keep[2]){ this.tessalate(a, ab, ac, count-1); }
        if(this._keep[3]){ this.tessalate(ac, bc, c, count-1); }
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