var controls, lines, currentLine, gl;

window.onload = function (){
  var canvas = document.getElementById('gl-canvas');
  gl = WebGLUtils.setupWebGL(canvas);

  controls = Controls('gl-canvas');
  controls.clearFunc = clear,
  controls.undoFunc = undo,
  controls.init();

  lines = [];

  requestAnimFrame(renderLoop);
}

function renderLoop(){
  applyControls();
  for (var i in lines){ lines[i].render(); }
  requestAnimFrame(renderLoop);
}

function applyControls(){
  if (controls.isDrawing()){
    if (currentLine === undefined){
      currentLine = Line(controls.getColor(), controls.getWidth());
      currentLine.init();
      lines.push(currentLine);
    }

    mousePos = controls.getMousePos();
    currentLine.addPoint(mousePos);
  } else {
    currentLine = undefined;
  }
}

function clear(){
  lines = [];
  currentLine = undefined;
  gl.clear( gl.COLOR_BUFFER_BIT );
}

function undo(){
  if(lines.length > 0){ lines.pop() }
  if(lines.length === 0){ clear() }
}