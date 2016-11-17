Transformer = (function() {
  function Transformer() {
    this.x = 0;
    this.y = 0;
    this.a = 0;
    this.s = 1;
    this.stack = [];
  }

  Transformer.prototype.push = function() {
    this.stack.push([this.x, this.y, this.a, this.s]);
    return push();
  };

  Transformer.prototype.pop = function() {
    var ref;
    ref = this.stack.pop(), this.x = ref[0], this.y = ref[1], this.a = ref[2], this.s = ref[3];
    return pop();
  };

  Transformer.prototype.rotate = function(da) {
    this.a += da;
    return rotate(da);
  };

  Transformer.prototype.scale = function(ds) {
    this.s *= ds;
    return scale(ds);
  };

  Transformer.prototype.translate = function(dx, dy) {
    this.x += this.s * dx * cos(this.a) - this.s * dy * sin(this.a);
    this.y += this.s * dy * cos(this.a) + this.s * dx * sin(this.a);
    return translate(dx, dy);
  };

  return Transformer;

})();
