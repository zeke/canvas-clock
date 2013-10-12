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