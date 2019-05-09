angular.module('4456e87e-0e7f-4293-8308-5c7aeae7c4b2', [
  'core.services.WidgetAPI'
]).directive('twitterFeed', widgetComponent);

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
