window.Quaternion = function(vector){
  var normalized = normalize(vector);

  this.x = normalized[0];
  this.y = normalized[1];
  this.z = normalized[2];
  this.w = normalized[3];

  this.quaternion = true;
}

Quaternion.prototype.inverse = function(){
  return new Quaternion(vec4(-this.x, -this.y, -this.z, this.w));
}

Quaternion.prototype.mult = function(other){
  var x,y,z,w;

  if (other.quaternion){
    w = (this.w * other.w) - (this.x * other.x) - (this.y * other.y) - (this.z * other.z);
    x = (this.x * other.w) + (this.w * other.x) + (this.y * other.z) - (this.z * other.y);
    y = (this.y * other.w) + (this.w * other.y) + (this.z * other.x) - (this.x * other.z);
    z = (this.z * other.w) + (this.w * other.z) + (this.x * other.y) - (this.y * other.x);
  } else {
    if ( other.length !== 3 ) {
      throw "mult(): quaternion can be multiplied only with other quaternion or vec3";
    }

    w = - (this.x * other[0]) - (this.y * other[1]) - (this.z * other[2]);
    x =   (this.w * other[0]) + (this.y * other[2]) - (this.z * other[1]);
    y =   (this.w * other[1]) + (this.z * other[0]) - (this.x * other[2]);
    z =   (this.w * other[2]) + (this.x * other[1]) - (this.y * other[0]);
  }

  return new Quaternion(vec4(x, y, z, w));
}