var AIProperties = {
    "AboutScreen": "text",
    "ColorLeft": "number",
    "Title": "text",
    "AlignVertical": "number",
    "FontItalic": "boolean",
    "Width": "number",
    "Animation": "boolean",
    "TitleVisible": "boolean",
    "Month": "any",
    "NotifierLength": "number",
    "TextAlignment": "number",
    "ShowFeedback": "boolean",
    "Picture": "text",
    "FontBold": "boolean",
    "Elements": "any",
    "AppName": "text",
    "ColorRight": "number",
    "MinValue": "number",
    "SelectionIndex": "number",
    "Day": "any",
    "Minute": "any",
    "Icon": "text",
    "Sizing": "any",
    "Scrollable": "boolean",
    "Instant": "any",
    "ItemBackgroundColor": "number",
    "Hour": "any",
    "ThumbEnabled": "boolean",
    "FontTypeface": "number",
    "Enabled": "boolean",
    "CloseScreenAnimation": "boolean",
    "OpenScreenAnimation": "boolean",
    "FontSize": "number",
    "MonthInText": "any",
    "BackgroundColor": "number",
    "VersionCode": "text",
    "TextColor": "number",
    "ThumbPosition": "number",
    "ElementsFromString": "text",
    "ShowStatusBar": "boolean",
    "Selection": "any",
    "Prompt": "boolean",
    "ShowFilterBar": "boolean",
    "Text": "text",
    "Image": "text",
    "ScreenOrientation": "any",
    "BackgroundImage": "text",
    "MaxValue": "number",
    "Height": "number",
    "Visible": "boolean",
    "Shape": "number",
    "VersionName": "text",
    "Year": "any",
    "ItemTextColor": "number",
    "AlignHorizontal": "number"
};

function AIBaseComponent() {
    // Setup type + name
    this.type = this.constructor.name;
    this.name = this.type + (AIBaseComponent.uuid++);

    // Setup per-instance events
    if (this.constructor.hasOwnProperty('events')) {
        AIBaseComponent.setupEvents.call(this);
    }

    AIBaseComponent.instances[this.name] = this;

    // TODO: move this to another method or something
    // TODO: allow removing components
    // so ideally we'd have like "addToScreen" and "removeFromScreen" maybe
    // and ideally Screen1 would not be hard-coded
    // TODO: move aiType retreival to method so it can be overriden in special cases
    var aiType = this.type.substring(2);
    // ideally there would be a way to say "this component exists in AI designer view"
    // and use that to check instead of the type
    if (aiType !== "Screen") {
        console.log('adding because not screen: ' + this.name);
        AppInventor.sendEval("(add-component Screen1 " + aiType + " " + this.name + ")");
    } else {
        console.log('not adding cuz screen: ' + this.name);
    }
};

AIBaseComponent.uuid = 1;
AIBaseComponent.instances = {};

AIBaseComponent.setup = function(object) {
    // Setup inheritance automatically
    object.prototype = Object.create(this.prototype);
    object.prototype.constructor = object;

    // Register properties
    if (object.hasOwnProperty('properties')) {
        this.setupProperties(object);        
    }
};

AIBaseComponent.setupProperties = function(object) {
    object.properties.forEach(function(property){
        var type = AIProperties[property];

        Object.defineProperty(object.prototype, property, {
            get: function() {
                return AppInventor.getEval("(" + this.name + ":" + property + ")");
            },
            set: function(value) {
                AppInventor.sendEval("(set-and-coerce-property! '"+this.name+" '" + property + " " + value + " '" + type + ")");
            }
        });
    });

};

AIBaseComponent.setupEvents = function() {
    this.constructor.events.forEach(function(eventName){
        AppInventorEvents.register(eventName, this);
    }.bind(this));
};
