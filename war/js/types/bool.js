function AIBool(value) {
    if (typeof value === "boolean") {
        this.value = value;
    } else if (typeof value === "string") {
        if (value.length === 2 && 
            value.substr(0, 1) === "#") {
            this.value = value.substr(1, 1) === "t";
        } else {
            this.value = value === "true"
        }
    }
}

AIBool.prototype.toString = function() {
    return this.value ? "#t" : "#f";
};
