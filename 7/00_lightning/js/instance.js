window.Instance = function(options){
  this.mesh = options.mesh;

  this.name = options.name || mesh;
  this.angles = options.angles || vec3(0, 0, 0);
  this.position = options.position || vec3(0.0, 0.0, 0.0);
  this.scale = options.scale || vec3(1.0, 1.0, 1.0);
};

Instance.prototype.modelMatrix = function(){
  var s = this._scaleMatrix();
  var r = this._rotationMatrix();
  var t = this._translationMatrix();

  return mult(t, mult(r, s));
};

Instance.prototype._scaleMatrix = function(){
  return scalem(this.scale[0], this.scale[1], this.scale[2])
};

Instance.prototype._rotationMatrix = function(){
  rx = rotate(this.angles[0], 1.0, 0.0, 0.0);
  ry = rotate(this.angles[1], 0.0, 1.0, 0.0);
  rz = rotate(this.angles[2], 0.0, 0.0, 1.0);

  return mult(rz, mult(rx, ry));
};

Instance.prototype._translationMatrix = function(){
  return translate(this.position[0], this.position[1], this.position[2]);
};