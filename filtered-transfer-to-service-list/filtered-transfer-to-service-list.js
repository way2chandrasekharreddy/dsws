angular.module('f30019ed-c4a1-4cc8-bfd1-43efee845133', [
  'core.services.WidgetAPI'
]).directive('filteredTransferToServiceList', widgetComponent);

function widgetComponent(WidgetAPI) {

  function widgetContainer(scope, element, params) {

    // widget API constructor
    var api = new WidgetAPI(params);

    //The following list of services is only an example. In order for a Transfer to work the services must already exist in UCA. 
    //In the real world this list of services will not be hardcoded, it will be retrieved from UCA and then filtered by the widget developer.
    scope.services = [{
      "id" : "Language.Irish|Service.TechnicalSupport",
      "name" : "IrishVoiceTransferToService"
    },{
      "id" : "Language.English|Service.TechnicalSupport",
      "name" : "EnglishVoiceTransferToService"
    }];

    // Subscribe to an interaction request services event in order to set custom list of interaction services
    api.onDataEvent('onRequestServicesEvent', function () {
      api.setTransferToServicesList(scope.services);
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
