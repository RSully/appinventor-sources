function Game(canvas, context, invaderImages) {
    this.canvas = canvas;
    this.context = context;

    this.padding = {x: 14, y: 19};

    this.level = 1;
    this.lifes = 3;
    this.paused = true;


    /**
     * Defined as invaders[column][row] from top-left to bottom-right
     */
    this.invaders = [];
    for (var x = 0; x < Game.INVADER_COLS; x++) {
        this.invaders.push([]);
        for (var y = 0; y < Game.INVADER_ROWS; y++) {
            this.invaders[x].push(new Invader({
                alive: true,
                images: invaderImages[y].images,
                x: this.padding.x + (x * 26),
                y: this.padding.y + (y * invaderImages[Math.max(y-1, 0)].height),
                width: 19,
                height: invaderImages[y].height
            }));
        }
    }
    /**
     * This is the direction multipler for the offset
     * so, if 1, moving right, if -1, moving left
     * This should not have a value other than -1,1;
     * speed will be handled separately
     */
    this.invadersDirection = 1;

    /**
     * How long inbetween each invader movement
     * Value in miliseconds
     */
    this.invadersDelay = 600;
    this.invadersSpeed = {x: 5, y: 5};

    this.player = null;

    this.invadersLasers = [];
    this.playersLasers = [];


    this.lastInvaderUpdate = 0;

    this.timer = new Timer({
        fps: 30,
        run: this.tick.bind(this)
    });
    this.timer.start();
    this.tick(true);
}

Game.INVADER_COLS = 10;
Game.INVADER_ROWS = 5;


/**
 * Return a flattened array of all Invader objects
 */
Game.prototype.getInvaders = function() {
    return this.invaders.reduce(function(a, b) {
        return a.concat(b);
    });
};

/**
 * Helper functions to easily get first (top left) and last (bottom right)
 * invader objects optimally (i.e. without `getInvaders()`)
 */
Game.prototype.getFirstInvader = function() {
    return this.invaders[0][0];
};
Game.prototype.getLastInvader = function() {
    return this.invaders[Game.INVADER_COLS-1][Game.INVADER_ROWS-1];
}



Game.prototype.start = function() {
    this.paused = false;
};

Game.prototype.pause = function() {
    this.paused = true;
};

Game.prototype.tick = function(forced) {
    if (this.paused && !forced) {
        return;
    }
    var currentTime = (new Date()).getTime();
    // main game loop:

    this.context.clearRect(0, 0, 320, 320);

    if (currentTime > this.lastInvaderUpdate + this.invadersDelay) {
        this.updateInvaders();
        this.lastInvaderUpdate = currentTime;
    }
    this.checkCollisions();
    this.drawInvaders();
};


Game.prototype.updateInvaders = function() {
    var all = this.getInvaders();
    var first = this.getFirstInvader();
    var last = this.getLastInvader();

    var shouldIncrementRow = false;

    // Change direction left/right:
    if (first.x <= this.padding.x) {
        this.invadersDirection = 1;
        shouldIncrementRow = true;
    } else if (last.x + last.width >= 320 - this.padding.x) {
        this.invadersDirection = -1;
        shouldIncrementRow = true;
    }

    // Limit how low the invaders may travel:
    if (last.y >= 300) {
        shouldIncrementRow = false;
        // TODO: increase speed?
    }


    all.forEach(function(invader){
        invader.incrementState();

        // TODO: only increment X if not incrementing row?
        invader.x += this.invadersDirection * this.invadersSpeed.x;

        if (shouldIncrementRow) {
            invader.y += this.invadersSpeed.y;
        }
    }.bind(this));
};

Game.prototype.drawInvaders = function() {
    this.getInvaders().forEach(function(invader) {
        invader.draw(this.context);
    }.bind(this));
};


Game.prototype.fireLaser = function() {
    // TODO
    // append to this.playersLasers
};


Game.prototype.checkCollisions = function() {
    // TODO
    // check this.playersLasers against this.getInvaders()
    // check this.invadersLasers against this.player
    // check this.invadersLasers against barriers (not implemented yet)
};
