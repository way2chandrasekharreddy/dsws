angular.module('4fb7cac3-a96b-44ae-93f0-1fc97f387062', [
  'core.services.WidgetAPI'
]).directive('messageEcho', widgetComponent);

function widgetComponent(WidgetAPI) {

  function widgetContainer(scope, element, params) {

    // widget API constructor
    var api = new WidgetAPI(params);

    scope.messages = [];

    api.onDataEvent('onMessageEvent', function(data) {
      scope.messages.push(data);
    });

    // called automatically when widget is destroyed
    element.on('$destroy', function() {
      api.unregister();
    });

  }

  return {
    scope: {},
    replace: true,
    template: template,
    link: widgetContainer
  };
}
