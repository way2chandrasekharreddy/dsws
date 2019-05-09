angular.module('cb644e9c-9d5c-4086-9bdf-511a055eed65', [
  'core.services.WidgetAPI'
]).directive('singleStepTransfer', widgetComponent);

function widgetComponent(WidgetAPI) {

  function widgetContainer(scope, element, params) {
    var api = new WidgetAPI(params);
    var libraryUrl = localStorage.getItem('_cc.libraryUrl');
    scope.assetsFolderUrl = libraryUrl + 'single-step-transfer/assets';
    scope.departments = [
      {
        name: 'Laptops',
        imageUrl: scope.assetsFolderUrl + '/images/laptops-department.jpg',
        address: 3010
      },
      {
        name: 'Desktops',
        imageUrl: scope.assetsFolderUrl + '/images/desktops-department.jpg',
        address: 3011
      },
      {
        name: 'Servers',
        imageUrl: scope.assetsFolderUrl + '/images/servers-department.png',
        address: 3013
      }
    ];

    scope.singleStepTransfer = function(address) {
      api.singleStepTransfer(address);
      api.sendNotification('info', 'Voice interaction transferred to \'' + address + '\'');
    };

    scope.singleStepTransferDepartment = function(department) {
      api.singleStepTransfer(department.address);
      api.sendNotification('info', 'Voice interaction transferred to the \'' + department.name + '\' department');
    };

    // Does a cleanup. Called automatically when widget is destroyed
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
