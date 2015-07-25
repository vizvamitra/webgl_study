window.SquareTessalator = function(keep){
  return {
    _keep: keep || [
      true, true, true,
      true, true, true,
      true, true, true
    ],

    _points: [],

    tessalate: function(a,b,c,d, count){
      if (count===0){
        this.addTriangle(a, b, c);
        this.addTriangle(a, c, d);
      } else {
        var tempPoints = [
                     b, mix(b,c,2/3), mix(b,c, 1/3),            c,
          mix(b,a,2/3), mix(b,d,2/3), mix(a,c, 1/3), mix(c,d,2/3),
          mix(b,a,1/3), mix(a,c,2/3), mix(b,d, 1/3), mix(c,d,1/3),
                     a, mix(a,d,2/3), mix(a,d, 1/3),            d
        ];

        for(var i in this._keep){
          var row = Math.floor(i/3);
          var pos = i % 3;

          p1 = tempPoints[(row+1)*4 + pos];
          p2 = tempPoints[row*4 + pos];
          p3 = tempPoints[row*4 + pos+1];
          p4 = tempPoints[(row+1)*4 + pos+1];

          if(this._keep[i]){ this.tessalate(p1,p2,p3,p4, count-1); }
        }
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