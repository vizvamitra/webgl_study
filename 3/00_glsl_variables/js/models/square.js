window.Square = function(renderer){
  return {
    _points: [],
    _colors: [],

    _renderer: renderer,

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

    init: function(){
      this.generatePoints();

      this._renderer.init();
      this._renderer.load(this._points, this._colors, this.settings.angle);
      this._renderer.render();
    },

    generatePoints: function(){
      var tessalator = SquareTessalator( this.settings.keep );

      this._points = tessalator.tessalate(
        this._initial[0],
        this._initial[1],
        this._initial[2],
        this._initial[3],
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