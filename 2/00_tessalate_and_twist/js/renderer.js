window.Renderer = function(canvasId, tessalatorFactory){
  return {
    _gl: undefined,
    _program: undefined,
    _bufferId: undefined,
    _vPosition: undefined,

    _points: [],

    init: function(){
      this._initGL();
    },

    render: function(){
      this._gl.clear( this._gl.COLOR_BUFFER_BIT );
      this._gl.drawArrays( this._gl.TRIANGLES, 0, this._points.length );
    },

    load: function(points){
      this._points = points;

      this._gl.bindBuffer( this._gl.ARRAY_BUFFER, this._bufferId );
      this._gl.bufferData( this._gl.ARRAY_BUFFER, flatten(this._points), this._gl.STATIC_DRAW );

      this._gl.vertexAttribPointer( this._vPosition, 2, this._gl.FLOAT, false, 0, 0 );
      this._gl.enableVertexAttribArray( this._vPosition );
    },

    _initGL: function(){
      var canvas = document.getElementById(canvasId);
      this._gl = WebGLUtils.setupWebGL(canvas);
      if(!this._gl){ alert("WebGL isn't available"); }

      this._gl.viewport(0, 0, canvas.width, canvas.height);
      this._gl.clearColor(1.0, 1.0, 1.0, 1.0);

      this._program = initShaders( this._gl, "vertex-shader", "fragment-shader" );
      this._gl.useProgram( this._program );

      this._bufferId = this._gl.createBuffer();
      this._vPosition = this._gl.getAttribLocation( this._program, "vPosition" );
    },
  };
}