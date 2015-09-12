var renderer, texture, events;

var center = vec2(-0.6, 0.0);
var scale = 0.3;

var plane = [
  vec2(-1, -1), vec2(-1, 1), vec2(1, 1),
  vec2(-1, -1), vec2(1, 1), vec2(1, -1)
]

window.onload = function(){
  initScene();

  events = new EventsEngine();
  events.init('gl-canvas');

  requestAnimFrame(mainLoop);
}


function initScene(){
  renderer = new Renderer('gl-canvas');
  renderer.init();
  renderer.loadGeometry(plane);

  // texture = new Texture(computeMandelbrot());
  texture = new Texture('palette.png')
  texture.init(renderer._gl)
}

function mainLoop(){
  renderer.render(texture);
  requestAnimFrame(mainLoop);
}