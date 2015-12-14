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

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
canvasFixDPI(canvas, context);

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
var playerImage = {
    image: document.getElementById('ship'),
    width: 20, height: 12
};
var laserImage = {
    image: document.getElementById('laser'),
    width: 1, height: 4
};
var game = new Game(canvas, context, invaderImages, playerImage, laserImage);

var spaceReleased = true;

document.addEventListener('keydown', function(event){
    if (event.keyCode === 37) {
        game.setMoveLeft(true);
    } else if (event.keyCode === 39) {
        game.setMoveRight(true);
    } else if (event.keyCode === 32 && spaceReleased) {
        spaceReleased = false;
        game.fireLaser();
    }
});

document.addEventListener('keyup', function(event){
    if (event.keyCode === 37) {
        game.setMoveLeft(false);
    } else if (event.keyCode === 39) {
        game.setMoveRight(false);
    } else if (event.keyCode === 32) {
        spaceReleased = true;
    }
});

game.start();
