window.TwistRenderer = function(canvasId){
  return {
    _gl: undefined,
    _program: undefined,
    _points: [],

    settings: {
      tessalationLevel: 5,
      angle: Math.PI / 2,
      keep: {
        left: true,
        top: true,
        right: true,
        middle: false,
      }
    },

    _initialTriangle: [
      vec2(-0.7,  -0.405),
      vec2(   0,  0.805),
      vec2( 0.7,  -0.405)
    ],

    init: function(){
      this._initGL();
      this.prepareData();
      this.render();
    },

    prepareData: function(){
      this._initData();
      this._twistData();
      this._loadData();
    },

    render: function(){
      this._gl.clear( this._gl.COLOR_BUFFER_BIT );
      this._gl.drawArrays( this._gl.TRIANGLES, 0, this._points.length );
    },

    _initGL: function(){
      var canvas = document.getElementById(canvasId);
      this._gl = WebGLUtils.setupWebGL(canvas);
      if(!this._gl){ alert("WebGL isn't available"); }

      this._gl.viewport(0, 0, canvas.width, canvas.height);
      this._gl.clearColor(1.0, 1.0, 1.0, 1.0);

      this._program = initShaders( this._gl, "vertex-shader", "fragment-shader" );
      this._gl.useProgram( this._program );
    },

    _initData: function(){
      var tessalator = TriangleTessalator( this.settings.keep );

      this._points = tessalator.tessalate(
        this._initialTriangle[0],
        this._initialTriangle[1],
        this._initialTriangle[2],
        this.settings.tessalationLevel
      );
    },

    _twistData: function(){
      for (var i in this._points){
        var point = this._points[i];
        var angle = this.settings.angle * Math.sqrt(dot(point, point));
        x1 = point[0]*Math.cos(angle) - point[1]*Math.sin(angle);
        y1 = point[0]*Math.sin(angle) + point[1]*Math.cos(angle);
        this._points[i] = vec2(x1, y1);
      }
    },

    _loadData: function(){
      var bufferId = this._gl.createBuffer();
      this._gl.bindBuffer( this._gl.ARRAY_BUFFER, bufferId );
      this._gl.bufferData( this._gl.ARRAY_BUFFER, flatten(this._points), this._gl.STATIC_DRAW );

      var vPosition = this._gl.getAttribLocation( this._program, "vPosition" );
      this._gl.vertexAttribPointer( vPosition, 2, this._gl.FLOAT, false, 0, 0 );
      this._gl.enableVertexAttribArray( vPosition );
    },
  };
}

var renderer;

window.onload = function (){
  renderer = TwistRenderer('gl-canvas');
  renderer.init();
}

function handleRange(evt){
  input = evt.target;
  paramName = input.id;

  renderer.settings[paramName] = parseFloat(input.value);

  output = document.getElementById(paramName+'Val');
  output.innerHTML = input.value;

  renderer.prepareData();
  renderer.render();
}

function handleCheckbox(evt){
  input = evt.target;
  paramName = input.id;

  renderer.settings.keep[paramName] = input.checked;

  renderer.prepareData();
  renderer.render();
}