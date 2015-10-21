function AIFunction() {
    this.func = arguments.shift();
    this.args = arguments;
}

AIFunction.prototype.argsToAI = function() {
    var args = [];
    for (var k in this.args) {
        args.push(NativeToAI(this.args[k]));
    }
    return args;
};

AIFunction.prototype.toString = function() {
    var argStr = '';
    if (this.args.length > 0) {
        argStr += ' ';
        argStr += this.argsToAI().join(' ');
    }

    return '(' + this.func + argStr + ')'
};
