var screen1 = new AIScreen();
screen1.Title = document.title;
screen1.ShowStatusBar = new AIBool(0);

var button1 = new Button();
button1.Text = new AIText('awesome');
button1.on('Click', function() {
  alert('dude!!');
});
