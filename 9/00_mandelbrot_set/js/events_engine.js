window.EventsEngine = function(canvasId){
  this.startMousePos = undefined;
  this.endMousePos = undefined;

  this._buttons = {
    left: false
  };
}

EventsEngine.prototype.init = function(canvasId){
  this._canvas = document.getElementById(canvasId);
  this._registerEvents();
};

EventsEngine.prototype.isMoving = function(){
  return this._buttons.left && this.startMousePos && this.endMousePos;
};

EventsEngine.prototype._registerEvents = function(){
  this._canvas.addEventListener('mousedown', this._onMouseDown.bind(this));
  this._canvas.addEventListener('wheel', this._onMouseWheel.bind(this));
  window.addEventListener('mouseup', this._onMouseUp.bind(this));
  window.addEventListener('mousemove', this._onMouseMove.bind(this));
};

EventsEngine.prototype._onMouseMove = function(event){
  if(this._buttons.left){
    event.preventDefault();
    this.endMousePos = this._getMousePos(event.clientX, event.clientY);
    var mouseVec = subtract(this.endMousePos, this.startMousePos);

    center[0] = this.oldCenter.x - mouseVec[0]/(scale*this._canvas.width);
    center[1] = this.oldCenter.y + mouseVec[1]/(scale*this._canvas.height);

    if (center[0] < -2.0) center[0] = -2.0;
    if (center[0] > 1.0) center[0] = 1.0;
    if (center[1] < -1.5) center[1] = -1.5;
    if (center[1] > 1.5) center[1] = 1.5;
  }
};

EventsEngine.prototype._onMouseUp = function(event){
  if(event.button === 0){ this._buttons.left = false; }
  this.startMousePos = undefined;
  this.endMousePos = undefined;
  this.oldCenter = undefined;
};

EventsEngine.prototype._onMouseDown = function(event){
  if(event.button === 0){
    this._buttons.left = true;
    this.startMousePos = this._getMousePos(event.clientX, event.clientY);
    this.oldCenter = {
      x: center[0],
      y: center[1]
    };
  }
};

EventsEngine.prototype._onMouseWheel = function(event){
  event.preventDefault();
  var sign = Math.sign(event.deltaY)
  if(scale > 0.4 && sign == 1) scale /=  1.5;
  if(scale < 200000 && sign == -1) scale *=  1.5

}

EventsEngine.prototype._getMousePos = function(clientX, clientY){
  var rect = this._canvas.getBoundingClientRect();
  return vec2( clientX - rect.left, clientY - rect.top );
};