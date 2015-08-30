var scene, camera, rotation;

rotation = {
  axis: vec3(0.0, 1.0, 0.0),
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
    vec4(0.0, 3.0, 6.0, 1.0),
    vec3(0.0, -0.5, -1.0),
    vec3(0.0, 1.0, -0.5)
  );
}

function mainLoop(){
  for (var i = 1; i < scene.lights.length; i++){
    scene.lights[i].position = mult(rotate(rotation.direction*rotation.speed, rotation.axis), scene.lights[i].position);
  }

  scene.render(camera);
  requestAnimFrame(mainLoop);
}

function onCheckboxSwitch(event, index){
  var checkbox = event.target;
  scene.lights[index].enabled = checkbox.checked;
}

function onRotationAxisChange(event){
  var axices = [
    vec3(1.0, 0.0, 0.0),
    vec3(0.0, 1.0, 0.0),
    vec3(0.0, 0.0, 1.0)
  ];

  event.preventDefault();
  var axisSelect = event.target;
  rotation.axis = axices[parseInt(axisSelect.value)];
}

function onRotationDirectionChange(event){
  event.preventDefault();
  rotation.direction = -rotation.direction;
}

function onRotationSpeedChange(evt, model){
  var input = evt.target;

  rotation.speed = parseFloat(input.value);

  var output = input.parentNode.getElementsByClassName('rotationSpeed')[0];
  output.innerHTML = input.value;
}
