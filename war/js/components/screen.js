function AIScreen(existingName) {
    AIBaseComponent.call(this, existingName);
};

AIScreen.properties = [
    "AboutScreen",
    "AlignHorizontal",
    "AlignVertical",
    "BackgroundColor",
    "AppName",
    "BackgroundImage",
    "CloseScreenAnimation",
    "Height",
    "Icon",
    "OpenScreenAnimation",
    "ScreenOrientation",
    "Scrollable",
    "ShowStatusBar",
    "Sizing",
    "TitleVisible",
    "VersionCode",
    "VersionName",
    "Width"
];
AIScreen.events = {
    "BackPressed": [],
    "ErrorOccurred": [
        "component", "text", "number", "text"
    ],
    "Initialize": [],
    "OtherScreenClosed": [
        "text", "any"
    ],
    "ScreenOrientationChanged": []
};

AIBaseComponent.setup(AIScreen);


Object.defineProperty(AIScreen.prototype, 'Title', {
    get: function() {
        // This could actually use the default getter
        return AppInventorEval(this.name + ':Title');
    },
    set: function(value) {
        AppInventorEvalAsync('(' + this.name + ':setTitle ' + value + ')');
    }
});
