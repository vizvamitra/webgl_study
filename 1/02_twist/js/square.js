window.Square = function(){
  return {
    _points: [],
    _twistedPoints: [],

    settings: {
      tessalationLevel: 3,
      angle: Math.PI / 2,
      keep: [ 
        true,  true, true,
        true, false, true,
        true,  true, true
      ]
    },

    _initial: [
      vec2( -0.5, -0.5),
      vec2( -0.5,  0.5),
      vec2(  0.5,  0.5),
      vec2(  0.5, -0.5)
    ],

    generatePoints: function(){
      var tessalator = SquareTessalator( this.settings.keep );

      this._points = tessalator.tessalate(
        this._initial[0],
        this._initial[1],
        this._initial[2],
        this._initial[3],
        this.settings.tessalationLevel
      );
    },

    twist: function(){
      this._twistedPoints = [];
      
      for (var i in this._points){
        var point = this._points[i];
        var angle = this.settings.angle * Math.sqrt(dot(point, point));
        x1 = point[0]*Math.cos(angle) - point[1]*Math.sin(angle);
        y1 = point[0]*Math.sin(angle) + point[1]*Math.cos(angle);
        this._twistedPoints[i] = vec2(x1, y1);
      }
    },

    getPointData: function(){
      return this._twistedPoints;
    }
  };
}