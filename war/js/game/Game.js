function Game(canvas, context, invaderImages, playerImage, laserImage) {
    this.canvas = canvas;
    this.context = context;

    this.padding = {x: 14, y: 40};

    this.level = 1;
    this.paused = true;

    // Cache this for when we create lasers dynamically
    this.laserImage = laserImage;

    /**
     * Defined as invaders[column][row] from top-left to bottom-right
     */
    this.invaders = [];
    for (var x = 0; x < Game.INVADER_COLS; x++) {
        this.invaders.push([]);
        for (var y = 0; y < Game.INVADER_ROWS; y++) {
            // Start them at the padding distance
            var invaderOffsetY = this.padding.y;
            // But as soon as you get to 2nd row,
            // just add 7 pixels to the bottom of the last
            if (y > 0) {
                var lastInvader = this.invaders[x][y-1];
                invaderOffsetY = lastInvader.y + lastInvader.height;
                invaderOffsetY += 7;
            }

            this.invaders[x].push(new Invader({
                alive: true,
                images: invaderImages[y].images,
                x: this.padding.x + (x * 26),
                y: invaderOffsetY,
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
    this.invadersSpeed = {x: 150/1000, y: 150/1000};

    var playerSettings = Object.create(playerImage);
    playerSettings.x = 154;
    playerSettings.y = 266;
    this.player = new Player(playerSettings);

    this.invadersLasers = [];
    this.playersLasers = [];


    this.lastInvaderUpdate = 0;
    this.lastFrameRequest = 0;

    this.timer = new Timer(this.tick.bind(this));
    this.timer.start();
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
 * Helper function to get invaders who are alive
 */
Game.prototype.getAliveInvaders = function() {
    return this.getInvaders().filter(function(invader) {
        return invader.alive;
    });
};

Game.prototype.getBottomMostAliveInvaders = function() {
    var invaders = [];
    for (var x = 0; x < Game.INVADER_COLS; ++x) {
        for (var y = Game.INVADER_ROWS - 1; y >= 0; --y) {
            var invader = this.invaders[x][y];
            if (invader.alive) {
                invaders.push(invader);
                break;
            }
        }
    }
    return invaders;
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

Game.prototype.tick = function(timeDelta, timeCurrent) {
    if (this.paused) {
        return;
    }
    // main game loop:

    this.context.clearRect(0, 0, 320, 320);

    this.drawInterface();

    if (timeCurrent >= this.lastInvaderUpdate + this.invadersDelay) {
        this.updateInvaders(timeDelta);
        this.lastInvaderUpdate = timeCurrent;

        // TODO: change randomness here
        // Currently this could return 0,1 so we have 50% chance:
        if (Math.floor(Math.random() * 2) === 1) {
            var shootingInvader = this.getBottomMostAliveInvaders().getRandom();
            if (shootingInvader) {
                this.invadersLasers.push(new Laser({
                    image: this.laserImage.image,
                    width: this.laserImage.width,
                    height: this.laserImage.height,
                    x: rectMidX(shootingInvader),
                    y: rectBottom(shootingInvader)
                }));
            }
        }
    }

    this.updatePlayer(timeDelta);
    this.updateLasers(timeDelta);

    this.checkCollisions();

    this.player.draw(this.context);
    this.drawInvaders();
    this.drawLasers();
};


Game.prototype.updatePlayer = function(timeDelta) {
    var speed = 60/1000;
    var direction = this.player.getMovementMultipler();

    if (direction < 0 && this.player.x <= this.padding.x) {
        speed = 0;
    } else if (direction > 0 && this.player.x + this.player.width >= 320 - this.padding.x) {
        speed = 0;
    }

    this.player.x += timeDelta * speed * direction;
};

Game.prototype.updateInvaders = function(timeDelta) {
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
    if (last.y + last.height >= 200) {
        shouldIncrementRow = false;
        // TODO: increase speed?
    }


    all.forEach(function(invader){
        invader.incrementState();

        // TODO: only increment X if not incrementing row?
        invader.x += this.invadersDirection * this.invadersSpeed.x * timeDelta;

        if (shouldIncrementRow) {
            invader.y += this.invadersSpeed.y * timeDelta;
        }
    }.bind(this));
};

Game.prototype.updateLasers = function(timeDelta) {
    var speed = 90/1000;
    var offset = speed * timeDelta;

    for (var i = 0; i < this.playersLasers.length; ++i) {
        var laser = this.playersLasers[i];

        laser.y -= offset;

        // When offscreen remove:
        if (laser.y + laser.height <= 40) {
            this.playersLasers.splice(i--, 1);
        }
    }

    for (var i = 0; i < this.invadersLasers.length; ++i) {
        var laser = this.invadersLasers[i];

        laser.y += offset;

        // When offscreen remove:
        if (laser.y >= 320) {
            this.invadersLasers.splice(i--, 1);
        }
    }
};


Game.prototype.drawInterface = function() {
    // Drawing setup
    this.context.textBaseline = 'top';
    this.context.textAlign = 'left';
    this.context.font = '10px "Space-Invaders"';
    this.context.strokeStyle = '#00ff00';
    this.context.lineWidth = 0;
    this.context.fillStyle = '#ffffff';


    // Score labels for player 1,2
    this.context.fillText("score < 1 >", 4, 2);
    this.context.fillText("hi-score", 136, 2);
    this.context.fillText("score < 2 >", 252, 2);

    // Scores for player 1, high score, player 2
    this.context.fillText("0000", 18, 18);
    this.context.fillText("0000", 148, 18);
    this.context.fillText("0000", 266, 18);

    // Bottom of UI
    this.context.fillText("credit    00", 248, 306);
    // lifes left
    this.context.fillText(this.player.lives, 4, 306);
    for (var i = 0; i < this.player.lives; i++)
      this.context.drawImage(
        this.player.getImage(),
        20+(i*26), 306,
        game.player.width, game.player.height
      );
    // green line
    this.context.beginPath();
    this.context.moveTo(0,304);
    this.context.lineTo(320,304);
    this.context.stroke();
};

Game.prototype.drawInvaders = function() {
    this.getAliveInvaders().forEach(function(invader) {
        invader.draw(this.context);
    }.bind(this));
};

Game.prototype.drawLasers = function() {
    var lasers = this.invadersLasers.concat(this.playersLasers);

    lasers.forEach(function(laser) {
        laser.draw(this.context);
    }.bind(this));
};


Game.prototype.fireLaser = function() {
    // TODO: rate limit

    this.playersLasers.push(new Laser({
        image: this.laserImage.image,
        width: this.laserImage.width,
        height: this.laserImage.height,
        x: this.player.x + 10,
        y: this.player.y - this.laserImage.height
    }));
};

Game.prototype.setMoveLeft = function(leftPressed) {
    this.player.movement.left = leftPressed;
};

Game.prototype.setMoveRight = function(rightPressed) {
    this.player.movement.right = rightPressed;
}


Game.prototype.checkCollisions = function() {
    this.getAliveInvaders().forEach(function(invader) {
        for (var i = 0; i < this.playersLasers.length; ++i) {
            if (rectIntersectsRect(this.playersLasers[i], invader)) {
                invader.alive = false;
                this.player.score += invader.points;

                this.playersLasers.splice(i--, 1);
            }
        }
    }.bind(this));

    for (var i = 0; i < this.invadersLasers.length; ++i) {
        if (rectIntersectsRect(this.invadersLasers[i], this.player)) {
            this.lifes -= 1;
            // TODO: reset the game?

            this.invadersLasers.splice(i--, 1);
        }
    }

    // TODO: check this.invadersLasers against barriers (not implemented yet)
};
