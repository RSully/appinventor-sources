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
