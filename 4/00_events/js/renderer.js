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
    },

    render: function(){
      this._gl.clear( this._gl.COLOR_BUFFER_BIT );
      this._gl.drawArrays( this._gl.TRIANGLES, 0, this._count );
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

      this._vBufferId = this._gl.createBuffer();
      this._gl.bindBuffer( this._gl.ARRAY_BUFFER, this._vBufferId );
      this._gl.bufferData( this._gl.ARRAY_BUFFER, sizeof['vec2']*this._maxVertices, this._gl.STATIC_DRAW );

      this._vPosition = this._gl.getAttribLocation( this._program, "vPosition" );
      this._gl.vertexAttribPointer( this._vPosition, 2, this._gl.FLOAT, false, 0, 0 );
      this._gl.enableVertexAttribArray( this._vPosition );
      
      this._cBufferId = this._gl.createBuffer();
      this._gl.bindBuffer( this._gl.ARRAY_BUFFER, this._cBufferId );
      this._gl.bufferData( this._gl.ARRAY_BUFFER, sizeof['vec4']*this._maxVertices, this._gl.STATIC_DRAW );

      this._vColor = this._gl.getAttribLocation( this._program, "vColor" );
      this._gl.vertexAttribPointer( this._vColor, 4, this._gl.FLOAT, false, 0, 0 );
      this._gl.enableVertexAttribArray( this._vColor );
    },

    loadData: function(points, colors){
      this._gl.bindBuffer( this._gl.ARRAY_BUFFER, this._vBufferId );
      this._gl.bufferSubData( this._gl.ARRAY_BUFFER, sizeof['vec2']*this._count, flatten(points));

      this._gl.bindBuffer( this._gl.ARRAY_BUFFER, this._cBufferId );
      this._gl.bufferSubData( this._gl.ARRAY_BUFFER, sizeof['vec4']*this._count, flatten(colors));

      this._count += points.length;
    },

    toViewportCoords: function(mousePos){
      return vec2(
        -1 + 2*mousePos[0]/this._canvas.width,
        -1 + 2*(this._canvas.height - mousePos[1])/this._canvas.height
      );
    }
  };
}