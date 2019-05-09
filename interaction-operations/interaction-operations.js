angular.module('f3e5c2f0-c69a-4e68-a343-daa945d9db78', [
  'core.services.WidgetAPI'
]).directive('interactionOperations', widgetComponent);

function widgetComponent(WidgetAPI, $timeout) {

  function widgetContainer(scope, element, params) {
    var api = new WidgetAPI(params);
    var uuiInputElement = element.find('#uuiInput')[0];
    scope.isUuiEnabled = false;
    scope.info = { consultAddress: '', transferAddress: '', uui: '' };

    scope.consult = function() {
      api.consult(scope.info.consultAddress, scope.info.uui);
    };

    scope.singleStepTransfer = function() {
      api.singleStepTransfer(scope.info.transferAddress);
    };

    scope.completeTransfer = function() {
      api.completeTransfer();
    };

    scope.completeConference = function() {
      api.completeConference();
    };

    scope.endConsult = function() {
      api.endConsult();
    };

    scope.acceptInteraction = function() {
      api.acceptInteraction();
    };

    scope.holdInteraction = function() {
      api.holdInteraction();
    };

    scope.unholdInteraction = function() {
      api.unholdInteraction();
    };

    scope.endInteraction = function() {
      api.endInteraction();
    };

    scope.onUuiSwitchChanged = function(isUuiEnabled) {
      scope.info.uui = '';

      // set focus to uui input
      if (isUuiEnabled) {
        $timeout(function() {
          uuiInputElement.focus();
        }, 1);
      }
    };

    // Triggered on a new interaction and any subsequent interaction updates
    api.onDataEvent('onInteractionEvent', function(data) {
      scope.interaction = data;
      scope.info.consultAddress = '';
      scope.info.transferAddress = '';
      scope.info.uui = '';
    });

    // Triggered when capabilities have updated
    api.onDataEvent('onCapabilitiesEvent', function(data) {
      scope.capabilities = data.capabilities;
    });

    // Called automatically when widget is destroyed
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
