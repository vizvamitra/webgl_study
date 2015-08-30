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
      mesh: 'torus_smooth',
      position: vec4(-1.5, 0.0, 0.0, 1.0)
    }),

    new Instance({
      mesh: 'sphere',
      position: vec4(1.5, 0.0, 0.0, 1.0),
    }),

    new Instance({
      mesh: 'cube',
      position: vec4(0.0, 0.0, -2.0, 1.0),
    }),

    new Instance({
      mesh: 'monkey',
      position: vec4(0.0, 0.0, 2.0, 1.0),
    }),
  ];

  this.lights = [
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

    new LightSource({
      position: vec4(2.0, 2.0, 2.0, 1.0),
      ambient: vec4(0.2, 0.0, 0.0, 1.0),
      diffuse: vec4(0.6, 0.0, 0.0, 1.0),
      specular: vec4(0.9, 0.0, 0.0, 1.0),
      attenuation: {
        constant: 1.0,
        linear: 0.2,
        exp: 0.05
      }
    }),

    new LightSource({
      position: vec4(-2.0, 2.0, 2.0, 1.0),
      ambient: vec4(0.0, 0.0, 0.2, 1.0),
      diffuse: vec4(0.0, 0.0, 0.6, 1.0),
      specular: vec4(0.0, 0.0, 0.9, 1.0),
      attenuation: {
        constant: 1.0,
        linear: 0.2,
        exp: 0.05
      },
    }),
  ];
};

Scene.prototype.render = function(camera){
  this.renderer.loadViewProjMatrices(camera);

  this.renderer.clear();

  for(var i in this.instances){ this.renderer.render(this.instances[i], this.lights, camera); }

  for(var i in this.lights){
    var light = this.lights[i];
    if (!light.enabled || light.position[3] == 0) continue;

    this.renderer.render(
      new Instance({
        mesh: 'sphere',
        position: light.position,
        scale: vec3(0.08, 0.08, 0.08)
      }),
      [
        new LightSource({
          position: vec4(0.0, 0.0, 1.0, 0.0),
          ambient: light.specular,
          diffuse: light.specular,
          enabled: true
        }),
      ],
      camera
    );
  }
};

Scene.prototype.createInstance = function(mesh){
  var instance = new Instance(mesh);
  this.instances.push(instance);
};