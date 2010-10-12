var Layer = new Class({
	initialize: function() {
	},
	add: function(element) {
		element.draw();
	},
	draw: function() {
	    
	}
});

var Scene = new Class({
    initialize: function(layer) {
        this.layer = layer;
    },
    draw: function() {
        
    }
});

var Label = new Class({
    initialize: function(text) {
        this.text = text;
        this.x = 0;
        this.y = 0;
    },
    position: function(x, y) {
        this.x = x;
        this.y = y;
    },
    draw: function() {
        director.context.fillStyle = '#000';
        director.context.font = '30px sans-serif';
        director.context.textBaseline = 'top';
        director.context.fillText(this.text, this.x, this.y);        
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
/*
/*def _step(self, dt):

    if len( self.actions ) == 0:
        self.scheduled = False
        pyglet.clock.unschedule( self._step )

    for action in self.actions:
        if not action.scheduled_to_remove:
            action.step(dt)
            if action.done():
                self.remove_action( action )
*/

var Action = new Class({
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

var director = {
    init: function() {
        this.canvas = document.getElementById('magic');
        this.context = this.canvas.getContext('2d');
    },
    run: function(scene) {
        scene.draw();
        
    }
};


