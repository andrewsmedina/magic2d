var MoveBy = function(x, y, duration) {
    this.x = x;
    this.y = y;
    this.target = null;
    this.duration = duration;
    this._elapsed = 0.0;
    this._done = false;
    this.scheduled_to_remove = false;
};

MoveBy.prototype.setTarget = function(target) {
    this.target = target;
};

MoveBy.prototype.start = function() {
    this.startX = this.target.x;
    this.startY = this.target.y;
    
    this.endX = this.startX + this.x;
    this.endY = this.startY + this.y;

    action = this;  
    
    this.target.addFrameListener(function(t, dt) {
        action.step(dt)
    });
  
};

MoveBy.prototype.update = function(time) {
    this.target.x = this.target.x + 2;//this.x * time;
    this.target.y = this.target.y + 2;//this.y * time;
};

MoveBy.prototype.done = function() {
    return this._elapsed >= this.duration;
};

MoveBy.prototype.step = function(dt) {
    this._elapsed += dt;
    
    this.update( this._elapsed/this.duration );
};

MoveBy.prototype.stop = function() {
    this.target = null;
};

CircleSprite = Klass(Circle, {

    initialize : function(radius, config) {
        Circle.initialize.call(this, radius, config);
        this.actions = [];
    },
    
    doo : function(action) {
        action.setTarget(this);
        
        action.start();
        
        this.actions.push( action );
        
    }  
});
