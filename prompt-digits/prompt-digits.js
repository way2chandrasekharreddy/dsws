angular.module('eb8a08ac-918e-4e00-9a02-0b19713ab1d1', [
  'core.services.WidgetAPI'
]).directive('promptDigits', widgetComponent);

function widgetComponent(WidgetAPI, $sce, $http) {

  function widgetContainer(scope, element, params) {
    var api = new WidgetAPI(params);
    scope.urlValid = false;

    scope.trustAsResourceUrl = function(url) {
      return $sce.trustAsResourceUrl(url);
    };

    api.onDataEvent('onContextDataEvent', function(data) {
      scope.context = data.contextStore[0].data.replace(/#/g,'');  // Parse URL - Remove Hashes
      scope.pdfUrl = localStorage.getItem('_cc.libraryUrl') + '/prompt-digits/assets/' + scope.context + '.pdf';
      checkForResource(scope.pdfUrl);
    });

    function checkForResource(resourceUrl){
      $http.head(resourceUrl).then(resourceExists, resourceNotFound);
    }

    function resourceExists(data){
      scope.urlValid = true;
    }

    function resourceNotFound(data){
      scope.urlValid = false;
    }

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
