var triangle, square, triangleRenderer, squareRenderer;

window.onload = function (){
  triangle = Triangle();
  triangle.generatePoints();
  triangle.twist();

  triangleRenderer = Renderer('gl-canvas-triangle');
  triangleRenderer.init();
  triangleRenderer.load(triangle.getPointData());
  triangleRenderer.render();

  square = Square();
  square.generatePoints();
  square.twist();

  squareRenderer = Renderer('gl-canvas-square');
  squareRenderer.init();
  squareRenderer.load(square.getPointData());
  squareRenderer.render();
}

function handleTLChange(evt, model, renderer){
  input = evt.target;

  model.settings['tessalationLevel'] = parseFloat(input.value);
  model.generatePoints();
  model.twist();

  output = input.parentNode.getElementsByClassName('tessalationLevel')[0];
  output.innerHTML = input.value;

  renderer.load(model.getPointData());
  renderer.render();
}

function handleAngleChange(evt, model, renderer){
  input = evt.target;
  angle = radians(parseFloat(input.value))

  model.settings['angle'] = angle;
  model.twist();

  output = input.parentNode.getElementsByClassName('angle')[0];
  output.innerHTML = input.value;

  renderer.load(model.getPointData());
  renderer.render();
}

function handleKeepChange(evt, i, model, renderer){
  input = evt.target;

  model.settings.keep[i] = input.checked;
  model.generatePoints();
  model.twist();

  renderer.load(model.getPointData());
  renderer.render();
}