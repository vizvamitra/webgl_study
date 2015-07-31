window.Cube = function(){
  return {
    mesh: undefined,

    angles: {
      x: 0,
      y: 0,
      z: 0
    },

    position: {
      x: 0,
      y: 0,
      z: 2
    },

    mvpMatrix: mat4(),

    init: function(){
      this.mesh = CubeMesh();
    },

    rotate: function(axis, value){
      this.angles[axis] += value;
      this.mvpMatrix = this._calcMVPMatrix()
    },

    _calcMVPMatrix: function(){
      var r = this._rotationMatrix();
      var t = this._translationMatrix();
      var p = this._projectionMatrix(50, 1, 1, -1000);

      return mult(p, mult(t, r));
    },

    _rotationMatrix: function(){
      rx = rotate(this.angles.x, 1.0, 0.0, 0.0);
      ry = rotate(this.angles.y, 0.0, 1.0, 0.0);
      rz = rotate(this.angles.z, 0.0, 0.0, 1.0);

      return mult(rz, mult(rx, ry));
    },

    _translationMatrix: function(){
      return translate(this.position.x, this.position.y, this.position.z);
    },

    _projectionMatrix: function(fov, ar, zNear, zFar){
      t = Math.tan(radians(fov)/2);
      d = 1/t;
      nf = zNear-zFar;

      return mat4(
        1/(ar*t),   0,                0,                 0,
               0, 1/t,                0,                 0,
               0,   0, (-zNear-zFar)/nf, (2*zNear*zFar)/nf,
               0,   0,                1,                 0
      );
    }

    // _quad: function(a, b, c, d){
    //   var indicies = [a, b, c, a, c, d];
    //   for (var i in indicies){
    //     index = indicies[i]
    //     this.verticies.push(this._points[index]);
    //     this.vertexColors.push(this._colors[a]);
    //   }
    // },

    // init: function(){
    //   this._quad(0,3,2,1);
    //   this._quad(3,7,6,2);
    //   this._quad(7,4,5,6);
    //   this._quad(4,0,1,5);
    //   this._quad(1,2,6,5);
    //   this._quad(4,7,3,0);
    // },
  };
}