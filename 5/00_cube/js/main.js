var renderer, cube;

window.onload = function (){
  renderer = Renderer('gl-canvas');
  renderer.init();

  cube = Cube();
  cube.init();
  cube.rotate('x', -25);

  renderer.loadData(cube.mesh);
  requestAnimFrame(mainLoop);
}

function mainLoop(){
  cube.rotate('y', 1);

  renderer.loadMatrix(cube.mvpMatrix);
  renderer.render();
  requestAnimFrame(mainLoop);
}