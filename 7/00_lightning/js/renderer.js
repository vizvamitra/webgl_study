window.Renderer = function(canvasId){
  this._canvas = document.getElementById(canvasId);

  this._gl = undefined;
  this._program = undefined;

  this._meshes = {
    cube: new Cube(),
    sphere: new Sphere(),
    torus_flat: new TorusFlat(),
    torus_smooth: new TorusSmooth(),
    monkey: new Monkey(),
  };

  this._vPosition = undefined;
  this._vNormal = undefined;

  this._uniformLocs = {
    modelMatrix: undefined,
    viewMatrix: undefined,
    projMatrix: undefined,
    normalMatrix: undefined,
    lightsCount: undefined,
    lights: [],
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

Renderer.prototype.loadViewProjMatrices = function(camera){
  this._gl.uniformMatrix4fv(this._uniformLocs.viewMatrix, false, flatten(camera.viewMatrix()));
  this._gl.uniformMatrix4fv(this._uniformLocs.projMatrix, false, flatten(camera.projMatrix()));
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
  this._uniformLocs.viewMatrix = this._gl.getUniformLocation(this._program, 'uViewMatrix');
  this._uniformLocs.projMatrix = this._gl.getUniformLocation(this._program, 'uProjMatrix');
  this._uniformLocs.normalMatrix = this._gl.getUniformLocation(this._program, 'uNormalMatrix');

  for (var i=0; i<10; i++){
    this._uniformLocs.lights.push({
      position: this._gl.getUniformLocation(this._program, 'uLights['+i+'].position'),
      ambient: this._gl.getUniformLocation(this._program, 'uLights['+i+'].ambient'),
      diffuse: this._gl.getUniformLocation(this._program, 'uLights['+i+'].diffuse'),
      specular: this._gl.getUniformLocation(this._program, 'uLights['+i+'].specular'),
      enabled: this._gl.getUniformLocation(this._program, 'uLights['+i+'].enabled'),
      attenConstant: this._gl.getUniformLocation(this._program, 'uLights['+i+'].attenConstant'),
      attenLinear: this._gl.getUniformLocation(this._program, 'uLights['+i+'].attenLinear'),
      attenExp: this._gl.getUniformLocation(this._program, 'uLights['+i+'].attenExp')
    });
  }

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

Renderer.prototype._loadUniforms = function(instance, lights, camera){
  this._gl.uniformMatrix4fv(this._uniformLocs.modelMatrix, false, flatten(instance.modelMatrix()));

  var normalMatrix = inverse(mult(camera.viewMatrix(), instance.modelMatrix()));
  this._gl.uniformMatrix4fv(this._uniformLocs.normalMatrix, false, flatten(normalMatrix));

  material = this._meshes[instance.mesh].material;
  this._gl.uniform4fv(this._uniformLocs.material.ambient, material.ambient);
  this._gl.uniform4fv(this._uniformLocs.material.diffuse, material.diffuse);
  this._gl.uniform4fv(this._uniformLocs.material.specular, material.specular);
  this._gl.uniform1f(this._uniformLocs.material.shininess, material.shininess);

  for (var i=0; i<10; i++){
    light = lights[i];
    if (light){
      var viewPosition = mult(camera.viewMatrix(), light.position);

      this._gl.uniform4fv(this._uniformLocs.lights[i].position, viewPosition);
      this._gl.uniform4fv(this._uniformLocs.lights[i].ambient, light.ambient);
      this._gl.uniform4fv(this._uniformLocs.lights[i].diffuse, light.diffuse);
      this._gl.uniform4fv(this._uniformLocs.lights[i].specular, light.specular);
      this._gl.uniform1i(this._uniformLocs.lights[i].enabled, light.enabled ? 1 : 0);
      this._gl.uniform1f(this._uniformLocs.lights[i].attenConstant, light.attenuation.constant);
      this._gl.uniform1f(this._uniformLocs.lights[i].attenLinear, light.attenuation.linear);
      this._gl.uniform1f(this._uniformLocs.lights[i].attenExp, light.attenuation.exp);
    }
  }
}