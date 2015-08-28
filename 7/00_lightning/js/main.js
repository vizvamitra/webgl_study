var scene, camera, light, rotation;

rotation = {
  axis: 1,
  direction: -1,
  speed: 1
}

window.onload = function(){
  initScene();
  requestAnimFrame(mainLoop);
}


function initScene(){
  scene = new Scene();
  scene.init();

  var canvas = document.getElementById('gl-canvas');
  camera = new Camera(
    canvas.width / canvas.height,
    vec4(0.0, 2.0, 4.0, 1.0),
    vec3(0.0, -0.5, -1.0),
    vec3(0.0, 1.0, -0.5)
  );

  light = new Light(
    vec4(-2.0, 2.0, 2.0, 1.0),
    vec4(0.2, 0.2, 0.2, 1.0),
    vec4(1.0, 1.0, 1.0, 1.0),
    vec4(1.0, 1.0, 1.0, 1.0)
  );
}

function mainLoop(){
  scene.instances[0].angles[rotation.axis] += rotation.direction*rotation.speed;
  scene.render(camera, light);
  requestAnimFrame(mainLoop);
}

function onMeshChange(event){
  event.preventDefault();
  meshSelect = event.target;
  scene.instances[0].mesh = meshSelect.value;
}

function onRotationAxisChange(event){
  event.preventDefault();
  axisSelect = event.target;
  rotation.axis = parseInt(axisSelect.value);
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
