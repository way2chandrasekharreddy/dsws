angular.module('ec384f9d-0aad-4266-8a2e-44f61c180f17', [
  'core.services.WidgetAPI'
]).directive('pdfViewer', widgetComponent);

function widgetComponent(WidgetAPI, $sce) {

  function widgetContainer(scope, element, params) {

    // widget API constructor
    var api = new WidgetAPI(params);

    scope.pdfUrl = localStorage.getItem('_cc.libraryUrl') + 'pdf-viewer/assets/brochure.pdf';

    scope.trustAsResourceUrl = function (url) {
      return $sce.trustAsResourceUrl(url);
    };


    // called automatically when widget is destroyed
    element.on('$destroy', function () {
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
