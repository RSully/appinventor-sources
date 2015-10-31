var AICanvas = function() {
};
AICanvas.prototype = Object.create(EventfulObject.prototype);
AICanvas.prototype.init_props = function(props) {
    var user = this;
    props.forEach(function(prop) {
        var type = _.types[_.props.indexOf(prop)];
        Object.defineProperty(user, prop, {
            get: function(){
                return AppInventor.getEval("("+this.name+":"+prop+")");
            },
            set: function(value){
                AppInventor.sendEval("(set-and-coerce-property! '"+this.name+" '"+prop+" "+value+" '"+type+")")
            }
        });
    });
};
AICanvas.prototype.init_events = function(events) {
    var user = this;
    events.forEach(function(event) {
        AppInventor.sendEval('(define-event '+user.name+' '+event+'()(set-this-form)\
            ((WebViewer1:getView):evaluateJavascript "_.dispatch.emit(\''+event+'\', \''+user.name+'\')" #!null))');
    });
};
AICanvas.prototype.constructor = AICanvas;
AICanvas.instances = Object();
