MoveByAction = Klass({

    initialize: function(canvas, x, y, duration) {
        //FIXME o canvas está sendo passado apenas pra pegar o frameDuration.
        //eh em cima dele que é feita toda a matemática da duração e do offset
        //Definir se o frameDuration vai ser constante (=30) ou se é melhor
        //ficar passando o canvas pra todas as actions.

        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.target = null;
        // this.duration is in miliseconds
        this.duration = duration * 1000;
    },

    setTarget: function(target) {
        this.target = target;
    },

    start: function() {
        action = this;
        x_offset = this.x / this.canvas.frameDuration;
        y_offset = this.y / this.canvas.frameDuration;
        this.target.addFrameListener(function(t, dt) {
            if (t <= action.duration) {
                action.step(x_offset, y_offset)
            }
        });
    },

    step: function(x_offset, y_offset) {
        this.target.x += x_offset;
        this.target.y += y_offset;
    },

    stop: function() {
        this.target = null;
    },
});


CircleSprite = Klass(Circle, {

    initialize: function(radius, config) {
        Circle.initialize.call(this, radius, config);
    },
    
    doo: function(action) {
        action.setTarget(this);
        action.start();
    }  
});
