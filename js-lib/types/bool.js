function AIBool(b) {
    if (Boolean(b) && b != "false") {
      this.value = "#t";
    } else { this.value = "#f"; }
}

AIBool.prototype.toString = function() {
    return this.value;
};
