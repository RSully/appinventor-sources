function Player(settings) {
    this.image = settings.image;
    this.x = settings.x;
    this.y = settings.y;
    this.width = width || this.image.width;
    this.height = height || this.image.height;
}

Player.prototype.getImage = function() {
    return this.image;
};

Player.prototype.draw = function(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
};
