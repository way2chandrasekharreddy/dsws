angular.module('514bea27-af48-49b7-a806-2cac343b69df', [
  'core.services.WidgetAPI'
]).directive('youtubePlayer', widgetComponent);

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
