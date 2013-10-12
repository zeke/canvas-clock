// Cross-browser requestAnimationFrame shim

// Usage:
// window.requestAnimationFrame = require('./request-animation-frame-shim');

module.exports = (function() {
  return window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function(callback, element) {
    window.setTimeout(callback, 1000 / 60);
  };
})();