var screen1 = new AIScreen("Screen1");
screen1.Title = new AIText(document.title);
// screen1.ShowStatusBar = new AIBool(true);

var button1 = new AIButton();
button1.Text = new AIText('awesome');
button1.on('Click', function() {
    console.log('got custom click event trigger for button1: ' + this.name);
    alert('test');
});

// var canvas = new AICanvas();
