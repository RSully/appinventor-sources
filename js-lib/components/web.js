function AIWeb() {
    AIBaseComponent.call(this);
}

AIWeb.properties = ["AllowCookies", "RequestHeaders", "ResponseFileName", "SaveResponse", "Url"];
AIWeb.events = {
  'GotFile':['text','number','text','text'],
  'GotText':['text','number','text','text']
}

AIBaseComponent.setup(AIButton);
