angular.module('c593b159-dbb3-42c0-8b84-3c14019db1c5', [
  'core.services.WidgetAPI'
]).directive('emailWordCloud', widgetComponent);

function widgetComponent(WidgetAPI) {

  function widgetContainer(scope, element, params) {
    var api = new WidgetAPI(params);

    scope.interactionId = params.interactionId;

    api.onDataEvent('onMediaMessageEvent', function(data) {
      var words = data.body.replace(/<\/?[^>]+(>|$)/g, "");
      var myConfig = {
        type: 'wordcloud',
        options: {
          text: words,
          minLength: 5,
          maxItems: 40,
          aspect: 'flow-center',
          rotate: true,
          colorType: 'palette',
          palette: ['#D32F2F', '#5D4037', '#1976D2', '#E53935', '#6D4C41', '#1E88E5', '#F44336', '#795548', '#2196F3', '#EF5350', '#8D6E63', '#42A5F5'],
          style: {
            fontFamily: 'Crete Round',
            hoverState: {
              backgroundColor: '#D32F2F',
              borderRadius: 2,
              fontColor: 'white'
            },
            tooltip: {
              text: '%text: %hits',
              visible: true,
              alpha: 0.9,
              backgroundColor: '#1976D2',
              borderRadius: 2,
              borderColor: 'none',
              fontColor: 'white',
              fontFamily: 'Georgia',
              textAlpha: 1
            }
          }
        }
      };

      zingchart.render({
        id: 'myChart-' + scope.interactionId,
        data: myConfig,
        height: 400,
        width: '100%'
      });

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
