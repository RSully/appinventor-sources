function AICanvas() {
    AIBaseComponent.call(this);
}

AICanvas.properties = [
    "BackgroundColor",
    "BackgroundImage",
    "FontSize",
    "Height",
    "LineWidth",
    "PaintColor",
    "TextAlignment",
    "Visible",
    "Width"
];
AICanvas.events = {
    "Dragged": [
        "number", "number",
        "number", "number",
        "number", "number",
        "boolean"
    ],
     "Flung": [
        "number", "number",
        "number", "number",
        "number", "number",
        "boolean"
    ],
    "TouchDown": [
        "number",
        "number"
    ],
    "TouchUp": [
        "number",
        "number"
    ],
   "Touched": [
        "number",
        "number"
    ]
};

AIBaseComponent.setup(AICanvas);


// example:
// var c = new AICanvas();
// c.on('TouchDown', function(x, y){});
