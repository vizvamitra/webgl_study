window.Scene = function(){
  this.instances = [];
  this.currentInstance = undefined;
  this.plane = undefined;
  this.renderer = undefined;

  this.init = function(){
    this.renderer = Renderer('gl-canvas');
    this.renderer.init();

    this.plane = Instance(
      'cube',
      vec3(0.0, 0.0, 0.0),
      null,
      vec3(3.0, 0.001, 3.0),
      vec4(0.2, 0.2, 0.2, 1.0),
      vec4(0.2, 0.2, 0.2, 1.0)
    );
  };

  this.render = function(camera){
    this.renderer.loadViewProjMatrix(camera.viewProjMatrix());

    this.renderer.clear();

    this.renderer.render(this.plane);
    for(var i in this.instances){ this.renderer.render(this.instances[i]); }
  };

  this.createInstance = function(mesh){
    var instance = Instance(mesh);
    this.instances.push(instance);
  };

  this.isCurrent = function(instance){
    return this.currentInstance === instance;
  }
}