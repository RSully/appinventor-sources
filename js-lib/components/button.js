var Button = function() {
  var name = 'Button'+(Object.keys(Button.instances).length+(new Date()).getSeconds());
  AppInventor.sendEval("(add-component Screen1 Button "+name+")");
  AppInventor.sendEval("(set-and-coerce-property! '"+name+" 'Text \"New Button\" 'text)");
  //if (AppInventor.getEval(name).indexOf('@') != -1) success!
  //if (arguments.length == 2) use later for parent component
  EventfulObject.call(this);
  this.type = "Button";
  this.name = name;
  this.init_props(["BackgroundColor","Enabled","FontBold","FontItalic","FontSize","FontTypeface","Height","Image","Shape","ShowFeedback","Text","TextAlignment","TextColor","Visible","Width"]);
  this.init_events(["Click","GotFocus","LongClick","LostFocus","TouchDown","TouchUp"]);
  Button.instances[name] = this;
};
Button.prototype = Object.create(EventfulObject.prototype);
Button.prototype.init_props = function(props) {
	var user = this;
    props.forEach(function(prop) {
    	var type = _.types[_.props.indexOf(prop)];
        Object.defineProperty(user, prop, {
          get: function(){
            return AppInventor.getEval("("+this.name+":"+prop+")");
          },
          set: function(value){
            //switch (type) {}
            //AppInventor.getEval('(make-color (*list-for-runtime* 0 0 0 255))')
            AppInventor.sendEval("(set-and-coerce-property! '"+this.name+" '"+prop+" "+value+" '"+type+")")
     	  }
        });
    });
};
Button.prototype.init_events = function(events) {
	var user = this;
	events.forEach(function(event) {
    	AppInventor.sendEval('(define-event '+user.name+' '+event+'()(set-this-form)\
    	((WebViewer1:getView):evaluateJavascript "_.dispatch.emit(\''+event+'\', \''+user.name+'\')" #!null))');
    });
};
Button.prototype.constructor = Button;
Button.instances = Object();
