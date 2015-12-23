
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


window.ai_toast = (function(s) {
    AppInventorEval('((android.widget.Toast:makeText Screen1 "'+s+'" 0):show)');
});
