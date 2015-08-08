window.Instance = function(mesh, position, angles, scale, color, wireframe){
  return {
    mesh: mesh,

    name: name || mesh,
    angles: angles || vec3(0, 0, 0),
    position: position || vec3(0.0, 0.0, 0.0),
    scale: scale || vec3(1.0, 1.0, 1.0),
    color: color || vec4(0.0, 0.0, 0.0, 1.0),
    wireframeColor: wireframe || vec4(1.0, 1.0, 1.0, 1.0),

    modelMatrix: function(){
      var s = this._scaleMatrix();
      var r = this._rotationMatrix();
      var t = this._translationMatrix();

      return mult(t, mult(r, s));
    },

    _scaleMatrix: function(){
      return scalem(this.scale[0], this.scale[1], this.scale[2])
    },

    _rotationMatrix: function(){
      rx = rotate(this.angles[0], 1.0, 0.0, 0.0);
      ry = rotate(this.angles[1], 0.0, 1.0, 0.0);
      rz = rotate(this.angles[2], 0.0, 0.0, 1.0);

      return mult(rz, mult(rx, ry));
    },

    _translationMatrix: function(){
      return translate(this.position[0], this.position[1], this.position[2]);
    },

  }
}