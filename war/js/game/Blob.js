function Blob(settings) {
  if (settings.size) {
    var s = settings.size;
	  var matrix = Array(s*s).fill(0);
	  var c = document.createElement("canvas");
    c.width = s*2; c.height = s*2;
    var ctx = c.getContext("2d");
	  var imgData = ctx.createImageData(s*2,s*2);
    var pixData = matrix.map(function() {
    	return (Math.round(Math.random() * 3) === 1)?0:255;
    });
    for (var y = 0; y < s; y++) {
    	for (var x = 0; x < s; x++) {
      	var block = x*2+y*s*4;
      	imgData.data[(block)*4+3] = pixData[y*s+x];
        imgData.data[(block+s*2)*4+3] = pixData[y*s+x];
        imgData.data[(block+1)*4+3] = pixData[y*s+x];
        imgData.data[(block+s*2+1)*4+3] = pixData[y*s+x];
      }
    }
	  ctx.putImageData(imgData,0,0);
    this.image = new Image();
	  this.image.src = c.toDataURL("image/png");
    this.width = settings.size;
    this.height = settings.size;
  } else {
    this.image = settings.image;
    this.width = settings.width || this.image.width;
    this.height = settings.height || this.image.height;
  }
  this.x = settings.x;
  this.y = settings.y;
}

Blob.prototype = Object.create(ImageView.prototype);
Blob.prototype.constructor = Blob;
