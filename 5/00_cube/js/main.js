var renderer, cube, rotationAxis, rotationStep;

window.onload = function (){
  renderer = Renderer('gl-canvas');
  renderer.init();

  cube = Cube();
  cube.init();
  renderer.loadData(cube.mesh);

  rotation = {
    axis: 'y',
    direction: 1,
    speed: 1
  }

  cube.rotate('x', -25);

  requestAnimFrame(mainLoop);
}

function mainLoop(){
  cube.rotate(rotation.axis, rotation.direction*rotation.speed);

  renderer.loadMatrix(cube.mvpMatrix);
  renderer.render();
  requestAnimFrame(mainLoop);
}

function onRotationAxisChange(event){
  event.preventDefault();
  axisSelect = event.target;
  rotation.axis = axisSelect.value;
}

function onRotationDirectionChange(event){
  event.preventDefault();
  rotation.direction = -rotation.direction;
}

function onRotationSpeedChange(evt, model){
  input = evt.target;

  rotation.speed = parseFloat(input.value);

  output = input.parentNode.getElementsByClassName('rotationSpeed')[0];
  output.innerHTML = input.value;
}
