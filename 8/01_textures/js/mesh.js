window.Mesh = function(dataObject, texture, normalMap, specularMap){
  this.dataObject = dataObject;
  this.texture = texture;
  this.normalMap = normalMap;
  this.specularMap = specularMap;

  this.numVertices = this.dataObject.vertices.length;

  this._vBufferId = undefined;
  this._nBufferId = undefined;
  this._uvBufferId = undefined;
  this._tBufferId = undefined;
  this._btBufferId = undefined;
}

Mesh.prototype.init = function(gl, vPosition, vNormal, vTexCoord, vTangent, vBitangent){
  this._gl = gl;
  this._vPosition = vPosition;
  this._vNormal = vNormal;
  this._vTexCoord = vTexCoord;
  this._vTangent = vTangent;
  this._vBitangent = vBitangent;

  if(this.texture) this.texture.init(this._gl);
  if(this.normalMap) this.normalMap.init(this._gl);
  if(this.specularMap) this.specularMap.init(this._gl);

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
    this._uvBufferId = this._gl.createBuffer();
    this._gl.bindBuffer( this._gl.ARRAY_BUFFER, this._uvBufferId );
    this._gl.bufferData( this._gl.ARRAY_BUFFER, flatten(this.dataObject.texCoords), this._gl.STATIC_DRAW );
    this._gl.vertexAttribPointer( this._vTexCoord, 2, this._gl.FLOAT, false, 0, 0 );
    this._gl.enableVertexAttribArray( this._vTexCoord );
  }

  if (this.dataObject.tangents.length > 0){
    this._tBufferId = this._gl.createBuffer();
    this._gl.bindBuffer( this._gl.ARRAY_BUFFER, this._tBufferId );
    this._gl.bufferData( this._gl.ARRAY_BUFFER, flatten(this.dataObject.tangents), this._gl.STATIC_DRAW );
    this._gl.vertexAttribPointer( this._vTangent, 3, this._gl.FLOAT, false, 0, 0 );
    this._gl.enableVertexAttribArray( this._vTangent );
  }

  if (this.dataObject.bitangents.length > 0){
    this._btBufferId = this._gl.createBuffer();
    this._gl.bindBuffer( this._gl.ARRAY_BUFFER, this._btBufferId );
    this._gl.bufferData( this._gl.ARRAY_BUFFER, flatten(this.dataObject.bitangents), this._gl.STATIC_DRAW );
    this._gl.vertexAttribPointer( this._vBitangent, 3, this._gl.FLOAT, false, 0, 0 );
    this._gl.enableVertexAttribArray( this._vBitangent );
  }
}

Mesh.prototype.bind = function(){
  if (this.texture) this.texture.bind();
  if (this.normalMap) this.normalMap.bind();
  if (this.specularMap) this.specularMap.bind();

  this._gl.bindBuffer( this._gl.ARRAY_BUFFER, this._vBufferId );
  this._gl.vertexAttribPointer( this._vPosition, 3, this._gl.FLOAT, false, 0, 0 );
  this._gl.enableVertexAttribArray( this._vPosition );

  this._gl.bindBuffer( this._gl.ARRAY_BUFFER, this._nBufferId );
  this._gl.vertexAttribPointer( this._vNormal, 3, this._gl.FLOAT, false, 0, 0 );
  this._gl.enableVertexAttribArray( this._vNormal );

  if (this.dataObject.texCoords.length > 0){
    this._gl.bindBuffer( this._gl.ARRAY_BUFFER, this._uvBufferId );
    this._gl.vertexAttribPointer( this._vTexCoord, 2, this._gl.FLOAT, false, 0, 0 );
    this._gl.enableVertexAttribArray( this._vTexCoord );
  } else { this._gl.disableVertexAttribArray( this._vTexCoord ); }

  if (this.dataObject.tangents.length > 0){
    this._gl.bindBuffer( this._gl.ARRAY_BUFFER, this._tBufferId );
    this._gl.vertexAttribPointer( this._vTangent, 3, this._gl.FLOAT, false, 0, 0 );
    this._gl.enableVertexAttribArray( this._vTangent );
  } else { this._gl.disableVertexAttribArray( this._vTangent ); }

  if (this.dataObject.bitangents.length > 0){
    this._gl.bindBuffer( this._gl.ARRAY_BUFFER, this._btBufferId );
    this._gl.vertexAttribPointer( this._vBitangent, 3, this._gl.FLOAT, false, 0, 0 );
    this._gl.enableVertexAttribArray( this._vBitangent );
  } else { this._gl.disableVertexAttribArray( this._vBitangent ); }
}