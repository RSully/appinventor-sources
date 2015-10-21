var AIScreen = function() {
  var name = "Screen1"
  EventfulObject.call(this);
  this.type = "AIScreen";
  this.name = name;
  this.init_props(["AboutScreen","AlignHorizontal","AlignVertical","BackgroundColor","AppName","BackgroundImage","CloseScreenAnimation","Height","Icon","OpenScreenAnimation","ScreenOrientation","Scrollable","ShowStatusBar","Sizing","TitleVisible","VersionCode","VersionName","Width"]);
  this.init_events(["BackPressed","ErrorOccurred","Initialize","OtherScreenClosed","ScreenOrientationChanged"]);
  AIScreen.instances[name] = this;
};
AIScreen.prototype = Object.create(EventfulObject.prototype);
_.extend(AIScreen.prototype, {
  get Title () {
    return AppInventor.getEval(this.name+":Title");
  },
  set Title (value) {
    AppInventor.sendEval('('+this.name+':setTitle "'+value+'")');
  }
})
AIScreen.prototype.init_props = function(props) {
	var user = this;
    props.forEach(function(prop) {
    	var type = _.types[_.props.indexOf(prop)];
        Object.defineProperty(user, prop, {
          get: function(){
            return AppInventor.getEval("(get-property '"+this.name+" '"+prop+")");
          },
          set: function(value){
            AppInventor.sendEval("(set-and-coerce-property! '"+this.name+" '"+prop+" "+value+" '"+type+")")
     	    }
        });
    });
};
AIScreen.prototype.init_events = function(events) {
	var user = this;
	events.forEach(function(event) {
    	AppInventor.sendEval('(define-event '+user.name+' '+event+'()(set-this-form)\
    	((WebViewer1:getView):evaluateJavascript "_.dispatch.emit(\''+event+'\', \''+user.name+'\')" #!null))');
    });
};
AIScreen.prototype.constructor = AIScreen;
AIScreen.instances = Object();
