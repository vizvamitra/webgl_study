window.Renderer = function(canvasId){
  return {
    _gl: undefined,
    _program: undefined,

    _vBufferId: undefined,
    _cBufferId: undefined,

    _vPosition: undefined,
    _vColor: undefined,

    _angleLoc: undefined,

    _pointCount: 0,
    _colorCount: 0,

    init: function(){
      this._initGL();
    },

    render: function(){
      this._gl.clear( this._gl.COLOR_BUFFER_BIT );
      this._gl.drawArrays( this._gl.TRIANGLES, 0, this._pointsCount );
    },

    _initGL: function(){
      var canvas = document.getElementById(canvasId);
      this._gl = WebGLUtils.setupWebGL(canvas);
      if(!this._gl){ alert("WebGL isn't available"); }

      this._gl.viewport(0, 0, canvas.width, canvas.height);
      this._gl.clearColor(1.0, 1.0, 1.0, 1.0);

      this._program = initShaders( this._gl, "vertex-shader", "fragment-shader" );
      this._gl.useProgram( this._program );

      this._vBufferId = this._gl.createBuffer();
      this._vPosition = this._gl.getAttribLocation( this._program, "vPosition" );

      this._cBufferId = this._gl.createBuffer();
      this._vColor = this._gl.getAttribLocation( this._program, "vColor" );

      this._angleLoc = this._gl.getUniformLocation(this._program, 'angle');
    },

    loadGeometry: function(points, colors){
      this._pointsCount = points.length;
      this._colorsCount = colors.length;

      this._gl.bindBuffer( this._gl.ARRAY_BUFFER, this._vBufferId );
      this._gl.bufferData( this._gl.ARRAY_BUFFER, flatten(points), this._gl.STATIC_DRAW );
      this._gl.vertexAttribPointer( this._vPosition, 2, this._gl.FLOAT, false, 0, 0 );
      this._gl.enableVertexAttribArray( this._vPosition );

      this._gl.bindBuffer( this._gl.ARRAY_BUFFER, this._cBufferId );
      this._gl.bufferData( this._gl.ARRAY_BUFFER, flatten(colors), this._gl.STATIC_DRAW );
      this._gl.vertexAttribPointer( this._vColor, 2, this._gl.FLOAT, false, 0, 0 );
      this._gl.enableVertexAttribArray( this._vColor );
    },

    loadUniforms: function(angle){
      this._gl.uniform1f(this._angleLoc, angle);
    }
  };
}