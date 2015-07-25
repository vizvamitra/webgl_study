var triangle, square;

window.onload = function (){
  var triangleRenderer = Renderer('gl-canvas-triangle');
  triangle = Triangle(triangleRenderer);
  triangle.init();
  triangle.render();

  var squareRenderer = Renderer('gl-canvas-square');
  square = Square(squareRenderer);
  square.init();
  square.render();
}

function handleTLChange(evt, model){
  input = evt.target;

  model.settings['tessalationLevel'] = parseFloat(input.value);
  model.generatePoints();
  model.twist();

  output = input.parentNode.getElementsByClassName('tessalationLevel')[0];
  output.innerHTML = input.value;

  model.render();
}

function handleAngleChange(evt, model){
  input = evt.target;
  angle = radians(parseFloat(input.value))

  model.settings['angle'] = angle;
  model.twist();

  output = input.parentNode.getElementsByClassName('angle')[0];
  output.innerHTML = input.value;

  model.render();
}

function handleKeepChange(evt, i, model){
  input = evt.target;

  model.settings.keep[i] = input.checked;
  model.generatePoints();
  model.twist();

  model.render();
}