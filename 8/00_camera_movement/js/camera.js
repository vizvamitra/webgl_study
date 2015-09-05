window.Camera = function(position, target, up){
  this.angles = {
    horisontal: 0,
    vertical: 0
  };
  this.distance = 1;

  this.update();
}

Camera.prototype.setPerspective = function(ar, fov, zNear, zFar){
  this._fov = fov || 50;
  this._ar = ar || 1;
  this._zNear = zNear || 1;
  this._zFar = zFar || 1000;
};

Camera.prototype.update = function(){
  var axisV = vec3(0.0, 1.0, 0.0);

  var newTarget = vec3(0.0, 0.0, -1.0);
  newTarget = normalize(rotateVec(newTarget, axisV, this.angles.horisontal));
  
  var axisH = normalize(cross(newTarget, axisV));
  newTarget = rotateVec(newTarget, axisH, this.angles.vertical);
  
  this._target = normalize(newTarget);
  this._up = normalize(cross(axisH, this._target));

  this._position = vec3(-this._target[0]*this.distance, -this._target[1]*this.distance, -this._target[2]*this.distance);
}

Camera.prototype.viewMatrix = function(){
  var n = normalize(this._target);
  var v = normalize(this._up);
  var u = normalize(cross(n, v));

  var t = mat4(
    1.0, 0.0, 0.0, -this._position[0],
    0.0, 1.0, 0.0, -this._position[1],
    0.0, 0.0, 1.0, -this._position[2],
    0.0, 0.0, 0.0,    1.0
  );

  var uvn = mat4(
    u[0], u[1], u[2], 0.0,
    v[0], v[1], v[2], 0.0,
    n[0], n[1], n[2], 0.0,
     0.0,  0.0,  0.0, 1.0
  );

  return mult(uvn, t);
};

Camera.prototype.projMatrix = function(){
  t = Math.tan(radians(this._fov)/2);
  d = 1/t;
  nf = this._zNear-this._zFar;

  return mat4(
    d/this._ar, 0,                            0,                             0,
             0, d,                            0,                             0,
             0, 0, (-this._zNear-this._zFar)/nf, (2*this._zNear*this._zFar)/nf,
             0, 0,                            1,                             0
  );
};

Camera.prototype.viewProjMatrix = function(){
  return mult(this.projMatrix(), this.viewMatrix());
}