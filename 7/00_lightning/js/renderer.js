window.Renderer = function(canvasId){
  this._canvas = document.getElementById(canvasId);

  this._gl = undefined;
  this._program = undefined;

  this._meshes = {
    cube: new Cube(),
  };

  this._vPosition = undefined;
  this._vNormal = undefined;

  this._uniformLocs = {
    modelMatrix: undefined,
    viewProjMatrix: undefined,
    cameraPos: undefined,
    light: {
      color: undefined,
      direction: undefined,
      aIntensity: undefined,
      dIntensity: undefined
    },
    material: {
      ka: undefined,
      kd: undefined,
      ks: undefined,
      ns: undefined
    }
  }
}

Renderer.prototype.init = function(){
  this._initGL();
  this._initUniformLocations();
  this._initMeshes();
}

Renderer.prototype.render = function(instance, light, camera){
  var mesh = this._meshes[instance.mesh];
  var numVertices = mesh.numVertices;

  this._loadUniforms(instance, light, camera);

  this._gl.bindBuffer( this._gl.ARRAY_BUFFER, mesh.vBufferId );
  this._gl.vertexAttribPointer( this._vPosition, 3, this._gl.FLOAT, false, 0, 0 );
  this._gl.enableVertexAttribArray( this._vPosition );

  this._gl.bindBuffer( this._gl.ARRAY_BUFFER, mesh.nBufferId );
  this._gl.vertexAttribPointer( this._vNormal, 3, this._gl.FLOAT, false, 0, 0 );
  this._gl.enableVertexAttribArray( this._vNormal );

  this._gl.drawArrays( this._gl.TRIANGLES, 0, numVertices );
}

Renderer.prototype.clear = function(){
  this._gl.clear( this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
}

Renderer.prototype.loadViewProjMatrix = function(matrix){
  this._gl.uniformMatrix4fv(this._uniformLocs.viewProjMatrix, false, flatten(matrix));
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
  this._vNormal = this._gl.getAttribLocation( this._program, "vNormal" );
}

Renderer.prototype._initUniformLocations = function(){
  this._uniformLocs.modelMatrix = this._gl.getUniformLocation(this._program, 'uModelMatrix');
  this._uniformLocs.viewProjMatrix = this._gl.getUniformLocation(this._program, 'uViewProjMatrix');
  this._uniformLocs.cameraPos = this._gl.getUniformLocation(this._program, 'uCameraPos');

  this._uniformLocs.light.color = this._gl.getUniformLocation(this._program, 'uLight.color');
  this._uniformLocs.light.direction = this._gl.getUniformLocation(this._program, 'uLight.direction');
  this._uniformLocs.light.aIntensity = this._gl.getUniformLocation(this._program, 'uLight.aIntensity');
  this._uniformLocs.light.dIntensity = this._gl.getUniformLocation(this._program, 'uLight.dIntensity');

  this._uniformLocs.material.ka = this._gl.getUniformLocation(this._program, 'uMaterial.ka');
  this._uniformLocs.material.kd = this._gl.getUniformLocation(this._program, 'uMaterial.kd');
  this._uniformLocs.material.ks = this._gl.getUniformLocation(this._program, 'uMaterial.ks');
  this._uniformLocs.material.ns = this._gl.getUniformLocation(this._program, 'uMaterial.ns');
};

Renderer.prototype._initMeshes = function(){
  for(var i in this._meshes){
    var mesh = this._meshes[i];
    
    mesh.vBufferId = this._gl.createBuffer();
    this._gl.bindBuffer( this._gl.ARRAY_BUFFER, mesh.vBufferId );
    this._gl.bufferData( this._gl.ARRAY_BUFFER, flatten(mesh.vertices), this._gl.STATIC_DRAW );
    this._gl.vertexAttribPointer( this._vPosition, 3, this._gl.FLOAT, false, 0, 0 );
    this._gl.enableVertexAttribArray( this._vPosition );

    mesh.nBufferId = this._gl.createBuffer();
    this._gl.bindBuffer( this._gl.ARRAY_BUFFER, mesh.nBufferId );
    this._gl.bufferData( this._gl.ARRAY_BUFFER, flatten(mesh.normals), this._gl.STATIC_DRAW );
    this._gl.vertexAttribPointer( this._vNormal, 3, this._gl.FLOAT, false, 0, 0 );
    this._gl.enableVertexAttribArray( this._vNormal );
  }
}

Renderer.prototype._loadUniforms = function(instance, light, camera){
  this._gl.uniformMatrix4fv(this._uniformLocs.modelMatrix, false, flatten(instance.modelMatrix()));
  this._gl.uniform3f(this._uniformLocs.cameraPos, camera.position[0], camera.position[1], camera.position[2]);

  material = this._meshes[instance.mesh].material;
  this._gl.uniform3f(this._uniformLocs.material.ka, material.Ka[0], material.Ka[1], material.Ka[2]);
  this._gl.uniform3f(this._uniformLocs.material.kd, material.Kd[0], material.Kd[1], material.Kd[2]);
  this._gl.uniform3f(this._uniformLocs.material.ks, material.Ks[0], material.Ks[1], material.Ks[2]);
  this._gl.uniform1f(this._uniformLocs.material.ns, material.Ns);

  this._gl.uniform3f(this._uniformLocs.light.color, light.color[0], light.color[1], light.color[2]);
  this._gl.uniform3f(this._uniformLocs.light.direction, light.direction[0], light.direction[1], light.direction[2]);
  this._gl.uniform1f(this._uniformLocs.light.aIntensity, light.aIntensity);
  this._gl.uniform1f(this._uniformLocs.light.dIntensity, light.dIntensity);
}