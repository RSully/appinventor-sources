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

window.alert = (function(s) {
  AppInventor.getEval('((android.widget.Toast:makeText Screen1 "'+s+'" 0):show)');
});

AppInventor.uiEval = (function(val, callback) {
  AppInventor.sendEval(val);
  setTimeout(function(){
    callback(AppInventor.getUIReturn());
  }, 50);
});
