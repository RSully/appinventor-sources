var _ = Object();
_.props = ['AboutScreen', 'ColorLeft', 'Title', 'AlignVertical', 'FontItalic', 'Width', 'Animation', 'TitleVisible', 'Month', 'NotifierLength', 'TextAlignment', 'ShowFeedback', 'Picture', 'FontBold', 'Elements', 'AppName', 'ColorRight', 'MinValue', 'SelectionIndex', 'Day', 'Minute', 'Icon', 'Sizing', 'Scrollable', 'Instant', 'ItemBackgroundColor', 'Hour', 'ThumbEnabled', 'FontTypeface', 'Enabled', 'CloseScreenAnimation', 'OpenScreenAnimation', 'FontSize', 'MonthInText', 'BackgroundColor', 'VersionCode', 'TextColor', 'ThumbPosition', 'ElementsFromString', 'ShowStatusBar', 'Selection', 'Prompt', 'ShowFilterBar', 'Text', 'Image', 'ScreenOrientation', 'BackgroundImage', 'MaxValue', 'Height', 'Visible', 'Shape', 'VersionName', 'Year', 'ItemTextColor', 'AlignHorizontal'];
_.types = ['text', 'number', 'text', 'number', 'boolean', 'number', 'boolean', 'boolean', 'any', 'number', 'number', 'boolean', 'text', 'boolean', 'any', 'text', 'number', 'number', 'number', 'any', 'any', 'text', 'any', 'boolean', 'any', 'number', 'any', 'boolean', 'number', 'boolean', 'boolean', 'boolean', 'number', 'any', 'number', 'text', 'number', 'number', 'text', 'boolean', 'any', 'boolean', 'boolean', 'text', 'text', 'any', 'text', 'number', 'number', 'boolean', 'number', 'text', 'any', 'number', 'number'];
_.extend = function(obj) {
    Array.prototype.slice.call(arguments, 1).forEach(function(source) {
        var descriptor, prop;
        if (source) {
            for (prop in source) {
                descriptor = Object.getOwnPropertyDescriptor(source, prop);
                Object.defineProperty(obj, prop, descriptor);
            }
        }
    });
    return obj;
};
window.alert = function(s) { AppInventor.getEval('((android.widget.Toast:makeText Screen1 "'+s+'" 0):show)'); };
/*var AppInventor = Object();
AppInventor.sendEval = function(s){console.log(s)};
AppInventor.getEval = function(s){console.log(s)};*/

var EventfulObject = function() {
  var event = {};
  var instances = [];
  var EventfulObjectConstructor = function() {
    instances.push(this);
  };
  EventfulObjectConstructor.prototype = {
    broadcast: function(name) {
      instances.forEach(function(instance) {
        (instance.hasOwnProperty("receiveBroadcast") && typeof instance["receiveBroadcast"] === "function") &&
        instance["receiveBroadcast"](name);
      });
    },
    emit: function(name) {
      var args = Array.prototype.slice.call(arguments, 1);
      event.hasOwnProperty(name) && event[name].forEach(function(subscription) {
      	if ((subscription.context.name == args[0]) || !(subscription.context instanceof Button))
          subscription.process.apply(subscription.context, args);
      });
    },
    on: function(name, action) {
      event.hasOwnProperty(name) || (event[name] = []);
      event[name].push({
        context: this,
        process: action
      });

      var subscriptionIndex = event[name].length - 1;

      return function() {
        event[name].splice(subscriptionIndex, 1);
      };
    }
  };

  return EventfulObjectConstructor;
}();

