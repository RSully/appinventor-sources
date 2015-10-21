function AIColor(r, g, b, a) {
    if (typeof a == 'undefined') { a = 255; }
    this.components = [r, g, b, a];
}

AIColor.prototype.toString = function() {
    return AIFunction('make-color', new AIList(this.components));
};
