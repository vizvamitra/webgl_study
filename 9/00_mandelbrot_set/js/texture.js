window.Texture = function(path){
  this.id = undefined;
  this._basePath = "textures/";
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
  this._gl.texImage2D(this._gl.TEXTURE_2D, 0, this._gl.RGBA, this._gl.RGBA, this._gl.UNSIGNED_BYTE, this._image);
  this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MAG_FILTER, this._gl.NEAREST);
  this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MIN_FILTER, this._gl.NEAREST);
  this._gl.bindTexture(this._gl.TEXTURE_2D, null);
}

Texture.prototype.bind = function(){
  this._gl.bindTexture(this._gl.TEXTURE_2D, this.id);
}