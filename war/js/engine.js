/*function Timer(settings) {
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
*/

function Laser() {
	this.x = shipX+10;
	this.y = 260;
	return this;
}

Laser.prototype = {
	draw: function() {
		var that = this;
		ctx.drawImage(laser,this.x,this.y,1,4);
		this.y -= 3;

		//hit check attempt
		var hit = currentState.map(function(q,i) {
  		var e = ((spaceX+19)*i)-9;
  		return that.x > e && that.x < e+30
		}).indexOf(true);
		console.log(hit);

		//kill if went too high
		if (this.y < 30) {
			this.destroy();
		}
	},
	destroy: function() {
		shipLasers.splice(shipLasers.indexOf(this),1);
	}
}

var fixHIDPI = function (canvas, context) {
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

var startScreen = function() {
	ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
	ctx.font = '20px "Space-Invaders"';
	ctx.fillStyle = '#ffffff';
	ctx.fillText("press   start", 160, 70);
};

var drawScore = function() {
	ctx.textBaseline = 'top';
  ctx.textAlign = 'left';
	ctx.font = '10px "Space-Invaders"';
	ctx.strokeStyle = '#00ff00';
	ctx.lineWidth = 0;
	ctx.fillStyle = '#ffffff';
	ctx.fillText("score < 1 >", 4, 2); //static (means player 1)
	ctx.fillText("hi-score", 136, 2);
	ctx.fillText("score < 2 >", 252, 2); //static (means player 2)
	//scoring area
	ctx.fillText("0000", 18, 18);
	ctx.fillText("0000", 148, 18);
	ctx.fillText("0000", 266, 18);
	//end scoring
	ctx.fillText("credit    00", 248, 306); //static (we dont use this)
	ctx.fillText("3", 4, 306);
	ctx.beginPath();
	ctx.moveTo(0,304);
	ctx.lineTo(320,304);
	ctx.stroke();
};

var canShoot = true;
var shipLasers = [];
var shipX = 154;
var drawShip = function() {
	ctx.drawImage(ship,shipX,266,20,12);
	shipLasers.forEach(function(e) {
		e.draw();
	});
};

var currentState = [4,4,4,4,4,4,4,4,4,4];
var spaceX = 26;
var xoff = 14;
var frame = true;
var qqq = 0;
var incr = 1;
var progY = 10;
var gameSpeed = 600;
var drawInvaders = function(timestamp) {
	//console.log();
	//LOTS OF TIMING CRAP.
	if (timestamp-qqq >= gameSpeed) {
		if (((xoff < 14 && incr) || (xoff > 56 && incr))) {
			if (progY < 10) { //should be 100; its 10 for testing
				progY += 20;
				gameSpeed *= 0.8;
				incr *= -1.3;
				xoff += incr;
			} else incr *= -1.05;
		}
		qqq = timestamp;
		//frame ^= 1;
		//xoff+=incr;
	}
	//end timing crap
	var a = (frame+1)+"";
	var b = (!frame+1)+"";
	currentState.forEach(function(e,i) {
		if (e>=0) ctx.drawImage(window['enemy1_'+a],xoff+(i*spaceX),30+progY,19,19);
		if (e>=1) ctx.drawImage(window['enemy2_'+b],xoff+(i*spaceX),56+progY,19,16);
		if (e>=2) ctx.drawImage(window['enemy2_'+b],xoff+(i*spaceX),79+progY,19,16);
		if (e>=3) ctx.drawImage(window['enemy3_'+a],xoff+(i*spaceX),102+progY,19,16);
		if (e===4) ctx.drawImage(window['enemy3_'+a],xoff+(i*spaceX),125+progY,19,16);
	});
};

var keyCheck = function(ts) {
	if (keymap.indexOf(32) != -1)  {
		if (canShoot) {
			shipLasers.push(new Laser());
			canShoot = false;
		}
	} else if (ts-qqq >= 500) canShoot = true;
	if (keymap.indexOf(37) != -1) shipX-=2;
	if (keymap.indexOf(39) != -1) shipX+=2;
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
var laser = document.getElementById("laser");


var keymap = [];

var keydown = function(e) {
	if (keymap.indexOf(e.keyCode) == -1)
		keymap.push(e.keyCode);
};

var keyup = function(e) {
	var index = keymap.indexOf(e.keyCode);
	if (index != -1) keymap.splice(index,1);
};

window.addEventListener("keydown",keydown,false);
//window.addEventListener("keypress",keyboardHandle,false);
window.addEventListener("keyup",keyup,false);

fixHIDPI(canvas, ctx);
//ctx.imageSmoothingEnabled = true;
//ctx.translate(0.5, 0.5); //fixes pixel ratio
/*
var timer = new Timer({
	fps: 30,
	run: function() {
		ctx.clearRect(0, 0, 320, 320); //be more specific
		//startScreen();
		keyCheck();
		drawInvaders();
		drawScore();
		drawShip();
	}
});*/
var render = function(ts) {
	//console.log(timestamp)
	ctx.clearRect(0, 0, 320, 320); //be more specific
	//startScreen();
	keyCheck(ts);
	drawInvaders(ts);
	drawScore();
	drawShip();
};
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
	(function animloop(timestamp){
	  requestAnimFrame(animloop);
	  render(timestamp);
	})();
	//audio.play();
	//timer.start();
	//timer.stop();
});
