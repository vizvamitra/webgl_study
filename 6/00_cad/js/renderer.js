window.Renderer = function(canvasId){
  return {
    _canvas: undefined,

    _gl: undefined,
    _program: undefined,

    _meshes: {
      cube: new Cube(),
      cone: new Cone(),
      cylinder: new Cylinder(),
      sphere: new Sphere(),
    },

    _vPosition: undefined,
    _modelMatrixLoc: undefined,
    _viewProjMatrixLoc: undefined,
    _colorLoc: undefined,

    init: function(){
      this._initGL();
      this._initMeshes();
    },

    render: function(instance){
      var mesh = this._meshes[instance.mesh];
      var numVertices = mesh.numVertices;

      this._loadModelMatrix(instance.modelMatrix());

      this._gl.bindBuffer( this._gl.ARRAY_BUFFER, mesh.vBufferId );
      this._gl.vertexAttribPointer( this._vPosition, 3, this._gl.FLOAT, false, 0, 0 );
      this._gl.enableVertexAttribArray( this._vPosition );

      this._gl.bindBuffer( this._gl.ELEMENT_ARRAY_BUFFER, mesh.iBufferId );
      
      this._gl.uniform4f(this._colorLoc, instance.color[0], instance.color[1], instance.color[2], instance.color[3]);
      this._gl.drawElements( this._gl.TRIANGLES, numVertices, this._gl.UNSIGNED_BYTE, 0 );

      this._gl.uniform4f(this._colorLoc, instance.wireframeColor[0], instance.wireframeColor[1], instance.wireframeColor[2], instance.wireframeColor[3]);
      this._gl.drawElements( this._gl.LINE_LOOP, numVertices, this._gl.UNSIGNED_BYTE, 0 );
    },

    clear: function(){
      this._gl.clear( this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
    },

    loadViewProjMatrix: function(matrix){
      this._gl.uniformMatrix4fv(this._viewProjMatrixLoc, false, flatten(matrix));
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

      this._vPosition = this._gl.getAttribLocation( this._program, "vPosition" );

      this._modelMatrixLoc = this._gl.getUniformLocation(this._program, 'uModelMatrix');
      this._viewProjMatrixLoc = this._gl.getUniformLocation(this._program, 'uViewProjMatrix');
      this._colorLoc = this._gl.getUniformLocation(this._program, 'fColor');
    },

    _initMeshes: function(){
      for(var i in this._meshes){
        var mesh = this._meshes[i];
        
        mesh.vBufferId = this._gl.createBuffer();
        this._gl.bindBuffer( this._gl.ARRAY_BUFFER, mesh.vBufferId );
        this._gl.bufferData( this._gl.ARRAY_BUFFER, flatten(mesh.points), this._gl.STATIC_DRAW );
        this._gl.vertexAttribPointer( this._vPosition, 3, this._gl.FLOAT, false, 0, 0 );
        this._gl.enableVertexAttribArray( this._vPosition );

        mesh.iBufferId = this._gl.createBuffer();
        this._gl.bindBuffer( this._gl.ELEMENT_ARRAY_BUFFER, mesh.iBufferId );
        this._gl.bufferData( this._gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(mesh.indices), this._gl.STATIC_DRAW );
      }
    },

    _loadModelMatrix: function(matrix){
      this._gl.uniformMatrix4fv(this._modelMatrixLoc, false, flatten(matrix));
    }
  };
}