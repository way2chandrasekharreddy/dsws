
var app = angular.module( "dsww-app", [] );

app.directive( "callerInfo", function () {

    return {

        templateUrl: "tableTemplate.html"
    }

} );

app.directive( "destination", function () {

    return {

        templateUrl: "destination-template.html"
    }

} );


app.factory( "DswwService", function ( TmpData ) {
    var factory = {};

    factory.getContactInfoByAni = function ( ani ) {

        console.log( "from tempdate" + TmpData.listOfCallerInfo )

        var tempData = TmpData.listOfCallerInfo;

        var resultInfo = [];
        for ( var i = 0; i < tempData.length; i++ )

            if ( tempData[i].mobile == ani ) {
                resultInfo.push( tempData[i] );
            }


        return resultInfo;
    }
    return factory;
} );

app.controller( "ngtableCtrl", function ( $scope, DswwService ) {
    $scope.getCallerInfo = function () {
        console.log( $scope.ani )
        $scope.callerInfo = DswwService.getContactInfoByAni( $scope.ani );
    }
} );



app.factory( "TmpData", function () {
    console.log( "----------------------" )
    var factory = {};

    factory.listOfCallerInfo = [
        {
            surname: "Talbot Hobbs1", FirstName: "John", site: "Perth", appointment: "Job title", rank: "Lieutenant General", pmKeys: "ARMY", region: "WA", function: "", mobile: "12", pager: "", phone: "123425345346", fax: "", altContact: "1242345", altPhone: "", vip: ""
        }, {
            surname: "Talbot Hobbs1", FirstName: "John", site: "Perth", appointment: "Job title", rank: "Lieutenant General", pmKeys: "ARMY", region: "WA", function: "", mobile: "12", pager: "", phone: "123425345346", fax: "", altContact: "1242345", altPhone: "", vip: ""
        }, {
            surname: "Talbot Hobbs1", FirstName: "John", site: "Perth", appointment: "Job title", rank: "Lieutenant General", pmKeys: "ARMY", region: "WA", function: "", mobile: "123", pager: "", phone: "123425345346", fax: "", altContact: "1242345", altPhone: "", vip: ""
        }, {
            surname: "Talbot Hobbs1", FirstName: "John", site: "Perth", appointment: "Job title", rank: "Lieutenant General", pmKeys: "ARMY", region: "WA", function: "", mobile: "1234", pager: "", phone: "123425345346", fax: "", altContact: "1242345", altPhone: "", vip: ""
        }
    ];
    return factory;
} )