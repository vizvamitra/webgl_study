window.Triangle = function(renderer){
  return {
    _points: [],
    _twistedPoints: [],

    _renderer: renderer,

    settings: {
      tessalationLevel: 5,
      angle: Math.PI / 2,
      keep: [ 
          true,
          false,
        true, true
      ]
    },

    _initial: [
      vec2(-0.7,  -0.405),
      vec2(   0,  0.805),
      vec2( 0.7,  -0.405)
    ],

    init: function(){
      this.generatePoints();
      this.twist();

      this._renderer.init();
      this._renderer.load(this._twistedPoints);
      this._renderer.render();
    },

    generatePoints: function(){
      var tessalator = TriangleTessalator( this.settings.keep );

      this._points = tessalator.tessalate(
        this._initial[0],
        this._initial[1],
        this._initial[2],
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

    render: function(){
      this._renderer.load(this._twistedPoints);
      this._renderer.render();
    },
  };
}