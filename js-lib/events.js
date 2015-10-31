AppInventorEvents = {
    objects: {},
    register: function(eventName, instance) {
        if (!this.objects.hasOwnProperty(eventName)) {
            this.objects[eventName] = [];
        }
        this.objects[eventName].push(instance.name);

        AppInventor.sendEval('(define-event ' + instance.name + ' ' + eventName + '()(set-this-form)\
            ((WebViewer1:getView):evaluateJavascript "AppInventorEvents.emit(\'' + eventName + '\', \'' + instance.name + '\')" #!null))');
    },
    unregisterAll: function(instance) {
        // todo, when an object is deleted/removed
        // loop through this.objects items, remove any instances of instance.name
    },
    
    emit: function(eventName, instanceName) {
        console.log('got emit call for AppInventorEvents', eventName, instanceName);
        // if this.objects[eventName] contains instanceName
        // object = AIBaseComponent.instances[name]
    }
};
