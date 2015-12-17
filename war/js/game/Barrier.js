function Barrier(settings) {
    this.image = settings.image;
    this.x = settings.x;
    this.y = settings.y || 232;
    this.width = settings.width || this.image.width;
    this.height = settings.height || this.image.height;
    this.blobs = [];
}

Barrier.prototype = Object.create(ImageView.prototype);
Barrier.prototype.constructor = Barrier;

/**
 * Assume `this` is a Game instance
 */
Barrier.check = function(groupLasers, j, tolerance) {
    for (var i = 0; i < groupLasers.length; ++i) {
        var laser = groupLasers[i];
        if (rectIntersectsRect(laser, this.barriers[j])) {
            var amt = this.barriers[j].blobs.filter(function(blob) {
                return rectIntersectsRect(laser, blob);
            }).length;
            var playerCheck = groupLasers === this.playersLasers;
            if (amt < tolerance) {
                var blobSettings = Object.create(playerCheck?pBlobImage:blobImage);
                blobSettings.x = Math.floor(laser.x-6);
                blobSettings.y = Math.floor(laser.y);
                blobSettings.x += (blobSettings.x%4);
                if (blobSettings.y < 228) {
                    blobSettings.y += (playerCheck?-1:1)*2;
                }
                this.barriers[j].blobs.push(new Blob(blobSettings));
                groupLasers.splice(i--, 1);
            } else if (amt == tolerance) {
                var playerCheck = groupLasers === this.playersLasers;
                var blobSettings = Object.create(blobImage);
                blobSettings.x = Math.floor(laser.x-6);
                blobSettings.y = Math.floor(laser.y)//-playerCheck?4:0;
                blobSettings.size = playerCheck?6:8;
                // if (amt > 10) console.log(amt);
                this.barriers[j].blobs.push(new Blob(blobSettings));
                groupLasers.splice(i--, 1);
                //if (playerCheck) groupLasers.splice(i--, 1);
            }
        }
    }
}
