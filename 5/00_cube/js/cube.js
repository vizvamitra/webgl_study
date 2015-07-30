window.Cube = function(){
  return {
    mesh: undefined,

    angles: {
      x: 0,
      y: 0,
      z: 0
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
      rx = rotate(this.angles.x, 1.0, 0.0, 0.0);
      ry = rotate(this.angles.y, 0.0, 1.0, 0.0);
      rz = rotate(this.angles.z, 0.0, 0.0, 1.0);

      return mult(rz, mult(rx, ry));
    },

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