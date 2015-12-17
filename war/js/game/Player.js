function Player(settings) {
    ImageView.call(this, settings);

    this.die = false;
    this.lives = settings.lives || 3;
    this.score = settings.score || 0;
    /**
     * An object that signifies if the user is pressing left/right buttons
     */
    this.movement = {left: false, right: false};
}

Player.prototype = Object.create(ImageView.prototype);
Player.prototype.constructor = Player;


Player.prototype.getImage = function() {
    /**
     * If we're dying, grab the image for that
     * Two frames [0], [1]
     */
    if (this.die !== false) {
        return playerDeath[this.die];
    }
    return this.image;
};

/**
 * If both (or neither) keys are pressed, return 0
 * otherwise return -1 for left and 1 for right
 */
Player.prototype.getMovementMultipler = function() {
    var ret = 0;
    if (this.movement.left) { ret -= 1; }
    if (this.movement.right) { ret += 1; }
    return ret;
};
