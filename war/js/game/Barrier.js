function Barrier(settings) {
    this.image = settings.image;
    this.x = settings.x;
    this.y = settings.y;
    this.width = settings.width || this.image.width;
    this.height = settings.height || this.image.height;
}

Barrier.prototype = Object.create(ImageView.prototype);
Barrier.prototype.constructor = Barrier;
