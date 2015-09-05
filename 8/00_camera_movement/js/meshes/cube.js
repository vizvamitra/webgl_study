window.Cube = function(){
  this.vBufferId = undefined;
  this.nBufferId = undefined;

  this.material = {
    ambient: vec4(0.2, 0.2, 0.2, 1.0),
    diffuse: vec4(0.8, 0.8, 0.8, 1.0),
    specular: vec4(0.8, 0.8, 0.8, 1.0),
    shininess: 10
  };

  this.vertices = [
    vec3(1.000000, -1.000000, 1.000000),
    vec3(-1.000000, -1.000000, 1.000000),
    vec3(-1.000000, -1.000000, -1.000000),
    vec3(-1.000000, 1.000000, -1.000000),
    vec3(-1.000000, 1.000000, 1.000000),
    vec3(0.999999, 1.000000, 1.000001),
    vec3(1.000000, -1.000000, -1.000000),
    vec3(1.000000, 1.000000, -0.999999),
    vec3(0.999999, 1.000000, 1.000001),
    vec3(1.000000, -1.000000, 1.000000),
    vec3(0.999999, 1.000000, 1.000001),
    vec3(-1.000000, 1.000000, 1.000000),
    vec3(-1.000000, 1.000000, 1.000000),
    vec3(-1.000000, 1.000000, -1.000000),
    vec3(-1.000000, -1.000000, -1.000000),
    vec3(1.000000, -1.000000, -1.000000),
    vec3(-1.000000, -1.000000, -1.000000),
    vec3(-1.000000, 1.000000, -1.000000),
    vec3(1.000000, -1.000000, -1.000000),
    vec3(1.000000, -1.000000, 1.000000),
    vec3(-1.000000, -1.000000, -1.000000),
    vec3(1.000000, 1.000000, -0.999999),
    vec3(-1.000000, 1.000000, -1.000000),
    vec3(0.999999, 1.000000, 1.000001),
    vec3(1.000000, -1.000000, 1.000000),
    vec3(1.000000, -1.000000, -1.000000),
    vec3(0.999999, 1.000000, 1.000001),
    vec3(-1.000000, -1.000000, 1.000000),
    vec3(1.000000, -1.000000, 1.000000),
    vec3(-1.000000, 1.000000, 1.000000),
    vec3(-1.000000, -1.000000, 1.000000),
    vec3(-1.000000, 1.000000, 1.000000),
    vec3(-1.000000, -1.000000, -1.000000),
    vec3(1.000000, 1.000000, -0.999999),
    vec3(1.000000, -1.000000, -1.000000),
    vec3(-1.000000, 1.000000, -1.000000),
  ];

  this.normals = [
    vec3(0.000000, -1.000000, 0.000000),
    vec3(0.000000, -1.000000, 0.000000),
    vec3(0.000000, -1.000000, 0.000000),
    vec3(0.000000, 1.000000, 0.000000),
    vec3(0.000000, 1.000000, 0.000000),
    vec3(0.000000, 1.000000, 0.000000),
    vec3(1.000000, -0.000000, 0.000000),
    vec3(1.000000, -0.000000, 0.000000),
    vec3(1.000000, -0.000000, 0.000000),
    vec3(-0.000000, -0.000000, 1.000000),
    vec3(-0.000000, -0.000000, 1.000000),
    vec3(-0.000000, -0.000000, 1.000000),
    vec3(-1.000000, -0.000000, -0.000000),
    vec3(-1.000000, -0.000000, -0.000000),
    vec3(-1.000000, -0.000000, -0.000000),
    vec3(0.000000, 0.000000, -1.000000),
    vec3(0.000000, 0.000000, -1.000000),
    vec3(0.000000, 0.000000, -1.000000),
    vec3(0.000000, -1.000000, 0.000000),
    vec3(0.000000, -1.000000, 0.000000),
    vec3(0.000000, -1.000000, 0.000000),
    vec3(0.000000, 1.000000, 0.000000),
    vec3(0.000000, 1.000000, 0.000000),
    vec3(0.000000, 1.000000, 0.000000),
    vec3(1.000000, -0.000000, 0.000000),
    vec3(1.000000, -0.000000, 0.000000),
    vec3(1.000000, -0.000000, 0.000000),
    vec3(-0.000000, -0.000000, 1.000000),
    vec3(-0.000000, -0.000000, 1.000000),
    vec3(-0.000000, -0.000000, 1.000000),
    vec3(-1.000000, -0.000000, -0.000000),
    vec3(-1.000000, -0.000000, -0.000000),
    vec3(-1.000000, -0.000000, -0.000000),
    vec3(0.000000, 0.000000, -1.000000),
    vec3(0.000000, 0.000000, -1.000000),
    vec3(0.000000, 0.000000, -1.000000),
  ];

  this.numVertices = this.vertices.length;
}