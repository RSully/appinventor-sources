function Laser(settings) {
    ImageView.call(this, settings);
}

Laser.prototype = Object.create(ImageView.prototype);
Laser.prototype.constructor = Laser;
