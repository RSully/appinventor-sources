function AIImageSprite() {
    AIBaseComponent.call(this);
}

AIImageSprite.properties = [
    "Heading",
    "Height",
    "Interval",
    "Picture",
    "Rotates",
    "Speed",
    "Visible",
    "Width",
    "X",
    "Y",
    "Z",
];
AIImageSprite.events = {
    "Dragged": [
        "number", "number",
        "number", "number",
        "number", "number",
        "boolean"
    ],
     "Flung": [
        "number", "number",
        "number", "number",
        "number", "number"
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

AIBaseComponent.setup(AIImageSprite);


// example:
// var c = new AICanvas();
// c.on('TouchDown', function(x, y){});
