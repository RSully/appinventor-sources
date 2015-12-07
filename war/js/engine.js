function Timer(settings) {
	this.settings = settings;
	this.timer = null;

	this.fps = settings.fps || 30;
	this.interval = Math.floor(1000 / 30);
	this.timeInit = null;

	return this;
}

Timer.prototype = {
	run: function() {
		var $this = this;

		this.settings.run();
		this.timeInit += this.interval;

		this.timer = setTimeout(
			function() {
				$this.run()
			},
			this.timeInit - (new Date).getTime()
		);
	},

	start: function() {
		if (this.timer == null) {
			this.timeInit = (new Date).getTime();
			this.run();
		}
	},

	stop: function() {
		clearTimeout(this.timer);
		this.timer = null;
	}
}




var fixHIDPI = function(canvas, context) {
    // finally query the various pixel ratios
        devicePixelRatio = window.devicePixelRatio || 1,
        backingStoreRatio = context.webkitBackingStorePixelRatio ||
                            context.mozBackingStorePixelRatio ||
                            context.msBackingStorePixelRatio ||
                            context.oBackingStorePixelRatio ||
                            context.backingStorePixelRatio || 1,

        ratio = devicePixelRatio / backingStoreRatio;

    // upscale the canvas if the two ratios don't match
    if (devicePixelRatio !== backingStoreRatio) {

        var oldWidth = 320;
        var oldHeight = 320;

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

var startScreen = (function() {
	ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
	ctx.font = '20px "Space-Invaders"';
	ctx.fillStyle = '#ffffff';
	ctx.fillText("press   start", 160, 70);
});

var drawScore = (function() {
	ctx.textBaseline = 'top';
  ctx.textAlign = 'left';
	ctx.font = '10px "Space-Invaders"';
	ctx.strokeStyle = '#00ff00';
	ctx.lineWidth = 0;
	ctx.fillStyle = '#ffffff';
	ctx.fillText("score < 0 >", 4, 2); //static
	ctx.fillText("hi-score", 136, 2);
	ctx.fillText("score < 4 >", 252, 2); //static
	ctx.fillText("credit    00", 248, 306); //static
	ctx.fillText("3", 4, 306);
	ctx.beginPath();
	ctx.moveTo(0,304);
	ctx.lineTo(320,304);
	ctx.stroke();
});

var xoff = 15;
var frame = true;
var drawInvaders = function() {
	var currentState = [4,4,4,4,4,4,4,4,4,4];
	var sp = 26;
	xoff+=0.1;
	frame = !frame;
	var q = (frame+1)+"";
	currentState.forEach(function(e,i) {
		ctx.drawImage(window['enemy1_'+q],xoff+(i*sp),30,19,19);
		ctx.drawImage(window['enemy2_'+q],xoff+(i*sp),56,19,16);
		ctx.drawImage(window['enemy2_'+q],xoff+(i*sp),79,19,16);
		ctx.drawImage(window['enemy3_'+q],xoff+(i*sp),102,19,16);
		ctx.drawImage(window['enemy3_'+q],xoff+(i*sp),125,19,16);
	});
};

var getFont = function() {
	return new Promise(function (resolve, reject) {
		FontFaceOnload("Space-Invaders", {
		    success: resolve,
		    error: reject,
		    timeout: 5000
		});
	});
};

var ctx = document.getElementById('canvas').getContext('2d');
var enemy1_1 = document.getElementById("enemy1_1");
var enemy1_2 = document.getElementById("enemy1_2");
var enemy2_1 = document.getElementById("enemy2_1");
var enemy2_2 = document.getElementById("enemy2_2");
var enemy3_1 = document.getElementById("enemy3_1");
var enemy3_2 = document.getElementById("enemy3_2");
var ship = document.getElementById("ship");


fixHIDPI(canvas, ctx);
//ctx.imageSmoothingEnabled = true;
//ctx.translate(0.5, 0.5); //fixes pixel ratio

var timer = new Timer({
	fps: 30,
	run: function() {
		ctx.clearRect(0, 0, 320, 320); //be more specific
		//startScreen();
		drawInvaders();
		drawScore();
	}
});
//tmp state so that speed doesn't change until loops ends
var newWait = audioWait = 300;
var audioPlay = true;
var audio = new Audio("snd/0.wav");
audio.addEventListener('ended',function(){
	var cur = audio.src.split('/').slice(-1)[0].split('.')[0]; //find which clips is playing
	if (cur == "3") {
		if (newWait != audioWait) //change after audio loops
			audioWait = newWait;
		audio.src = "snd/0.wav";
	}
	else audio.src = "snd/"+(parseInt(cur)+1)+".wav";
  audio.pause();
  audio.load();
	if (audioPlay) setTimeout(function(){
  	audio.play();
	}, audioWait);
});
//audio.play();
getFont().then(function () {
	timer.start();
	//timer.stop();
});
