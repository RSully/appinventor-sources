window.alert = function(s) { AppInventor.getEval('((android.widget.Toast:makeText Screen1 "'+s+'" 0):show)'); };

var button1 = new Button();

/*NEEDED
- Button (done)
- Notifier
- Screen

//  Label 
Properties  = ["BackgroundColor","FontBold","FontItalic","FontSize","FontTypeface","HasMargins","Height","Width","Text","TextAlignment","TextColor","Visible"]

// ListPicker
Properties = ["BackgroundColor","Elements","ElementsFromString","Enabled","FontBold","FontItalic","FontSize","FontTypeface","Height","Image","Selection","SelectionIndex","Shape","ShowFeedback","ShowFilterBar","Text","TextAlignment","TextColor","Title","Visible","Width","ItemTextColor","ItemBackgroundColor"]
Events = ["AfterPicking()","BeforePicking()","GotFocus()","LostFocus()"]
Methods = ["Open()"]

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

*/
