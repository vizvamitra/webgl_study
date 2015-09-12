window.Renderer = function(canvasId){
  this._canvas = document.getElementById(canvasId);

  this._gl = undefined;
  this._program = undefined;

  this._vPosition = undefined;
  this._vBufferId = undefined;
  this._numVertices = undefined;

  this._uniformLocs = {
    textureId: undefined
  }
}

Renderer.prototype.init = function(){
  this._initGL();
  this._initUniformLocations();
}

Renderer.prototype.render = function(texture){
  texture.bind();
  this._loadUniforms();

  this._gl.bindBuffer( this._gl.ARRAY_BUFFER, this._vBufferId );
  this._gl.vertexAttribPointer( this._vPosition, 2, this._gl.FLOAT, false, 0, 0 );
  this._gl.enableVertexAttribArray( this._vPosition );

  this._gl.drawArrays( this._gl.TRIANGLES, 0, this._numVertices );
}

Renderer.prototype.loadGeometry = function(geometry){
  this._numVertices = geometry.length;
  
  this._vBufferId = this._gl.createBuffer();
  this._gl.bindBuffer( this._gl.ARRAY_BUFFER, this._vBufferId );
  this._gl.bufferData( this._gl.ARRAY_BUFFER, flatten(geometry), this._gl.STATIC_DRAW );
  this._gl.vertexAttribPointer( this._vPosition, 2, this._gl.FLOAT, false, 0, 0 );
  this._gl.enableVertexAttribArray( this._vPosition );
}

Renderer.prototype.clear = function(){
  this._gl.clear( this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
}

Renderer.prototype._initGL = function(){
  this._gl = WebGLUtils.setupWebGL(this._canvas);
  if(!this._gl){ alert("WebGL isn't available"); }

  this._gl.viewport(0, 0, this._canvas.width, this._canvas.height);
  this._gl.clearColor(0.0, 0.0, 0.0, 1.0);

  this._program = initShaders( this._gl, "vertex-shader", "fragment-shader" );
  this._gl.useProgram( this._program );

  this._gl.enable(this._gl.DEPTH_TEST);

  this._vPosition = this._gl.getAttribLocation( this._program, "vPosition" );
}

Renderer.prototype._initUniformLocations = function(){
  this._uniformLocs.textureId = this._gl.getUniformLocation(this._program, 'uTextureId');

  this._uniformLocs.center = this._gl.getUniformLocation(this._program, 'uCenter');
  this._uniformLocs.scale = this._gl.getUniformLocation(this._program, 'uScale');
  this._uniformLocs.n = this._gl.getUniformLocation(this._program, 'uN');
  this._uniformLocs.m = this._gl.getUniformLocation(this._program, 'uM');
}

Renderer.prototype._loadUniforms = function(){
  this._gl.uniform1i(this._uniformLocs.textureId, 0);

  this._gl.uniform2fv(this._uniformLocs.center, flatten(center));
  this._gl.uniform1f(this._uniformLocs.scale, scale);
  this._gl.uniform1f(this._uniformLocs.n, this._canvas.width);
  this._gl.uniform1f(this._uniformLocs.m, this._canvas.height);
}