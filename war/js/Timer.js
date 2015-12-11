function Timer(callback) {
    this.callback = callback;
    this.lastTimestamp = null;
    this.id = null;
}

Timer.MAX_LAG = 100;

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

    var delta = timestamp - this.lastTimestamp;
    /**
     * If delta is too high then we're going to act as if the loop was paused
     * This is a good indication that the browser was not in the foreground
     * for this period of time.
     */
    if (delta > Timer.MAX_LAG) {
        this.lastTimestamp = timestamp;
        return;
    }

    this.callback(delta, timestamp);
    this.lastTimestamp = timestamp;
}
