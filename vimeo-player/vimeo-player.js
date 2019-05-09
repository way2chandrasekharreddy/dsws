angular.module('d4a795e0-b7ea-4cac-8f89-e676ca98721f', [
  'core.services.WidgetAPI'
]).directive('vimeoPlayer', widgetComponent);

function widgetComponent(WidgetAPI) {

  function widgetContainer(scope, element, params) {

    // widget API constructor
    var api = new WidgetAPI(params);

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
