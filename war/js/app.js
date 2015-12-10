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
var game = new Game(canvas, context, invaderImages);
game.start();
