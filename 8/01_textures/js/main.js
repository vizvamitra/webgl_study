var scene, camera, events, rotation, settings;

settings = {
  normalMapping: true,
  rotation: true,
  rotationSpeed: 0.2
}

window.onload = function(){
  initScene();
  requestAnimFrame(mainLoop);
}


function initScene(){
  scene = new Scene();
  scene.init();

  events = new EventsEngine();
  events.init('gl-canvas');

  var canvas = document.getElementById('gl-canvas');
  camera = new Camera();
  camera.setPerspective(canvas.width / canvas.height);
  camera.distance = 3;
  camera.angles.vertical = 0;
  camera.angles.horisontal = 0;
  camera.update();
}

function mainLoop(){
  if (settings.rotation) scene.instances[0].angles[1] += settings.rotationSpeed;

  camera.update();

  scene.render(camera);
  requestAnimFrame(mainLoop);
}

function onCheckboxSwitch(event){
  var checkbox = event.target;
  settings[checkbox.name] = checkbox.checked;
}

// function onRotationAxisChange(event){
//   var axices = [
//     vec3(1.0, 0.0, 0.0),
//     vec3(0.0, 1.0, 0.0),
//     vec3(0.0, 0.0, 1.0)
//   ];

//   event.preventDefault();
//   var axisSelect = event.target;
//   rotation.axis = axices[parseInt(axisSelect.value)];
// }

// function onRotationDirectionChange(event){
//   event.preventDefault();
//   rotation.direction = -rotation.direction;
// }

function onRotationSpeedChange(evt, model){
  var input = evt.target;

  settings.rotationSpeed = parseFloat(input.value);

  var output = input.parentNode.getElementsByClassName('rotationSpeed')[0];
  output.innerHTML = input.value;
}
