function AIFunction() {
	this.func = arguments.shift();
	this.args = arguments;
}

AIFunction.prototype.toString = function() {
	var argStr = '';
	if (this.args.length > 0) {
		argStr += ' ';
		argStr += this.args.join(' ');
	}

	return '(' + this.func + argStr + ')'
};
