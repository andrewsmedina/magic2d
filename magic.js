var Layer = new Class({
	initialize: function(options) {
		this.options = options;
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

var director = {
    init: function() {
        this.canvas = document.getElementById('magic');
        this.context = this.canvas.getContext('2d');
    },
    run: function(scene) {
        scene.draw();
        
    }
};


