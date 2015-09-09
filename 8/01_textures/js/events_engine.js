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

EventsEngine.prototype.isRotating = function(){
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

    camera.angles.horisontal = this.oldAngles.horisontal - mouseVec[0]/2;

    camera.angles.vertical = this.oldAngles.vertical - mouseVec[1]/2;
    if(camera.angles.vertical > 11) camera.angles.vertical = 11;
    if(camera.angles.vertical < -11) camera.angles.vertical = -11;
  }
};

EventsEngine.prototype._onMouseUp = function(event){
  if(event.button === 0){ this._buttons.left = false; }
  this.startMousePos = undefined;
  this.endMousePos = undefined;
  this.oldAngles = undefined;
};

EventsEngine.prototype._onMouseDown = function(event){
  if(event.button === 0){
    this._buttons.left = true;
    this.startMousePos = this._getMousePos(event.clientX, event.clientY);
    this.oldAngles = {
      vertical: camera.angles.vertical * 1,
      horisontal: camera.angles.horisontal * 1
    }
  }
};

EventsEngine.prototype._onMouseWheel = function(event){
  event.preventDefault();
  camera.distance += event.deltaY/100;
  if(camera.distance > 5) camera.distance = 5;
  if(camera.distance < 2) camera.distance = 2;
}

EventsEngine.prototype._getMousePos = function(clientX, clientY){
  var rect = this._canvas.getBoundingClientRect();
  return vec2( clientX - rect.left, clientY - rect.top );
};