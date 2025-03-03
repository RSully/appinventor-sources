// var screen1 = new AIScreen("Screen1");
// screen1.Title = new AIText(document.title);
// // screen1.ShowStatusBar = new AIBool(true);
//
// var button1 = new AIButton();
// button1.Text = new AIText('awesome');
// button1.on('Click', function() {
//     console.log('got custom click event trigger for button1: ' + this.name);
//     alert('test');
// });
var controls = document.getElementById("controls");
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
canvasFixDPI(canvas, context);
canvasFixDPI(controls, controls.getContext('2d'));

/**
 * Each invaderImages[n] represents a row
 * Each invaderImages[n][n] represents an animation state
 */
var invaderImages = [
    {
        images: [document.getElementById('enemy1_1'), document.getElementById('enemy1_2')],
        width: 19, height: 19
    },
    {
        images: [document.getElementById('enemy2_2'), document.getElementById('enemy2_1')],
        width: 19, height: 16
    },
    {
        images: [document.getElementById('enemy2_2'), document.getElementById('enemy2_1')],
        width: 19, height: 16
    },
    {
        images: [document.getElementById('enemy3_1'), document.getElementById('enemy3_2')],
        width: 19, height: 16
    },
    {
        images: [document.getElementById('enemy3_1'), document.getElementById('enemy3_2')],
        width: 19, height: 16
    }
];
var mysteryInvaderImage = {
    image: document.getElementById('enemy_mystery'),
    width: 19, height: 10
};
var playerImage = {
    image: document.getElementById('ship'),
    width: 20, height: 12
};
var laserImage = {
    image: document.getElementById('laser'),
    width: 1, height: 4
};
var barrierImage = {
    image: document.getElementById('barrier'),
    width: 33, height: 24
};
var blobImage = {
    image: document.getElementById('blob'),
    width: 8, height: 6
};
var pBlobImage = {
    image: document.getElementById('pBlob'),
    width: 8, height: 6
};

var explosionImage = document.getElementById('explosion');
var playerDeath = [document.getElementById('death0'), document.getElementById('death1')];

var ourStorage = {
    data: {},
    setItem: function(k, v) {
        this.data[k] = v;
    },
    getItem: function(k) {
        return this.data[k];
    }
};
ourStorage.setItem(Game.HIGHSCORE_KEY, Math.floor(Math.random() * 40)*10 + 300);

var game = new Game(
    canvas, context,
    ourStorage,
    invaderImages, mysteryInvaderImage, playerImage, laserImage
);

var spaceReleased = true;

document.addEventListener('touchstart', function(e){
    if (e.target.getAttribute('id') == 'left') {
        game.setMoveLeft(true);
    } else if (e.target.getAttribute('id') == 'right') {
        game.setMoveRight(true);
    } else if (e.target.getAttribute('id') == 'fire') {
        spaceReleased = false;
        game.fireLaser();
    }
});

document.addEventListener('touchend', function(e){
    console.log(e.target.getAttribute('id'));
    if (e.target.getAttribute('id') == 'left') {
        game.setMoveLeft(false);
    } else if (e.target.getAttribute('id') == 'right') {
        game.setMoveRight(false);
    } else if (e.target.getAttribute('id') == 'fire') {
        spaceReleased = true;
    } else if (e.target.getAttribute('id') == 'start') {
        game.showStart = false;
        game.showEnd = false;
        game.reset();
        game.start();
     }
});

game.showStart = true;
