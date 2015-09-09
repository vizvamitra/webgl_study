window.Scene = function(){
  this.instances = [];
  this.lights = [];
  this.renderer = undefined;
}

Scene.prototype.init = function(){
  this.renderer = new Renderer('gl-canvas');
  this.renderer.init();
  this.instances = [
    new Instance({
      mesh: 'earth',
      angles: vec3(0.0, 0.0, -23.439281)
    }),
  ];

  this.lights = [
    new LightSource({
      position: vec4(0.0, 0.0, 1.0, 0.0),
      ambient: vec4(0.5, 0.5, 0.5, 1.0),
      diffuse: vec4(1.3, 1.3, 1.3, 1.0),
      specular: vec4(1.5, 1.5, 1.5, 1.0)
    })
  ];
};

Scene.prototype.render = function(camera){
  this.renderer.loadViewProjMatrices(camera);

  this.renderer.clear();

  for(var i in this.instances){ this.renderer.render(this.instances[i], this.lights, camera); }

  // render skybox
  var oldColorMapping = settings.colorMapping;
  settings.colorMapping = true;
  this.renderer.render(
    new Instance({
      mesh: 'skybox',
      position: camera.position,
      scale: vec3(100, 100, 100)
    }),
    [
      new LightSource({
        ambient: vec4(1.0, 1.0, 1.0, 1.0),
        enabled: true
      })
    ],
    camera
  );
  settings.colorMapping = oldColorMapping;
};