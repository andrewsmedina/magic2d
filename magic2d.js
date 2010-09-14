MoveByAction = Klass({

    initialize: function(canvas, x, y, duration) {
        //FIXME o canvas está sendo passado apenas pra pegar o frameDuration.
        //eh em cima dele que é feita toda a matemática da duração e do offset
        //Definir se o frameDuration vai ser constante (=30) ou se é melhor
        //ficar passando o canvas pra todas as actions.

        this.x = x;
        this.y = y;
        this.target = null;
        this.duration = duration * 1000; //duration in ms
        this._elapsed = 0.0;
        this._done = false;
        this.scheduled_to_remove = false;
        this.canvas = canvas;

    },

    setTarget: function(target) {
        this.target = target;
    },

    start: function() {
        this.x_offset = this.x / (this.duration / this.canvas.frameDuration)
        this.y_offset = this.y / (this.duration / this.canvas.frameDuration)

        action = this; 

        this.target.addFrameListener(function(t, dt) {
            if (t <= action.duration) {
                action.step(action.x_offset, action.y_offset)
            }
        });
    },

    done: function() { // useless?
        return this._elapsed >= this.duration;
    },

    step: function(x_offset, y_offset) {
        this.target.x = this.target.x + x_offset;
        this.target.y = this.target.y + y_offset;
    },

    stop: function() {
        this.target = null;
    },
});


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
