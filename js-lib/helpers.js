/**
 * Allow creation of objects using an array
 */
Function.prototype.construct = function(aArgs) {
    var oNew = Object.create(this.prototype);
    this.apply(oNew, aArgs);
    return oNew;
};


AppInventor.uiEval = (function(val, callback) {
    AppInventor.sendEval(val);
    setTimeout(function(){
        callback(AppInventor.getUIReturn());
    }, 50);
});
