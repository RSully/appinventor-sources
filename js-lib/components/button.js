function AIButton() {
    AIBaseComponent.call(this);

    // AppInventor.sendEval("(set-and-coerce-property! '"+this.name+" 'Text \"New Button\" 'text)");
    // if (AppInventor.getEval(name).indexOf('@') != -1) success!
    // if (arguments.length == 2) use later for parent component
    // EventfulObject.call(this);
};

AIButton.properties = ["BackgroundColor", "Enabled", "FontBold", "FontItalic", "FontSize", "FontTypeface", "Height", "Image", "Shape", "ShowFeedback", "Text", "TextAlignment", "TextColor", "Visible", "Width"];
AIButton.events = ["Click", "GotFocus", "LongClick", "LostFocus", "TouchDown", "TouchUp"];

AIBaseComponent.setup(AIButton);
