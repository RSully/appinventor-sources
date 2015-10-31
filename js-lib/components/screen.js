function AIScreen() {
    AIBaseComponent.call(this);
};

AIScreen.properties = ["AboutScreen", "AlignHorizontal", "AlignVertical", "BackgroundColor", "AppName", "BackgroundImage", "CloseScreenAnimation", "Height", "Icon", "OpenScreenAnimation", "ScreenOrientation", "Scrollable", "ShowStatusBar", "Sizing", "TitleVisible", "VersionCode", "VersionName", "Width"];
AIScreen.events = ["BackPressed", "ErrorOccurred", "Initialize", "OtherScreenClosed", "ScreenOrientationChanged"];

AIBaseComponent.setup(AIScreen);


Object.defineProperty(AIScreen.prototype, 'Title', {
    get: function() {
        // This could actually use the default getter
        return AppInventor.getEval(this.name+":Title");
    },
    set: function(value) {
        AppInventor.sendEval('('+this.name+':setTitle "'+value+'")');
    }
});