_.dispatch = new EventfulObject();
var Button = function(name) {
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
var button1 = new Button('Button1');














// Button X
Properties = ["BackgroundColor","Enabled","FontBold","FontItalic","FontSize","FontTypeface","Height","Image","Shape","ShowFeedback","Text","TextAlignment","TextColor","Visible","Width"]
Events = ["Click()","GotFocus()","LongClick()","LostFocus()","TouchDown()","TouchUp()"]

//  CheckBox 
Properties  = ["BackgroundColor","Checked","Enabled","Height","Width","Text","TextColor","Visible"]
Events  = ["Click()","GotFocus()","LostFocus()"]

// DatePicker
Properties = ["BackgroundColor","Day","Enabled","FontBold","FontItalic","FontSize","FontTypeface","Height","Image","Instant","Month","MonthInText","Shape","ShowFeedback","Text","TextAlignment","TextColor","Visible","Width","Year"]
Events = ["AfterDateSet()","GotFocus()","LostFocus()","TouchDown()","TouchUp()"]
Methods = ["LaunchPicker()","SetDateToDisplay(number year, number month, number day)","SetDateToDisplayFromInstant(InstantInTime instant)"]

// Image
Properties = ["Animation","Height","Picture","Visible","Width"]

//  Label 
Properties  = ["BackgroundColor","FontBold","FontItalic","FontSize","FontTypeface","HasMargins","Height","Width","Text","TextAlignment","TextColor","Visible"]

// ListPicker
Properties = ["BackgroundColor","Elements","ElementsFromString","Enabled","FontBold","FontItalic","FontSize","FontTypeface","Height","Image","Selection","SelectionIndex","Shape","ShowFeedback","ShowFilterBar","Text","TextAlignment","TextColor","Title","Visible","Width","ItemTextColor","ItemBackgroundColor"]
Events = ["AfterPicking()","BeforePicking()","GotFocus()","LostFocus()"]
Methods = ["Open()"]

// ListView
Properties = ["BackgroundColor","Elements","ElementsFromString","Height","Selection","SelectionIndex","ShowFilterBar","TextColor","Visible","Width"]
Events = ["AfterPicking()"]

// Notifier
Properties = ["BackgroundColor","NotifierLength","TextColor"]
Events = ["AfterChoosing(text choice)","AfterTextInput(text response)"]
Methods = ["DismissProgressDialog()","LogError(text message)","LogInfo(text message)","LogWarning(text message)","ShowAlert(text notice)","ShowChooseDialog(text message, text title, text button1Text, text button2Text, boolean cancelable)","ShowMessageDialog(text message, text title, text buttonText)","ShowProgressDialog(text message, text title)","ShowTextDialog(text message, text title, boolean cancelable)"]

//  PasswordTextBox 
Methods = ["RequestFocus()"]
Properties  = ["BackgroundColor","Enabled","FontBold","FontItalic","FontSize","FontTypeface","Height","Width","TextAlignment","TextColor","Hint"]
Events  = ["GotFocus()","LostFocus()"]

// Screen
Properties = ["AboutScreen","AlignHorizontal","AlignVertical","BackgroundColor","AppName","BackgroundImage","CloseScreenAnimation","Height","Icon","OpenScreenAnimation","ScreenOrientation","Scrollable","ShowStatusBar","Sizing","TitleVisible","Title","VersionCode","VersionName","Width"]
Events = ["BackPressed()","ErrorOccurred(component component, text functionName, number errorNumber, text message)","Initialize()","OtherScreenClosed(text otherScreenName, any result)","ScreenOrientationChanged()"]

// Slider
Properties = ["ColorLeft","ColorRight","MaxValue","MinValue","ThumbPosition","ThumbEnabled","Visible","Width"]
Events = ["PositionChanged(number thumbPosition)"]

// Spinner
Properties = ["Elements","ElementsFromString","Height","Prompt","Selection","SelectionIndex","Visible","Width"]
Events = ["AfterSelecting(text selection)"]
Methods = ["DisplayDropdown()"]

//  TextBox 
Methods  = ["HideKeyboard()","RequestFocus()"]
Properties  = ["BackgroundColor","Enabled","FontBold","FontItalic","FontSize","FontTypeface","Height","Hint","MultiLine","NumbersOnly","Text","TextAlignment","TextColor","Visible","Width"]
Events  = ["GotFocus()","LostFocus()"]

// TimePicker
Properties = ["BackgroundColor","Enabled","FontBold","FontItalic","FontSize","FontTypeface","Height","Hour","Image","Instant","Minute","Shape","ShowFeedback","Text","TextAlignment","TextColor","Visible","Width"]
Events = ["AfterTimeSet()","GotFocus()","LostFocus()"]
Methods = ["LaunchPicker()","SetTimeToDisplay(number hour, number minute)","SetTimeToDisplayFromInstant(InstantInTime instant)"]
