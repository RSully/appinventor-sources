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
    AIBaseComponent.instances[this.type].push(this);
    this.name = this.type + (AIBaseComponent.uuid++);

    // Setup per-instance events
    if (this.constructor.hasOwnProperty('events')) {
        AIBaseComponent.setupEvents.call(this);
    }

    AIBaseComponent.instances[this.name] = this;
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
                return AppInventor.getEval("(" + this.name + ":" + prop + ")");
            },
            set: function(value) {
                AppInventor.sendEval("(set-and-coerce-property! '"+this.name+" '"+prop+" "+value+" '"+type+")");
            }
        });
    });

};

AIBaseComponent.setupEvents = function() {
    this.constructor.events.forEach(function(eventName){
        AppInventorEvents.register(eventName, this);
    }.bind(this));
};
