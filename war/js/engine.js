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

var startScreen = (function() {
	ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
	ctx.font = '20px "Space-Invaders"';
	ctx.fillStyle = '#ffffff';
	ctx.fillText("Press    Start  ", 160, 70);
});

var ctx = document.getElementById('canvas').getContext('2d');
//ctx.textBaseline = 'middle';
//ctx.textAlign = 'left';
var timer = new Timer({
	fps: 30,
	run: function() {
		ctx.clearRect(0, 0, 320, 320); //be more specific
		startScreen();
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
	else audio.src = "snd/"+(parseInt(cur)+1)+".ogg";
  audio.pause();
  audio.load();
	if (audioPlay) setTimeout(function(){
  	audio.play();
	}, audioWait);
});
audio.play();

FontFaceOnload("Space-Invaders", {
    success: function() {
			//$('#a0').play();
			timer.start();
			timer.stop();
		},
    error: function() {},
    timeout: 5000
});
