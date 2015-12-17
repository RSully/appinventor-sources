function Game(
    canvas, context,
    storage,
    invaderImages, mysteryInvaderImage, playerImage, laserImage
) {
    this.showStart = false;
    this.showEnd = false;

    this.canvas = canvas;
    this.context = context;
    this.padding = {x: 14, y: 40};

    this.storage = storage;
    this.highscore = parseInt(storage.getItem(Game.HIGHSCORE_KEY), 10) || 0;

    this.laserImage = laserImage;


    /**
     * Game properties
     */
    this.level = 1;
    this.paused = true;

    this.mysteryInvader = null;
    this.mysteryInvaderDirection = 0;
    this.mysteryInvaderImage = mysteryInvaderImage;

    /**
     * How long inbetween each invader movement
     * Value in miliseconds
     */
    this.invadersDelay = 600;
    this.invadersSpeed = {x: 150/1000, y: 150/1000};

    this.explodeLength = 260;

    this.barriers = [];
    for (var x = 0; x < Game.BARRIER_COLS; x++) {
        var barrierSettings = Object.create(barrierImage);
        barrierSettings.x = 38 + (x * 70);
        this.barriers[x] = new Barrier(barrierSettings);
    }

    var playerSettings = Object.create(playerImage);
    playerSettings.x = 154;
    playerSettings.y = 266;
    playerSettings.score = 0;
    this.player = new Player(playerSettings);

    this.fireDelay = 500;

    this.reset();

    this.timer = new Timer(this.tick.bind(this));
    this.timer.start();
}

Game.prototype.reset = function() {
    /**
     * This is the direction multipler for the offset
     * so, if 1, moving right, if -1, moving left
     * This should not have a value other than -1,1;
     * speed will be handled separately
     */
    this.invadersDirection = 1;

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
                // 10 points per each 2 rows starting at bottom
                points: Math.ceil((Game.INVADER_ROWS - y) / 2) * 10,
                alive: true,
                images: invaderImages[y].images,
                x: this.padding.x + (x * 26),
                y: invaderOffsetY,
                width: 19,
                height: invaderImages[y].height
            }));
        }
    }

    this.player.score = 0;
    this.player.lives = 3;

    this.lastHunterFire = 0;
    this.explodeStart = 0;
    this.player.die = false;

    this.invadersLasers = [];
    this.playersLasers = [];

    this.lastFire = 0;
    this.hunterDelay = 1500;

    this.lastInvaderUpdate = 0;
    this.lastFrameRequest = 0;
};

Game.INVADER_COLS = 10;
Game.INVADER_ROWS = 5;
Game.BARRIER_COLS = 4;
Game.HIGHSCORE_KEY = 'game_highscore';


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

