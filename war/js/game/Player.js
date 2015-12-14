function Player(settings) {
    ImageView.call(this, settings);

    this.lives = settings.lives || 3;
    this.score = settings.score || 0;
    /**
     * An object that signifies if the user is pressing left/right buttons
     */
    this.movement = {left: false, right: false};
}

Player.prototype = Object.create(ImageView.prototype);
Player.prototype.constructor = Player;


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
