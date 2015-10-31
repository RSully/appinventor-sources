AppInventorEvents = {
    objects: {},
    register: function(eventName, instance) {
        if (!this.objects.hasOwnProperty(eventName)) {
            this.objects[eventName] = [];
        }
        this.objects[eventName].push(instance.name);

        AppInventorEvalAsync('(define-event ' + instance.name + ' ' + eventName + '()(set-this-form)\
            ((WebViewer1:getView):evaluateJavascript "AppInventorEvents.emit(\'' + eventName + '\', \'' + instance.name + '\')" #!null))');
    },
    unregisterAll: function(instance) {
        // todo, when an object is deleted/removed
        // loop through this.objects items, remove any instances of instance.name
    },
    
    emit: function(eventName, instanceName) {
        console.log('got emit call for AppInventorEvents', eventName, instanceName);
        
        if (this.objects[eventName].indexOf(instanceName) === -1) {
            console.log('instancename not found in objects', this.objects, instanceName)
            return;
        }

        var object = AIBaseComponent.instances[instanceName];
        if (typeof object === "undefined") {
            console.log('got undefined for object instance');
            return;
        }
        
        object.trigger(eventName);
    }
};
