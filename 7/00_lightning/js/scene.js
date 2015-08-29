window.Scene = function(){
  this.instances = [];
  this.lights = [];
  this.renderer = undefined;
}

Scene.prototype.init = function(){
  this.renderer = new Renderer('gl-canvas');
  this.renderer.init();
  this.instances.push(new Instance('torus_smooth'));

  this.lights = [
    new LightSource({
      position: vec4(2.0, 2.0, 2.0, 1.0),
      ambient: vec4(0.0, 0.0, 0.0, 1.0),
      diffuse: vec4(0.4, 0.0, 0.0, 1.0),
      specular: vec4(0.8, 0.0, 0.0, 1.0),
      attenuation: {
        constant: 1.0,
        linear: 0.0,
        exp: 0.0
      }
    }),

    new LightSource({
      position: vec4(-2.0, 2.0, 2.0, 0.0),
      ambient: vec4(0.2, 0.2, 0.2, 1.0),
      diffuse: vec4(0.6, 0.6, 0.6, 1.0),
      specular: vec4(1.0, 1.0, 1.0, 1.0),
      attenuation: {
        constant: 1.0,
        linear: 0.0,
        exp: 0.0
      }
    }),
  ];
};

Scene.prototype.render = function(camera){
  this.renderer.loadViewProjMatrices(camera);

  this.renderer.clear();

  for(var i in this.instances){ this.renderer.render(this.instances[i], this.lights, camera); }
};

Scene.prototype.createInstance = function(mesh){
  var instance = new Instance(mesh);
  this.instances.push(instance);
};