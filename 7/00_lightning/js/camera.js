window.Camera = function(ar, position, target, up, fov, zNear, zFar){
  this.position = position || vec3(0.0, 0.0, 0.0);
  this.target = target || vec3(0.0, 0.0, -1.0);
  this.up = up || vec3(0.0, 1.0, 0.0);

  this.fov = fov || 50;
  this.ar = ar || 1;
  this.zNear = zNear || 1;
  this.zFar = zFar || 1000;
}

Camera.prototype.viewMatrix = function(){
  var n = normalize(this.target);
  var v = normalize(this.up);
  var u = normalize(cross(n, v));

  var t = translate(-this.position[0], -this.position[1], -this.position[2]);

  var uvn = mat4(
    u[0], v[0], n[0], 0.0,
    u[1], v[1], n[1], 0.0,
    u[2], v[2], n[2], 0.0,
     0.0,  0.0,  0.0, 1.0
  );

  return mult(uvn, t);
};

Camera.prototype.projMatrix = function(){
  t = Math.tan(radians(this.fov)/2);
  d = 1/t;
  nf = this.zNear-this.zFar;

  return mat4(
    d/this.ar, 0,                          0,                           0,
            0, d,                          0,                           0,
            0, 0, (-this.zNear-this.zFar)/nf, (2*this.zNear*this.zFar)/nf,
            0, 0,                          1,                           0
  );
};

Camera.prototype.viewProjMatrix = function(){
  return mult(this.projMatrix(), this.viewMatrix());
}