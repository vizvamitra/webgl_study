window.Line = function(color, width){
  return {
    _renderer: undefined,
    _brush: undefined,
    _prev2: [],

    color: color || vec4(0.0, 0.0, 0.0, 1.0),
    width: width || 1,

    init: function(){
      this._renderer = Renderer('gl-canvas');
      this._renderer.init();

      this._brush = Brush();
    },

    addPoint: function(mousePos){
      var point = this._renderer.toViewportCoords(mousePos);

      if (this._prev2.length === 0){
        this._prev2.push(point);
      } else if (this._prev2.length === 1){
        if (!equal(this._prev2[0], point)){ this._prev2.push(point) };
      } else if(!equal(point, this._prev2[1])){
        var vertices = this._brush.getVertices(this._prev2, point, this.width);
        this._renderer.addPoints(vertices);

        this._prev2 = [this._prev2[1], point];
      }
    },

    render: function(){
      this._renderer.render(this.color, this.width);
    }
  };
}