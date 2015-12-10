function Game(canvas, context, invaderImages) {
    this.canvas = canvas;
    this.context = context;

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
                x: 14+(x*26),
                y: 19+(y*invaderImages[Math.max(y-1, 0)].height),
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

    all.forEach(function(invader){
        invader.incrementState();
    });

    var padding = 0;

    // Change direction left/right:
    if (first.x <= padding) {
        this.invadersDirection = 1;
    } else if (last.y + last.width >= 320 - padding) {
        this.invadersDirection = -1;
    }

    // TODO
    // update positions:
    // check first/last invaders to see if we need to change direction
    // var firstInvader = this.getFirstInvader();
    // var lastInvader = this.getLastInvader();
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
