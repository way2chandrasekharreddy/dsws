angular.module('4dfd604b-f25a-42f7-b311-349d772d4d5f', [
  'core.services.WidgetAPI'
]).directive('googleMaps', widgetComponent);

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
