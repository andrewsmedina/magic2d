var MoveBy = function(x, y, duration) {
    this.x = x;
    this.y = y;
    this.target  = null
    this.duration = duration * 1000; //converto do miliseconds
};

MoveBy.prototype.setTarget = function(target) {
    this.target = target;
};

MoveBy.prototype.start = function() {
    action = this;
    x_offset = this.x / this.canvas.frameDuration;
    y_offset = this.y / this.canvas.frameDuration;
    this.target.addFrameListener(function(t, dt) {
        if (t <= action.duration) {
            action.step(x_offset, y_offset)
        }
    });    
};

MoveBy.prototype.step = function(x_offset, y_offset) {
    this.target.x += x_offset;
    this.target.y += y_offset;
};

var Sprite = function(radius, config) {
    
};

Sprite.prototype.doo = function(action) {
    action.setTarget(this);
    action.start();
};

var director = {
    init: function(width, height) {
        this.width = width;
        this.height = height;

        var canvas = Raphael(10, 50, 320, 200);
        var circle = canvas.circle(50, 40, 10);
        circle.attr("fill", "#f00");
        circle.attr("stroke", "#fff");
        
    }
    
};
var Scene = function(width, height) {
};