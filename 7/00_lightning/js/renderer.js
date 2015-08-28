window.Renderer = function(canvasId){
  this._canvas = document.getElementById(canvasId);

  this._gl = undefined;
  this._program = undefined;

  this._meshes = {
    cube: new Cube(),
    sphere: new Sphere(),
  };

  this._vPosition = undefined;
  this._vNormal = undefined;

  this._uniformLocs = {
    modelMatrix: undefined,
    viewMatrix: undefined,
    projMatrix: undefined,
    light: {
      position: undefined,
      ambient: undefined,
      diffuse: undefined,
      specular: undefined
    },
    material: {
      ambient: undefined,
      diffuse: undefined,
      specular: undefined,
      shininess: undefined
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

Renderer.prototype.loadViewProjMatrix = function(camera){
  this._gl.uniformMatrix4fv(this._uniformLocs.viewProjMatrix, false, flatten(camera.viewProjMatrix()));
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
  this._uniformLocs.lightPosition = this._gl.getUniformLocation(this._program, 'uLightPosition');

  this._uniformLocs.light.position = this._gl.getUniformLocation(this._program, 'uLight.position');
  this._uniformLocs.light.ambient = this._gl.getUniformLocation(this._program, 'uLight.ambient');
  this._uniformLocs.light.diffuse = this._gl.getUniformLocation(this._program, 'uLight.diffuse');
  this._uniformLocs.light.specular = this._gl.getUniformLocation(this._program, 'uLight.specular');

  this._uniformLocs.material.ambient = this._gl.getUniformLocation(this._program, 'uMaterial.ambient');
  this._uniformLocs.material.diffuse = this._gl.getUniformLocation(this._program, 'uMaterial.diffuse');
  this._uniformLocs.material.specular = this._gl.getUniformLocation(this._program, 'uMaterial.specular');
  this._uniformLocs.material.shininess = this._gl.getUniformLocation(this._program, 'uMaterial.shininess');
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
  this._gl.uniform4fv(this._uniformLocs.lightPosition, light.position);

  material = this._meshes[instance.mesh].material;
  this._gl.uniform4fv(this._uniformLocs.material.ambient, material.ambient);
  this._gl.uniform4fv(this._uniformLocs.material.diffuse, material.diffuse);
  this._gl.uniform4fv(this._uniformLocs.material.specular, material.specular);
  this._gl.uniform1f(this._uniformLocs.material.shininess, material.shininess);

  this._gl.uniform4fv(this._uniformLocs.light.position, light.position);
  this._gl.uniform4fv(this._uniformLocs.light.ambient, light.ambient);
  this._gl.uniform4fv(this._uniformLocs.light.diffuse, light.diffuse);
  this._gl.uniform4fv(this._uniformLocs.light.specular, light.specular);
}