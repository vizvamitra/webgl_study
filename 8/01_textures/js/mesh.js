window.Mesh = function(dataObject){
  this.dataObject = dataObject;
  this.numVertices = this.dataObject.vertices.length;

  this._vBufferId = undefined;
  this._nBufferId = undefined;
  this._tBufferId = undefined;
}

Mesh.prototype.init = function(gl, vPosition, vNormal, vTexCoord){
  this._gl = gl;
  this._vPosition = vPosition;
  this._vNormal = vNormal;
  this._vTexCoord = vTexCoord;

  this._vBufferId = this._gl.createBuffer();
  this._gl.bindBuffer( this._gl.ARRAY_BUFFER, this._vBufferId );
  this._gl.bufferData( this._gl.ARRAY_BUFFER, flatten(this.dataObject.vertices), this._gl.STATIC_DRAW );
  this._gl.vertexAttribPointer( this._vPosition, 3, this._gl.FLOAT, false, 0, 0 );
  this._gl.enableVertexAttribArray( this._vPosition );

  this._nBufferId = this._gl.createBuffer();
  this._gl.bindBuffer( this._gl.ARRAY_BUFFER, this._nBufferId );
  this._gl.bufferData( this._gl.ARRAY_BUFFER, flatten(this.dataObject.normals), this._gl.STATIC_DRAW );
  this._gl.vertexAttribPointer( this._vNormal, 3, this._gl.FLOAT, false, 0, 0 );
  this._gl.enableVertexAttribArray( this._vNormal );

  if (this.dataObject.texCoords.length > 0){
    this._tBufferId = this._gl.createBuffer();
    this._gl.bindBuffer( this._gl.ARRAY_BUFFER, this._tBufferId );
    this._gl.bufferData( this._gl.ARRAY_BUFFER, flatten(this.dataObject.texCoords), this._gl.STATIC_DRAW );
    this._gl.vertexAttribPointer( this._vTexCoord, 2, this._gl.FLOAT, false, 0, 0 );
    this._gl.enableVertexAttribArray( this._vTexCoord );
  }
}

Mesh.prototype.bind = function(){
  this._gl.bindBuffer( this._gl.ARRAY_BUFFER, this._vBufferId );
  this._gl.vertexAttribPointer( this._vPosition, 3, this._gl.FLOAT, false, 0, 0 );
  this._gl.enableVertexAttribArray( this._vPosition );

  this._gl.bindBuffer( this._gl.ARRAY_BUFFER, this._nBufferId );
  this._gl.vertexAttribPointer( this._vNormal, 3, this._gl.FLOAT, false, 0, 0 );
  this._gl.enableVertexAttribArray( this._vNormal );

  if (this.dataObject.texCoords.length > 0){
    this._gl.bindBuffer( this._gl.ARRAY_BUFFER, this._tBufferId );
    this._gl.vertexAttribPointer( this._vTexCoord, 2, this._gl.FLOAT, false, 0, 0 );
    this._gl.enableVertexAttribArray( this._vTexCoord );
  } else { this._gl.disableVertexAttribArray( this._vTexCoord ); }
}