var module = angular.module( 'dwss-app', [] );

module.directive( 'dsww', widgetComponent );

function widgetComponent( WidgetAPI ) {

    function widgetContainer( scope, element, params ) {

        // Create static contacts
        scope.contacts = [{ name: 'Tom Jones', initials: 'TJ', address: '0086541545' },
        { name: 'Bill Withers', initials: 'BW', address: '052254785' },
        { name: 'Morty Smith', initials: 'MS', address: '0565874541' },
        { name: 'Mike Jackson', initials: 'MJ', address: '0258524557' }]

        // Provide call functionality
        scope.call = function ( address ) {
            if ( address ) {
                scope.customNumber = '';
            } else {
            }
        };

    }

    return {
        scope: {},
        replace: true,
        template: template,
        link:   
    };
}




