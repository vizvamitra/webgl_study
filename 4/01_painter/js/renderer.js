window.Renderer = function(canvasId){
  return {
    _canvas: undefined,

    _gl: undefined,
    _program: undefined,

    _vBufferId: undefined,
    _cBufferId: undefined,

    _vPosition: undefined,
    _vColor: undefined,

    _maxVertices: 100000,

    _count: 0,

    init: function(){
      this._initGL();
      this._initBuffers();
    },

    render: function(color, width){
      this._gl.useProgram(this._program);

      this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._vBufferId);
      this._gl.vertexAttribPointer( this._vPosition, 2, this._gl.FLOAT, false, 0, 0 );
      this._gl.enableVertexAttribArray( this._vPosition );

      this._gl.uniform4f(this._fColorLoc, color[0], color[1], color[2], color[3]);

      this._gl.drawArrays( this._gl.TRIANGLE_STRIP, 0, this._count );
    },

    _initGL: function(){
      this._canvas = document.getElementById(canvasId);
      this._gl = WebGLUtils.setupWebGL(this._canvas);
      if(!this._gl){ alert("WebGL isn't available"); }

      this._gl.viewport(0, 0, this._canvas.width, this._canvas.height);
      this._gl.clearColor(1.0, 1.0, 1.0, 1.0);

      this._program = initShaders( this._gl, "vertex-shader", "fragment-shader" );
      this._gl.useProgram( this._program );

      this._gl.enable(this._gl.BLEND);
      this._gl.blendFunc (this._gl.SRC_ALPHA, this._gl.ONE_MINUS_SRC_ALPHA);

      this._vPosition = this._gl.getAttribLocation( this._program, "vPosition" );

      this._fColorLoc = this._gl.getUniformLocation(this._program, 'fColor');
    },

    _initBuffers: function(){
      this._vBufferId = this._gl.createBuffer();
      this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._vBufferId);
      this._gl.bufferData( this._gl.ARRAY_BUFFER, sizeof['vec2']*this._maxVertices, this._gl.STATIC_DRAW );
    },

    addPoints: function(points){
      var count = this._count//(this._count === 0) ? 0 : this._count-2

      this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._vBufferId);
      this._gl.bufferSubData( this._gl.ARRAY_BUFFER, sizeof['vec2']*count, flatten(points) );

      this._count += points.length//(this._count === 0) ? points.length : points.length-2;
    },

    toViewportCoords: function(position){
      return vec2(
        -1 + 2*position[0]/this._canvas.width,
        -1 + 2*(this._canvas.height - position[1])/this._canvas.height
      );
    }
  };
}