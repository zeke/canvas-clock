;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
  * domready (c) Dustin Diaz 2012 - License MIT
  */
!function (name, definition) {
  if (typeof module != 'undefined') module.exports = definition()
  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition)
  else this[name] = definition()
}('domready', function (ready) {

  var fns = [], fn, f = false
    , doc = document
    , testEl = doc.documentElement
    , hack = testEl.doScroll
    , domContentLoaded = 'DOMContentLoaded'
    , addEventListener = 'addEventListener'
    , onreadystatechange = 'onreadystatechange'
    , readyState = 'readyState'
    , loadedRgx = hack ? /^loaded|^c/ : /^loaded|c/
    , loaded = loadedRgx.test(doc[readyState])

  function flush(f) {
    loaded = 1
    while (f = fns.shift()) f()
  }

  doc[addEventListener] && doc[addEventListener](domContentLoaded, fn = function () {
    doc.removeEventListener(domContentLoaded, fn, f)
    flush()
  }, f)


  hack && doc.attachEvent(onreadystatechange, fn = function () {
    if (/^c/.test(doc[readyState])) {
      doc.detachEvent(onreadystatechange, fn)
      flush()
    }
  })

  return (ready = hack ?
    function (fn) {
      self != top ?
        loaded ? fn() : fns.push(fn) :
        function () {
          try {
            testEl.doScroll('left')
          } catch (e) {
            return setTimeout(function() { ready(fn) }, 50)
          }
          fn()
        }()
    } :
    function (fn) {
      loaded ? fn() : fns.push(fn)
    })
})
},{}],2:[function(require,module,exports){
window.requestAnimationFrame = require('./request-animation-frame-shim');

module.exports = (function() {
  Clock.prototype.radii = null;

  function Clock() {
    this.canvas = document.getElementById("clock");
    this.context = this.canvas.getContext("2d");
    this.clear();
    this.radii = {
      hour: this.canvas.width * .2,
      minute: this.canvas.width * .3,
      second: this.canvas.width * .4
    };
    this.strokes = {
      hour: this.canvas.width / 20,
      minute: this.canvas.width / 20,
      second: this.canvas.width / 20
    };
    this.render();
  }

  Clock.prototype.clear = function() {
    this.fitParent();
    return this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };

  Clock.prototype.render = function() {
    var angle, angles, date, endAngle, radius, startAngle, unit, x, y,
      _this = this;
    this.clear();
    date = new Date();
    angles = {
      hour: date.getHours()%12 / 12,
      minute: date.getMinutes() / 60,
      second: (date.getSeconds()+(date.getMilliseconds() / 1000)) / 60
    };
    x = this.canvas.width / 2;
    y = this.canvas.height / 2;
    startAngle = -Math.PI / 2;
    for (unit in angles) {
      angle = angles[unit];
      radius = this.radii[unit];
      endAngle = (Math.PI * 2 * angles[unit]) - Math.PI / 2;
      this.context.beginPath();
      this.context.arc(x, y, radius, startAngle, endAngle);
      this.context.lineWidth = this.strokes[unit];
      this.context.strokeStyle = '#CCC';
      this.context.stroke();
    }
    return requestAnimationFrame(function() {
      return _this.render();
    });
  };

  Clock.prototype.fitParent = function() {
    this.canvas.style.width = "100%";
    this.canvas.style.height = "100%";
    this.canvas.width = this.canvas.offsetWidth;
    return this.canvas.height = this.canvas.offsetHeight;
  };

  return Clock;

})();
},{"./request-animation-frame-shim":4}],3:[function(require,module,exports){
window.domready = require('domready');
window.Clock = require('./clock');

domready(function() {
  window.clock = new Clock();
});
},{"./clock":2,"domready":1}],4:[function(require,module,exports){
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
},{}]},{},[3])
;