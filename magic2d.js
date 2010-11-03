(function(global, undefined){


var magic = global.magic || {};


magic.Canvas = new Class({
	
	initialize: function(canvas){
		this.element = $(canvas);
		if (!this.element) this.element = new Element('canvas');
		this.context = this.element.getContext('2d');
		this.size = this.element.getSize();
		this.appendExtensions();
	},
	
	appendExtensions: function(){
		if (this.$constructor.extended) return;
		this.$constructor.extended = true;
		var context = this.context;
		for (method in this.context) if (typeof this.context[method] == 'function'){
			this.$constructor.implement(method, (function(method){
				return function(){
					var ret = context[method].apply(context, arguments);
					return (ret === undefined) ? context : ret;
				}.bind(this);
			})(method));
		}
	}
	
});


magic.Node = new Class({
	Implements: Options,
	options: {
		rotation: 0,
		scale: 1,
		parentNode: null,
		x: 0,
		y: 0,
		anchorX: 0,
		anchorY: 0
	},
	
	childrenByName: {},
	children: [],
	actions: [],
	
	initialize: function(options){
		this.setOptions(options);
	},

	get anchor(){
		return [this.options.anchorX, this.options.anchorY];
	},

	set anchor(val){
		this.options.anchorX = val[0];
		this.options.anchorY = val[1];
		return this;
	},

	get position(){
		return [this.options.x, this.options.y];
	},

	set position(val){
		this.options.x = val[0];
		this.options.y = val[1];
		return this;
	},

	add: function(child, zIndex, name){
		if (name){
			if (this.childrenByName[name]) throw 'Theres still a child with the name "'+ name +'".';
			this.childrenByName[name] = child;
		}
		if (zIndex != null) this.children.splice(zIndex, 0, child);
		else this.children.push(zIndex);
		child.parentNode = this;
		return this;
	},

	remove: function(name){
		var child = name && this.childrenByName[name];
		if (child){
			this.children.erase(child);
			delete this.childrenByName[name];
			return child;
		}
		return null;
	},

	get: function(name){
		return this.childrenByName[name] || null;
	},

	'do': function(action, target){
		target = target || this;
		action.start();
		this.actions.push(action);
		if (!this.scheduled){
			this.scheduled = true;
			var self = this;
			this._interval = setInterval(function(){
				self._step.call( self, self.count() );
			}, 1);
		}
		return action;
	}
});


magic.Scene = new Class({
	Extends: magic.Node,
	Implement: Event,
	
	initialize: function() {
		this.size = magic.director.canvas.size;
		var children = Array.flatten(arguments);
		Object.each(children, function(child, key){
			if (isFinite(key)) this.add(child, key); // adds by zIndex
			else this.add(child, null, key); // adds by name
		}, this);
	},
	
	draw: function() {
		for (var i = this.children.length; i--;) this.children[i].draw();
	}
});


magic.Label = new Class({
	Extends: magic.Node,
	
	options: {
		fillStyle: '#000',
		font: '30px sans-serif',
		textBaseline: 'top'
	},
	
	initialize: function(text, options) {
		this.text = text;
	},
	
	draw: function() {
		magic.director.canvas.context.fillStyle = this.options.fillStyle;
		magic.director.canvas.context.font = this.options.font;
		magic.director.canvas.context.textBaseline = this.options.textBaseline;
		magic.director.canvas.context.fillText(this.text, this.options.x, this.options.y);
	}
});



/*
var MoveBy = function(x, y, duration) {
	this.x = x;
	this.y = y;
	this.target = null;
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

var Scene = function(width, height) {
	push(self, scene):
};
*/

magic.director = {
	options: {
		fps: 20
	},
	
	init: function(canvas, options) {
		this.setOptions(options);
		this.canvas = new magic.Canvas(canvas);
		this.sceneStack = [];
		this.scene = null;
		this.timer = null;
	},

	push: function(scene){
		this.fireEvent('onPush', scene);
	},

	onPush: function(scene){
		this.sceneStack.push(this.scene = scene);
	},

	pop: function(){
		this.fireEvent('onPop');
	},

	onPop: function(){
		this.scene = this.sceneStack.pop();
	},

	replace: function(scene){
		this.scene = scene;
	},
	
	pause: function(){
		clearTimeout(this.timer);
		this.timer = null;
	},

	_run: function(){
		this.canvas.clearRect(0, 0, this.canvas.size.x, this.canvas.size.y);
		this.scene.draw();
	},

	run: function(scene){
		if (this.timer) return;
		this.scene = scene;
		this.timer = this._run.periodical(1000/this.options.fps, this);
	}
	
};
Object.append(magic.director, new Events);
Object.append(magic.director, new Options);

global.magic = magic;

})(this);
