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

function AppInventorEval(scheme, async) {
    console.log(scheme);

    if (typeof async !== "undefined" && async) {
        AppInventor.sendEval(scheme);
        return;
    }
    return AppInventor.getEval(scheme);
}

function AppInventorEvalAsync(scheme) {
    AppInventorEval(scheme, true);
}


window.alert = (function(s) {
    AppInventorEval('((android.widget.Toast:makeText Screen1 "'+s+'" 0):show)');
});
