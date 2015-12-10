function canvasFixDPI(canvas, context) {
    // finally query the various pixel ratios
    var devicePixelRatio = window.devicePixelRatio || 1;
    var backingStoreRatio = context.webkitBackingStorePixelRatio ||
                            context.mozBackingStorePixelRatio ||
                            context.msBackingStorePixelRatio ||
                            context.oBackingStorePixelRatio ||
                            context.backingStorePixelRatio || 1;

    // upscale the canvas if the two ratios don't match
    if (devicePixelRatio !== backingStoreRatio) {
        var ratio = devicePixelRatio / backingStoreRatio;

        var oldWidth = canvas.width;
        var oldHeight = canvas.height;

        canvas.width = oldWidth * ratio;
        canvas.height = oldHeight * ratio;

        canvas.style.width = oldWidth + 'px';
        canvas.style.height = oldHeight + 'px';

        // now scale the context to counter
        // the fact that we've manually scaled
        // our canvas element
        context.scale(ratio, ratio);
    }
};

function inRect(point, rect) {
    return (
        point.x > rect.x &&
        point.x < (rect.width + rect.x) &&
        point.y > rect.y &&
        point.y < (rect.height + rect.y)
    );
}
