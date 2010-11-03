(function(global){
	
var magic = global.magic || {};

/*
magic.Action = new Class({
    initialize: function() {
        this.duration = null;
        this.target = null;
        this.elapsed = 0;
        this._done = false;
        this.scheduledToRemove = false;
    },
    start: function() {
        
    },
    stop: function() {
        this.target = null;
    },
    step: function(dt) {
        this.elapsed += dt;
    },
    done: function() {
        return this._done;
    }
});

var Sprite = new Class({
    initialize: function(image) {
        this.image = new Image();
        this.image.src = image;
        this.actions = [];
        this.toRemove = [];
        this._count = 0;
        this.scheduled = false;
    },
    position: function(x, y) {
        this.x = x;
        this.y = y;
    },
    draw: function() {
        director.context.drawImage(this.image, this.x, this.y);
    },
    count: function() {
        this._count++;
        return this._count;
    },
    doo: function( action ) {
       action.setTarget( this );
      
       action.start();
       this.actions.push( action );
       
       if ( !this.scheduled ) {
           this.scheduled = true;
           
           var that = this;

           this._interval = setInterval(function(){
               that._step.call( that, that.count() );
           }, 1);
          
       }       
    },
    _step: function(dt) {
        
        for (action in this.toRemove) {
            if (action in this.actions) {
                this.actions.erase( action );
            }
        }
        this.toRemove = [];
        
        if ( this.actions.length === 0 ) {
            this.scheduled = false;
            clearInterval( this._step );
        }

        this.actions.each(function(action, index) {
            if ( !action.scheduledToRemove ) {
                //console.log(action, dt)
                //debugger;
                //action.step(dt);
                if ( action.done() ) {
                    this.removeAction( action );
                }
            }
            
        })
    },
    removeAction: function(action) {
        if ( action.scheduledToRemove ) {
            action.scheduledToRemove = true;
            action.stop();
            action.target = null;
            this.toRemove.push( action );
        }
    }
});

var IntervalAction = new Class({
    Extends: Action,
    step: function(dt) {
        this.elapsed += dt;
        this.update( this.elapsed/this.duration );
    },
    done: function() {
        return this.elapsed >= self.duration;
    }
});

var ScaleBy = new Class({
    Extends: IntervalAction,
    initialize: function(scale, duration) {
        this.endScale = scale;
        this.duration = duration;
    },
    setTarget: function(sprite) {
        this.sprite = sprite;
    },
    start: function() {
        this.startScale = this.sprite.scale;
        this.delta = this.startScale * this.endScale - this.startScale
    },
    update: function(t) {
        //console.log('oiee')
        this.target.scale = this.startScale + self.delta * t
    }
});
*/

global.magic = magic;

})(this);
