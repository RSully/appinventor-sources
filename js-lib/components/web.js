function AIWeb() {
    AIBaseComponent.call(this);

    // TODO: remove this default property:
    //AppInventorEvalAsync("(set-and-coerce-property! '" + this.name + " 'Text \"New Button\" 'text)");

    // if (AppInventorEval(name).indexOf('@') != -1) success!
    // if (arguments.length == 2) use later for parent component
};

AIWeb.properties = ["AllowCookies", "RequestHeaders", "ResponseFileName", "SaveResponse", "Url"];
AIWeb.events = {
  'GotFile':['text','number','text','text'],
  'GotText':['text','number','text','text']
}

AIBaseComponent.setup(AIButton);
