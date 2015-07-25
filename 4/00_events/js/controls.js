window.Controls = function(canvasId){
  return {
    _canvas: undefined,

    _sizeInput: undefined,
    _colorSelect: undefined,

    _buttons: {
      left: false
    },

    _colors: {
      black: vec4(0.0, 0.0, 0.0, 1.0),
      red: vec4(1.0, 0.0, 0.0, 1.0),
      green: vec4(0.0, 1.0, 0.0, 1.0),
      blue: vec4(0.0, 0.0, 1.0, 1.0),
    },

    size: 0.009,
    color: vec4(0.0, 0.0, 0.0, 1.0),

    _mousePos: undefined,

    init: function(){
      this._canvas = document.getElementById(canvasId);

      this._sizeInput = document.querySelector('input#size');
      this._colorSelect = document.querySelector('select#color');

      this._registerControls();
    },

    isDrawing: function(){
      return this._buttons.left || this._leftCoords;
    },

    getMousePos: function(){
      if (this._buttons.left){
        return this._mousePos;
      } else if (this._leftPressed && this._leftCoords){
        var coords = this._leftCoords;
        this._leftCoords = undefined;
        return coords;
      }
    },

    _registerControls: function(){
      this._canvas.addEventListener('mousemove', this._onMouseMove.bind(this));
      this._canvas.addEventListener('mouseleave', this._onMouseLeave.bind(this));
      this._canvas.addEventListener('mousedown', this._onMouseDown.bind(this));
      this._canvas.addEventListener('mouseup', this._onMouseUp.bind(this));

      this._sizeInput.addEventListener('input', this._onSizeChange.bind(this));
      this._colorSelect.addEventListener('input', this._onColorChange.bind(this));
    },

    _onMouseMove: function(event){
      this._mousePos = this._getMousePos(event.clientX, event.clientY);
    },

    _getMousePos: function(clientX, clientY){
      var rect = this._canvas.getBoundingClientRect();
      return vec2( clientX - rect.left, clientY - rect.top );
    },

    _onMouseDown: function(event){
      if(event.button === 0){ this._buttons.left = true; }
    },

    _onMouseUp: function(event){
      if(event.button === 0){ this._buttons.left = false; }
    },

    _onMouseLeave: function(event){
      this._mousePos = undefined;
      if (this._buttons.left){
        this._leftPressed = true;
        this._leftCoords = this._getMousePos(event.clientX, event.clientY);
      }
      this._buttons.left = false;
    },

    _onSizeChange: function(event){
      input = event.target;
      this.size = parseFloat(input.value)*0.003;

      output = input.parentNode.getElementsByClassName('size')[0];
      output.innerHTML = input.value;
    },

    _onColorChange: function(event){
      select = event.target;
      this.color = this._colors[select.value];
    }
  };
}