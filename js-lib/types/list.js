function AIList() {
    this.args = [];
    for (var k in arguments) {
        var v = arguments[k];

        if (typeof v == 'string') {
            // TODO: this should use AIText for escaping
            this.args.push('"' + v + '"');
        } else if (typeof v == 'number') {
            this.args.push(v);
        } else if (typeof v == 'object') {
            this.args.push(v.toString());
        }
    }
}

AIList.prototype.toString = function() {
    return '(*list-for-runtime* ' + this.args.join(' ') + ')';
}

console.log(new AIList(1,2,"ha", new AIList(1,2,3)).toString());
