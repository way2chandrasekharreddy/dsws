angular.module('508dbf3c-4de7-4338-bca2-134967ed149b', [
  'core.services.WidgetAPI'
]).directive('crmHistoryTimeline', widgetComponent);

function widgetComponent(WidgetAPI) {

  function widgetContainer(scope, element, params) {
    var api = new WidgetAPI(params);

    var itemDataset = [];
    var items;
    var groups = new vis.DataSet([
      { id: 0, content: 'High', style: 'color: #FFFFFF; background-color: #D50000;' },
      { id: 1, content: 'Medium', style: 'color: #FFFFFF; background-color: #F4511E;' },
      { id: 2, content: 'Low', style: 'color: #FFFFFF; background-color: #008000;' }
    ]);
    var container = element.find('#timeline')[0];
    // Vis.js Options object
    var options = {
      width: '100%',
      height: '500px',
      margin: 20
    };

    /**
     * get the group for each visualisation item in the dataset
     * @param priority
     * @returns group {number}
     */
    var getGroup = function(priority) {
      switch (priority) {
        case 'High':
          return 0;
        case 'Medium':
          return 1;
        case 'Low':
          return 2;
      }
    };

    /**
     * set the style for each visualisation item in the dataset
     * @param priority
     * @returns style {string}
     */
    var getStyle = function(priority) {
      switch (priority) {
        case 'High':
          return 'color: #FFFFFF; background-color: #D50000;';
        case 'Medium':
          return 'color: #FFFFFF; background-color: #F4511E;';
        case 'Low':
          return 'color: #FFFFFF; background-color: #008000;';
      }
    };

    /**
     * Filter data for use in timeline visualisation
     * @param cases - array of customer history case objects
     */
    var filterCases = function(cases) {
      cases.forEach(function(entry, index) {
        itemDataset[index] = {
          id: index,
          group: getGroup(entry.case_priority),
          style: getStyle(entry.case_priority),
          content: entry.case_status,
          start: entry.created_at,
          title: '<strong>' + entry.case_subject + '</strong>'
        }
      });
      //set vis.js dataset
      items = new vis.DataSet(itemDataset);
    };

    /**
     * callback for customer data from CRM (voice only)
     */
    api.onDataEvent('onCRMDataEvent', function(data) {
      scope.customer = data;
      filterCases(scope.customer.cases);
      // Draw Timeline object
      var timeline = new vis.Timeline(container, items, groups, options);
    });

    /**
     * called when widget is destroyed
     */
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
