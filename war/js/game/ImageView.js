function ImageView(settings) {
    this.image = settings.image;
    this.x = settings.x;
    this.y = settings.y;
    this.width = settings.width || this.image.width;
    this.height = settings.height || this.image.height;
}

ImageView.prototype.getImage = function() {
    return this.image;
};

ImageView.prototype.draw = function(ctx) {
    ctx.drawImage(
        this.getImage(),
        this.x, this.y,
        this.width, this.height
    );
};
