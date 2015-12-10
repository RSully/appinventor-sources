function Invader(settings) {
    this.alive = settings.alive || true;

    // index of image
    this.state = settings.state || 0;
    this.images = settings.images || [];

    this.x = settings.x;
    this.y = settings.y;
    this.width = settings.width || this.images[this.state].width;
    this.height = settings.height || this.images[this.state].height;
};

Invader.prototype.incrementState = function() {
    this.state += 1;
    if (this.state >= this.images.length) {
        this.state = 0;
    }
};

Invader.prototype.getImage = function() {
    return this.images[this.state];
};

Invader.prototype.draw = function(ctx) {
    ctx.drawImage(
        this.getImage(),
        this.x, this.y,
        this.width, this.height
    );
};