Game.prototype.getClosestInvaders = function() {
    return this.getBottomMostAliveInvaders().filter(function(invader) {
        return rectIntersectsRect(game.player, {
            x: invader.x,
            y: 260,
            width: invader.width,
            height: invader.height
        });
    }).filter(function(invader) {
        return Math.abs(invader.x - game.player.x) < 10
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

Game.prototype.tick = function(timeDelta, timeCurrent) {
    if (this.showStart) {
        // todo
    } else if (this.showEnd) {
        // todo
    } else if (this.paused) {
        return;
    }
    // main game loop:

    this.context.clearRect(0, 0, 320, 320);

    this.drawInterface();


    if (timeCurrent >= this.explodeStart + this.explodeLength) {
        this.getAliveInvaders().forEach(function(invader) {
            if (invader.die) {
                invader.alive = false;
            }
        });

        if (this.mysteryInvader && this.mysteryInvader.die) {
            this.mysteryInvader = null;
        }

        if (this.player.die === 0) {
            this.explodeStart = timeCurrent;
            this.player.die = 1;
        }

        if (this.player.die === 1) {
            this.paused = true;

            setTimeout((function() {
                this.paused = true;
                this.player.lives -= 1;

                // Reset position/etc for next screen
                this.player.die = false;
                // give them a tiny bit more than normal delay:
                this.lastHunterFire = timeCurrent + 1000;
                this.player.x = 154;
                this.player.y = 266;

                this.paused = false;
            }).bind(this), 1000);
        }
    }

    var aliveInvaders = game.getAliveInvaders().length;
    this.invadersDelay = aliveInvaders * 12;

    if (aliveInvaders === 0) {
        this.reset();
        return;
    }

    if (timeCurrent >= this.lastInvaderUpdate + this.invadersDelay) {
        this.updateInvaders(timeDelta);
        this.lastInvaderUpdate = timeCurrent;

        var shootingInvader1 = this.getBottomMostAliveInvaders().getRandom();
        if (Math.round(Math.random() * 1) === 1) {
            shootingInvader1 = [];
        }
        var shootingInvader2 = this.getClosestInvaders()[0];
        if (shootingInvader1 && this.flip) {
            this.flip = false;
            this.invadersLasers.push(new Laser({
                image: this.laserImage.image,
                width: this.laserImage.width,
                height: this.laserImage.height,
                x: rectMidX(shootingInvader1),
                y: rectBottom(shootingInvader1)
            }));
        } else if (timeCurrent > this.lastHunterFire+this.hunterDelay && shootingInvader2) {
            this.flip = true;
            this.invadersLasers.push(new Laser({
                image: this.laserImage.image,
                width: this.laserImage.width,
                height: this.laserImage.height,
                x: rectMidX(shootingInvader2),
                y: rectBottom(shootingInvader2)
            }));
            this.lastHunterFire = timeCurrent;
        }

        /**
         * Handle mystery invader
         * Either update the existing one or create one randomly
         */
        if (
            this.mysteryInvader === null &&
            this.getAliveInvaders()[0].y > this.padding.y + this.mysteryInvaderImage.height + 8 &&
            Math.floor(Math.random() * 20) === 1
        ) {
            this.mysteryInvaderDirection = Math.floor(Math.random() * 2) === 1 ? -1 : 1;

            var mysteryX = this.mysteryInvaderDirection < 0 ? 320 : -1 * this.mysteryInvaderImage.width;
            var mysteryY = this.padding.y + Math.floor(Math.random() * (this.getAliveInvaders()[0].y - this.padding.y - 8))

            this.mysteryInvader = new Invader({
                // normally the points are random unless a certain # of shots
                // source: http://www.classicgaming.cc/classics/spaceinvaders/playguide.php
                // source: http://spaceinvaders.wikia.com/wiki/UFO
                points: 100,
                images: [this.mysteryInvaderImage.image],
                x: mysteryX,
                y: mysteryY,
                width: this.mysteryInvaderImage.width,
                height: this.mysteryInvaderImage.height
            });
        }
    }

    if (this.mysteryInvader) {
        this.updateMysteryInvader(timeDelta);
    }
    this.updatePlayer(timeDelta);
    this.updateLasers(timeDelta);

    this.checkCollisions();

    this.player.draw(this.context);
    this.drawInvaders();
    this.drawBarriers();
    if (this.mysteryInvader) {
        this.mysteryInvader.draw(this.context);
    }
    this.drawLasers();
};


Game.prototype.updatePlayer = function(timeDelta) {
    if (this.player.die !== false) {
        return;
    }

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

Game.prototype.updateMysteryInvader = function (timeDelta) {
    var speed = 40/1000;
    this.mysteryInvader.x += (speed * timeDelta) * this.mysteryInvaderDirection;

    /**
     * If offscreen, remove
     */
    if (this.mysteryInvader.x + this.mysteryInvader.width < 0 ||
        this.mysteryInvader.x > 320
    ) {
        this.mysteryInvader = null;
    }
};

Game.prototype.updateLasers = function(timeDelta) {
    var speed = 110/1000;
    var offset = speed * timeDelta;

    for (var i = 0; i < this.playersLasers.length; ++i) {
        var laser = this.playersLasers[i];

        laser.y -= offset*2;

        // When offscreen remove:
        if (laser.y + laser.height <= 40) {
            this.playersLasers.splice(i--, 1);
        }
    }

    for (var i = 0; i < this.invadersLasers.length; ++i) {
        var laser = this.invadersLasers[i];

        laser.y += offset;

        // When offscreen remove:
        if (laser.y + laser.height >= 320 - 16) {
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
    this.context.fillText(pad(this.player.score, 4), 18, 18);
    this.context.fillText(pad(this.highscore, 4), 148, 18);
    // this.context.fillText(pad(0, 4), 266, 18);

    // Bottom of UI
    this.context.fillText("credit    00", 248, 306);
    // lifes left
    this.context.fillText(this.player.lives, 4, 306);
    for (var i = 0; i < this.player.lives - 1; i++)
        this.context.drawImage(
            this.player.image,
            20 + (i * 26), 306,
            game.player.width, game.player.height
        );
    // green line
    this.context.beginPath();
    this.context.moveTo(0, 304);
    this.context.lineTo(320, 304);
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

Game.prototype.drawBarriers = function() {
    this.barriers.forEach(function(barrier) {
        barrier.draw(this.context);
        barrier.blobs.forEach(function(blob) {
            blob.draw(this.context);
        }.bind(this));
    }.bind(this));
};

Game.prototype.fireLaser = function() {
    var timeCurrent = performance.now();
    if (timeCurrent < this.lastFire + this.fireDelay) {
        return;
    }

    this.playersLasers.push(new Laser({
        image: this.laserImage.image,
        width: this.laserImage.width,
        height: this.laserImage.height,
        x: this.player.x + 10,
        y: this.player.y - this.laserImage.height
    }));

    this.lastFire = timeCurrent;
};

Game.prototype.setMoveLeft = function(leftPressed) {
    this.player.movement.left = leftPressed;
};

Game.prototype.setMoveRight = function(rightPressed) {
    this.player.movement.right = rightPressed;
}

Game.prototype.setScore = function(newScore) {
    this.player.score = newScore;
    if (newScore > this.highscore) {
        this.highscore = newScore;
        this.storage.setItem(Game.HIGHSCORE_KEY, newScore);
    }
}

Game.prototype.checkCollisions = function() {
    var invaders = this.getAliveInvaders();
    if (this.mysteryInvader !== null) {
        invaders.push(this.mysteryInvader);
    }
    invaders.forEach(function(invader) {
        for (var i = 0; i < this.playersLasers.length; ++i) {
            if (rectIntersectsRect(this.playersLasers[i], invader)) {
                invader.die = true;
                this.explodeStart = performance.now();
                this.setScore(this.player.score + invader.points);

                this.playersLasers.splice(i--, 1);
            }
        }
    }.bind(this));

    /**
     * If we just found a collision and he died get rid of him
     */
    if (this.mysteryInvader !== null && this.mysteryInvader.alive === false) {
        this.mysteryInvader = null;
    }

    for (var i = 0; i < this.invadersLasers.length; ++i) {
        if (rectIntersectsRect(this.invadersLasers[i], this.player)) {
            // Remove all lasers
            this.invadersLasers = [];

            // Start explosion animation
            this.player.die = 0;
            this.explodeStart = performance.now();

            // pad lives with +1 because we don't subtract until after explosion
            if (this.player.lives < 1+1) {
                // TODO
                // just start a new game for now
                this.reset();
                this.player.lives = 3;
                this.player.score = 0;
            }

            this.invadersLasers.splice(i--, 1);
        }
    }
    for (var j = 0; j < this.barriers.length; ++j) {
        Barrier.check.call(this, this.playersLasers, j, 3);
        if (this.barriers[j].blobs.length > 100) {
            continue;
        }
        Barrier.check.call(this, this.invadersLasers, j, 3);
    }
};
