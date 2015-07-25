window.Triangle = function(renderer){
  return {
    _points: [],
    _colors: [],

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

      this._renderer.init();
      this._renderer.load(this._points, this._colors, this.settings.angle);
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

      this._colors = this._points;
    },

    render: function(){
      this._renderer.load(this._points, this._colors, this.settings.angle);
      this._renderer.render();
    },
  };
}