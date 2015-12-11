function Timer(callback) {
    this.callback = callback;
    this.lastTimestamp = null;
    this.id = null;
}

Timer.prototype.start = function() {
    if (this.id !== null) return;
    this.lastTimestamp = performance.now();
    this.id = window.requestAnimationFrame(this.tick.bind(this));
};

Timer.prototype.stop = function() {
    if (this.id === null) return;
    window.cancelAnimationFrame(this.id);
    this.id = null;
}

Timer.prototype.tick = function(timestamp) {
    // Call this before callback() so that you can call stop() from it:
    this.id = window.requestAnimationFrame(this.tick.bind(this));

    this.callback(timestamp - this.lastTimestamp, timestamp);
    this.lastTimestamp = timestamp;
}
