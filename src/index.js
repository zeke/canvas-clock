window.domready = require('domready');
window.Clock = require('./clock');

domready(function() {
  window.clock = new Clock();
});