window.Vec4 = function(x,y,z,w){
  return {
    x: x || 0.0,
    y: y || 0.0,
    z: z || 0.0,
    w: w || 1.0,

    norm: function(){
      return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z + this.w*this.w);
    },

    normalize: function(){
      norm = this.norm();
      this.x /= norm;
      this.y /= norm;
      this.z /= norm;
      this.w /= norm;
      return this;
    },

    add: function(other){
      this.x += other.x;
      this.y += other.y;
      this.z += other.z;
      this.w += other.w;
      return this;
    },

    sub: function(other){
      this.x -= other.x;
      this.y -= other.y;
      this.z -= other.z;
      this.w -= other.w;
      return this;
    },

    scale: function(scalar){
      this.x *= scalar;
      this.y *= scalar;
      this.z *= scalar;
      this.w *= scalar;
      return this;
    },

    print: function(){
      console.log("("+this.x+', '+this.y+', '+this.z+', '+this.w+")");
    },
  }
};