var renderer, controls, mousePrevPos;

window.onload = function (){
  renderer = Renderer('gl-canvas');
  renderer.init();

  controls = Controls('gl-canvas');
  controls.init();

  requestAnimFrame(renderLoop)
}

function renderLoop(){
  applyControls();
  renderer.render();
  requestAnimFrame(renderLoop)
}

function applyControls(){
  if (controls.isDrawing()){
    mousePos = controls.getMousePos();
    var start = renderer.toViewportCoords(mousePrevPos || mousePos);
    var end = renderer.toViewportCoords(mousePos);

    vertices = Brush().getVertices(start, end, controls.color, controls.size);
    renderer.loadData(vertices[0], vertices[1]);

    mousePrevPos = mousePos;
  } else {
    mousePrevPos = undefined;
  }
}