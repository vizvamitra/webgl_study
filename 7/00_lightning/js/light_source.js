window.LightSource = function(options){
  options.intensity = options.intensity || {};
  options.attenuation = options.attenuation || {};

  this.position = options.position || vec4();

  this.ambient = options.ambient || vec4();
  this.diffuse = options.diffuse || vec4();
  this.specular = options.specular || vec4();

  this.attenuation = {
    constant: options.attenuation['constant'] || 1.0,
    linear: options.attenuation['linear'] || 0.0,
    exp: options.attenuation['exp'] || 0.0
  };

  this.enabled = (typeof options.enabled == 'undefined') ? true : options.enabled;
}