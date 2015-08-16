window.Scene = function(){
  this.instances = [];
  this.plane = undefined;
  this.renderer = undefined;
}

Scene.prototype.init = function(){
  this.renderer = new Renderer('gl-canvas');
  this.renderer.init();

  this.plane = new Instance(
    'cube',
    vec3(0.0, 0.0, 0.0),
    null,
    vec3(3.0, 0.001, 3.0),
    vec4(0.2, 0.2, 0.2, 1.0),
    vec4(0.2, 0.2, 0.2, 1.0)
  );
};

Scene.prototype.render = function(camera){
  this.renderer.loadViewProjMatrix(camera.viewProjMatrix());

  this.renderer.clear();

  this.renderer.render(this.plane);
  for(var i in this.instances){ this.renderer.render(this.instances[i]); }
};

Scene.prototype.createInstance = function(mesh){
  var instance = new Instance(mesh);
  this.instances.push(instance);
};

Scene.prototype.loadJson = function(json){
  this.instances = [];
  data = JSON.parse(json);

  for (var i in data){
    raw_instance = data[i];

    this.instances.push(new Instance(
      raw_instance.mesh,
      raw_instance.position,
      raw_instance.angles,
      raw_instance.scale,
      raw_instance.color,
      raw_instance.wireframeColor,
      raw_instance.name
    ));
  }
};

Scene.prototype.toJson = function(){
  return JSON.stringify(this.instances)
}