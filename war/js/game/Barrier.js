function Laser(settings) {
    this.image = settings.image;
    this.x = settings.x;
    this.y = settings.y;
    this.width = settings.width || this.image.width;
    this.height = settings.height || this.image.height;
}

Laser.prototype.draw = function(ctx) {
    ctx.drawImage(
        this.image,
        this.x, this.y,
        this.width, this.height
    );
};
