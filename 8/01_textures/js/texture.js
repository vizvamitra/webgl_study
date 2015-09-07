window.Texture = function(path){
  this.id = undefined;
  this._basePath = "resources/textures/";
  this._path = path;
}

Texture.prototype.init = function(gl){
  this._gl = gl;
  this.id = this._gl.createTexture();

  this._image = new Image();
  this._image.onload = this.onTextureLoad.bind(this);
  this._image.src =  this._basePath + this._path;
}

Texture.prototype.onTextureLoad = function(){
  this._gl.bindTexture(this._gl.TEXTURE_2D, this.id);
  this._gl.pixelStorei(this._gl.UNPACK_FLIP_Y_WEBGL, true);
  this._gl.texImage2D(this._gl.TEXTURE_2D, 0, this._gl.RGBA, this._gl.RGBA, this._gl.UNSIGNED_BYTE, this._image);
  this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MAG_FILTER, this._gl.LINEAR);
  this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MIN_FILTER, this._gl.LINEAR_MIPMAP_NEAREST);
  this._gl.generateMipmap(this._gl.TEXTURE_2D);
  this._gl.bindTexture(this._gl.TEXTURE_2D, null);
}

Texture.prototype.bind = function(){
  this._gl.bindTexture(this._gl.TEXTURE_2D, this.id);
}