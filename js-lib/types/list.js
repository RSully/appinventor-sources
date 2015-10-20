function AIList() {
    var args = [];
    for (var k in arguments) {
        var v = arguments[k];

        if (typeof v == 'string') {
            args.push("'" + v + "'")
        } else if (typeof v == 'number') {
            args.push(v)
        }
    }
    return '(*list-for-runtime* ' + args.join(' ') + ')'
}
