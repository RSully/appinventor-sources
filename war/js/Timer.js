function Timer(settings) {
	this.settings = settings;
	this.timer = null;

	this.fps = settings.fps || 30;
	this.interval = Math.floor(1000 / 30); // should this be `1000/this.fps`?
	this.timeInit = null;
}

Timer.prototype = {
	run: function() {
		this.settings.run();
		this.timeInit += this.interval;

		this.timer = setTimeout(
			function() {
				this.run()
			}.bind(this),
			this.timeInit - (new Date).getTime()
		);
	},

	start: function() {
		if (this.timer == null) {
			this.timeInit = (new Date).getTime();
			this.run();
		}
	},

	stop: function() {
		clearTimeout(this.timer);
		this.timer = null;
	}
}
