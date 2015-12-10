function Player(settings) {
    this.image = settings.image;
    this.x = settings.x;
    this.y = settings.y;
    this.width = settings.width || this.image.width;
    this.height = settings.height || this.image.height;

    /**
     * An object that signifies if the user is pressing left/right buttons
     */
    this.movement = {left: false, right: false};
}

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


Player.prototype.getImage = function() {
    return this.image;
};

Player.prototype.draw = function(ctx) {
    ctx.drawImage(
        this.image,
        this.x, this.y,
        this.width, this.height
    );
};
