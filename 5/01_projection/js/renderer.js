window.Renderer = function(canvasId){
  return {
    _canvas: undefined,

    _gl: undefined,
    _program: undefined,

    _vBufferId: undefined,
    _cBufferId: undefined,
    _iBufferId: undefined,
    _vPosition: undefined,
    _vColor: undefined,
    _matrixLoc: undefined,

    _numVertices: 0,

    init: function(){
      this._initGL();
    },

    render: function(){
      this._gl.clear( this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
      this._gl.drawElements( this._gl.TRIANGLES, this._numVertices, this._gl.UNSIGNED_BYTE, 0 );
    },

    _initGL: function(){
      this._canvas = document.getElementById(canvasId);
      this._gl = WebGLUtils.setupWebGL(this._canvas);
      if(!this._gl){ alert("WebGL isn't available"); }

      this._gl.viewport(0, 0, this._canvas.width, this._canvas.height);
      this._gl.clearColor(0.0, 0.0, 0.0, 1.0);

      this._program = initShaders( this._gl, "vertex-shader", "fragment-shader" );
      this._gl.useProgram( this._program );

      this._gl.enable(this._gl.DEPTH_TEST);

      this._vBufferId = this._gl.createBuffer();
      this._vPosition = this._gl.getAttribLocation( this._program, "vPosition" );

      this._cBufferId = this._gl.createBuffer();
      this._vColor = this._gl.getAttribLocation( this._program, "vColor" );

      this._iBufferId = this._gl.createBuffer();
      
      this._matrixLoc = this._gl.getUniformLocation(this._program, 'uModelViewProjMatrix');
    },

    loadData: function(mesh){
      this._numVertices = mesh.indicies.length;

      this._gl.bindBuffer( this._gl.ARRAY_BUFFER, this._vBufferId );
      this._gl.bufferData( this._gl.ARRAY_BUFFER, flatten(mesh.points), this._gl.STATIC_DRAW );
      this._gl.vertexAttribPointer( this._vPosition, 3, this._gl.FLOAT, false, 0, 0 );
      this._gl.enableVertexAttribArray( this._vPosition );
      
      this._gl.bindBuffer( this._gl.ARRAY_BUFFER, this._cBufferId );
      this._gl.bufferData( this._gl.ARRAY_BUFFER, flatten(mesh.colors), this._gl.STATIC_DRAW );
      this._gl.vertexAttribPointer( this._vColor, 4, this._gl.FLOAT, false, 0, 0 );
      this._gl.enableVertexAttribArray( this._vColor );

      this._gl.bindBuffer( this._gl.ELEMENT_ARRAY_BUFFER, this._iBufferId );
      this._gl.bufferData( this._gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(mesh.indicies), this._gl.STATIC_DRAW );
    },

    loadMatrix: function(matrix){
      this._gl.uniformMatrix4fv(this._matrixLoc, false, flatten(matrix));
    }
  };
}