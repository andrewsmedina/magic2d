var MoveBy = function(x, y, duration) {
    this.x = x;
    this.y = y;
    this.target = null;
    
    this._elapsed = 0.0;
    this._done = false;
    this.scheduled_to_remove = false;
};

MoveBy.prototype.setTarget = function(target) {
    this.target = target;
}

MoveBy.prototype.start = function() {
    this.startX = this.target.x;
    this.startY = this.target.y;
    
    this.endX = this.startX + this.x;
    this.endY = this.startY + this.y;
};

MoveBy.prototype.update = function(time) {
    this.target.x = this.startX + this.x * time;
    this.target.y = this.startY + this.y * time;
    console.log(this.target, this.target.x)
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

    initialize : function(s) {
        Circle.initialize.call(this, s);
        this.actions = [];
    },
    
    doo : function(action) {
        action.setTarget(this);
        
        action.start();
        
        this.actions.push( action );
        
        
        this.addFrameListener(function(t, dt) {
            action.step(dt)
        });
        
        
    }  
});
