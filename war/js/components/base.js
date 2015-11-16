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

function AIBaseComponent(existingName) {
    // Setup type + name
    this.type = this.constructor.name;
    this.preexisting = typeof existingName !== "undefined";
    if (this.preexisting) {
        this.name = existingName;
    } else {
        this.name = this.type + (AIBaseComponent.uuid++);
    }

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
    if (!this.preexisting) {
        var aiType = this.type.substring(2);
        AppInventorEvalAsync("(add-component Screen1 " + aiType + " " + this.name + ")");

        // if (AppInventorEval(this.name).indexOf('@') !== -1) success!
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
                return AppInventorEval("(" + this.name + ":" + property + ")");
            },
            set: function(value) {
                AppInventorEvalAsync("(set-and-coerce-property! '" + this.name + " '" + property + " " + value + " '" + type + ")");
            }
        });
    });

};

AIBaseComponent.setupEvents = function() {
    this.eventHandlers = {};
    this.constructor.events.forEach(function(eventName){
        this.eventHandlers[eventName] = [];
        AppInventorEvents.register(eventName, this);
    }.bind(this));
};


AIBaseComponent.prototype.trigger = function(eventName) {
    this.eventHandlers[eventName].forEach(function(callback){
        callback.call(this);
    }.bind(this));
};

AIBaseComponent.prototype.on = function(eventName, callback) {
    if (this.constructor.events.indexOf(eventName) === -1) {
        // invalid event
        return;
    }
    this.eventHandlers[eventName].push(callback);
};
