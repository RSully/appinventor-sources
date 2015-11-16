function AIList(args) {
    this.args = args;
}

AIList.prototype.toString = function() {
    return AIFunction.construct(['*list-for-runtime*'].concat(this.args));
}
