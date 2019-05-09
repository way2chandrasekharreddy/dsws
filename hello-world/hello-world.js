angular.module('a04a5141-9a48-4dc5-a7b6-ecb913671060', [
  'core.services.WidgetAPI'
]).directive('helloWorld', widgetComponent);

function widgetComponent(WidgetAPI) {

  function widgetContainer(scope, element, params) {
    var api = new WidgetAPI(params);
    scope.capabilities = api.getCapabilities();
    scope.configuration = api.getConfiguration();

    scope.sayHello = function(message) {
      api.sendMessage(message);
      api.sendNotification('info', 'Widget: ' + message);
    };

    // interaction card data
    api.onDataEvent('onInteractionEvent', function(data) {
      scope.interaction = data;
    });

    // customer data from CRM (voice only)
    api.onDataEvent('onCRMDataEvent', function(data) {
      scope.customer = data;
    });

    // interaction context data
    api.onDataEvent('onContextDataEvent', function(data) {
      scope.context = data;
    });

    // media data from chat, sms, email, social
    api.onDataEvent('onMediaEvent', function(data) {
      scope.media = data;
    });

    // media message data from chat, sms, email, social
    api.onDataEvent('onMediaMessageEvent', function(data) {
      scope.mediaMessage = data;
    });

    // triggered on agent state changes
    api.onDataEvent('onAgentStateEvent', function(data) {
      scope.agent = data;
    });

    // triggered when the widget receives a message from another widget
    api.onDataEvent('onMessageEvent', function(data) {
      scope.message = data;
    });

    // triggered on navigation change
    api.onDataEvent('onNavigationEvent', function(data) {
      scope.navigation = data;
    });

    // triggered on language change
    api.onDataEvent('onLocaleUpdatedEvent', function(data) {
      scope.locale = data;
      api.sendNotification('info', 'Widget: Locale was changed');
    });

    // triggered when capabilities have updated
    api.onDataEvent('onCapabilitiesEvent', function(data) {
      scope.capabilities = data.capabilities;
    });

    // called when widget is destroyed
    element.on('$destroy', function() {
      api.unregister();
      scope.$destroy();
    });

  }

  return {
    scope: {},
    replace: true,
    template: template,
    link: widgetContainer
  };
}
