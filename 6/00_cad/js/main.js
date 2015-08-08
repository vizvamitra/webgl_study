var scene, camera;

initScene()
renderUI()
requestAnimFrame(mainLoop);


function initScene(){
  scene = new Scene();
  scene.init();

  var canvas = document.getElementById('gl-canvas');
  camera = new Camera(
    canvas.width / canvas.height,
    vec3(0.0, 4.0, 8.0),
    vec3(0.0, -0.5, -1.0),
    vec3(0.0, 1.0, -0.5)
  );
}

function renderUI(){
  React.render(
    React.createElement(Controls, null),
    document.getElementById('controls-container')
  );
}

function mainLoop(){
  scene.render(camera);

  requestAnimFrame(mainLoop);
}
