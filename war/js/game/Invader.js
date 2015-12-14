function Invader(settings) {
    ImageView.call(this, settings);

    this.alive = settings.alive || true;

    // index of image
    this.state = settings.state || 0;
    this.images = settings.images || [];

    this.width = settings.width || this.images[this.state].width;
    this.height = settings.height || this.images[this.state].height;
};

Invader.prototype = Object.create(ImageView.prototype);
Invader.prototype.constructor = Invader;


Invader.prototype.incrementState = function() {
    this.state += 1;
    if (this.state >= this.images.length) {
        this.state = 0;
    }
};

Invader.prototype.getImage = function() {
    return this.images[this.state];
};
