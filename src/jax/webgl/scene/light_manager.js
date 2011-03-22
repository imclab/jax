//= require "light_source"

Jax.Scene.LightManager = (function() {
  return Jax.Class.create({
    initialize: function() {
      this._lights = [];
    },
    
    add: function(light) {
      if (this._lights.length == Jax.max_lights)
        throw new Error("Maximum number of light sources in a scene has been exceeded! Try removing some first.");
      this._lights.push(light);
    },
    
    enable: function() { this.enabled = true; },
    
    disable: function() { this.enabled = false; },
    
    isEnabled: function() {
      if (arguments.length == 1) {
        if (this._lights.length > arguments[0])
          return this._lights[arguments[0]].isEnabled();
        return false;
      }
      
      if (typeof(this.enabled) != "undefined")
        return this.enabled;
      return this._lights.length > 0;
    },
    
    count: function() { return this._lights.length; },
    
    remove: function(index) {
      var result = this._lights.splice(index, 1);
      if (this._lights.length == 0) delete this.enabled;
      return result;
    },
    
    getLight: function(index) { return this._lights[index]; },
    
    getType: function(index) { return this._lights[index] ? this._lights[index].getType() : Jax.SPOT_LIGHT; },
    
    getDirection: function(index) { return this._lights[index] ? this._lights[index].getDirection() : vec3.normalize([-1,0,-1]); },
    
    getDiffuseColor: function(lightIndex) { return this._lights[lightIndex] ? this._lights[lightIndex].getDiffuseColor() : [0.6,0.6,0.6,1]; },
    
    getSpecularColor: function(lightIndex) { return this._lights[lightIndex] ? this._lights[lightIndex].getSpecularColor() : [1,1,1,1]; },
    
    getAmbientColor: function(lightIndex) { return this._lights[lightIndex] ? this._lights[lightIndex].getAmbientColor() : [0.1,0.1,0.1,1]; },
    
    getPosition: function(lightIndex) { return this._lights[lightIndex] ? this._lights[lightIndex].getPosition() : [0,0,0]; },
    
    getConstantAttenuation: function(lightIndex) { return this._lights[lightIndex] ? this._lights[lightIndex].getConstantAttenuation() : 0; },
    
    getLinearAttenuation: function(lightIndex) { return this._lights[lightIndex] ? this._lights[lightIndex].getLinearAttenuation() : 0.1; },
                                                                                                                                  
    getQuadraticAttenuation: function(lightIndex) { return this._lights[lightIndex] ? this._lights[lightIndex].getQuadraticAttenuation() : 0.0002; },
    
    getSpotCosCutoff: function(lightIndex) { return this._lights[lightIndex] ? this._lights[lightIndex].getSpotCosCutoff() : 0.1; },
    
    getSpotExponent: function(lightIndex) { return this._lights[lightIndex] ? this._lights[lightIndex].getSpotExponent() : 0; }
  });
})();
