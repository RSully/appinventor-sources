function AIText(str, b) {
    if (typeof b == 'undefined') {
      this.value = ('"'+str+'"');
    } else {
      this.value = "'"+str.replace(/ /g, "\\ ")
    }
}

AIText.prototype.toString = function() {
    return this.value;
};
