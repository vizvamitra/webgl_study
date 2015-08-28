window.Scene = function(){
  this.instances = [];
  this.renderer = undefined;
}

Scene.prototype.init = function(){
  this.renderer = new Renderer('gl-canvas');
  this.renderer.init();
  this.instances.push(new Instance('sphere'));
};

Scene.prototype.render = function(camera, light){
  this.renderer.loadViewProjMatrix(camera);

  this.renderer.clear();

  for(var i in this.instances){ this.renderer.render(this.instances[i], light, camera); }
};

Scene.prototype.createInstance = function(mesh){
  var instance = new Instance(mesh);
  this.instances.push(instance);
};