
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
app.directive( "callerInfotemp", function () {

    return {

        templateUrl: "destinationData.html"
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

    factory.getDestinationData = function ( searchByValue ) {

        console.log( "from tempdate" + TmpData.listOfCallerInfo )

        var tempData = TmpData.destinationDataTemp;

      

        return tempData;
    }

    return factory;
} );



app.controller( "ngtableCtrl", function ( $scope, DswwService ) {
    $scope.getCallerInfo = function () {
        console.log( $scope.ani )
        $scope.callerInfo = DswwService.getContactInfoByAni( $scope.ani );
    }

    $scope.traceCall = function () {

        alert( "work in progress for " + $scope.ani )
    }
    $scope.getDestinationData = function () {
        console.log("in destination  :" +$scope.searchByValue)
        $scope.destinationData = DswwService.getDestinationData( $scope.searchByValue);
    }
    $scope.makeTransfer = function () {
        console.log( "in makeTransfer  :"  )
    }
   

} );




app.factory( "TmpData", function () {
    console.log( "----------------------" )
    var factory = {};

    factory.listOfCallerInfo = [
        {
            surname: "Talbot Hobbs1", firstName: "John", site: "Perth", appointment: "Job title", rank: "Lieutenant General", pmKeys: "ARMY", region: "WA", function: "", mobile: "12456", pager: "", phone: "123425345346", fax: "", altContact: "1242345", altPhone: "", vip: ""
        }, {
            surname: "chandra", firstName: "sekhar", site: "Perth", appointment: "Job title", rank: "Lieutenant General", pmKeys: "ARMY", region: "WA", function: "", mobile: "12", pager: "", phone: "123425345346", fax: "", altContact: "1242345", altPhone: "", vip: ""
        }, {
            surname: "yasodha", firstName: "raja", site: "Perth", appointment: "Job title", rank: "Lieutenant General", pmKeys: "ARMY", region: "WA", function: "", mobile: "123", pager: "", phone: "123425345346", fax: "", altContact: "1242345", altPhone: "", vip: ""
        }, {
            surname: "krishna", firstName: "roja", site: "Perth", appointment: "Job title", rank: "Lieutenant General", pmKeys: "ARMY", region: "WA", function: "", mobile: "1234", pager: "", phone: "123425345346", fax: "", altContact: "1242345", altPhone: "", vip: ""
        }, {
            surname: "jaban", firstName: "pranay", site: "Perth", appointment: "Job title", rank: "Lieutenant General", pmKeys: "ARMY", region: "WA", function: "", mobile: "123", pager: "", phone: "123425345346", fax: "", altContact: "1242345", altPhone: "", vip: ""
        }, {
            surname: "kaushik", firstName: "koki", site: "Perth", appointment: "Job title", rank: "Lieutenant General", pmKeys: "ARMY", region: "WA", function: "", mobile: "123", pager: "", phone: "123425345346", fax: "", altContact: "1242345", altPhone: "", vip: ""
        }, {
            surname: "kotari", firstName: "laxmi", site: "Perth", appointment: "Job title", rank: "Lieutenant General", pmKeys: "ARMY", region: "WA", function: "", mobile: "123", pager: "", phone: "123425345346", fax: "", altContact: "1242345", altPhone: "", vip: ""
        }, {
            surname: "kamaklini", firstName: "Jdevid", site: "Perth", appointment: "Job title", rank: "Lieutenant General", pmKeys: "ARMY", region: "WA", function: "", mobile: "123", pager: "", phone: "123425345346", fax: "", altContact: "1242345", altPhone: "", vip: ""
        }, {
            surname: "Talbot Hobbs1", firstName: "John", site: "Perth", appointment: "Job title", rank: "Lieutenant General", pmKeys: "ARMY", region: "WA", function: "", mobile: "123", pager: "", phone: "123425345346", fax: "", altContact: "1242345", altPhone: "", vip: ""
        }, {
            surname: "Talbot Hobbs1", firstName: "John", site: "Perth", appointment: "Job title", rank: "Lieutenant General", pmKeys: "ARMY", region: "WA", function: "", mobile: "123", pager: "", phone: "123425345346", fax: "", altContact: "1242345", altPhone: "", vip: ""
        }
    ];



    factory.destinationDataTemp = [
        {
            surname: "Talbot Hobbs1", firstName: "John", site: "Perth", appointment: "Job title", rank: "Lieutenant General", pmKeys: "ARMY", region: "WA", function: "", mobile: "12456", pager: "", phone: "123425345346", fax: "", altContact: "1242345", altPhone: "", vip: "",status:"available"
        }, {
            surname: "chandra", firstName: "sekhar", site: "Perth", appointment: "Job title", rank: "Lieutenant General", pmKeys: "ARMY", region: "WA", function: "", mobile: "12", pager: "", phone: "123425345346", fax: "", altContact: "1242345", altPhone: "", vip: "", status: "busy"
        }, {
            surname: "yasodha", firstName: "raja", site: "Perth", appointment: "Job title", rank: "Lieutenant General", pmKeys: "ARMY", region: "WA", function: "", mobile: "123", pager: "", phone: "123425345346", fax: "", altContact: "1242345", altPhone: "", vip: "", status: "DND"
        }, {
            surname: "krishna", firstName: "roja", site: "Perth", appointment: "Job title", rank: "Lieutenant General", pmKeys: "ARMY", region: "WA", function: "", mobile: "1234", pager: "", phone: "123425345346", fax: "", altContact: "1242345", altPhone: "", vip: "", status: "away"
        }, {
            surname: "jaban", firstName: "pranay", site: "Perth", appointment: "Job title", rank: "Lieutenant General", pmKeys: "ARMY", region: "WA", function: "", mobile: "123", pager: "", phone: "123425345346", fax: "", altContact: "1242345", altPhone: "", vip: "", status: "busy"
        }, {
            surname: "kaushik", firstName: "koki", site: "Perth", appointment: "Job title", rank: "Lieutenant General", pmKeys: "ARMY", region: "WA", function: "", mobile: "123", pager: "", phone: "123425345346", fax: "", altContact: "1242345", altPhone: "", vip: "", status: "available"
        }, {
            surname: "kotari", firstName: "laxmi", site: "Perth", appointment: "Job title", rank: "Lieutenant General", pmKeys: "ARMY", region: "WA", function: "", mobile: "123", pager: "", phone: "123425345346", fax: "", altContact: "1242345", altPhone: "", vip: "", status: "busy"
        }, {
            surname: "kamaklini", firstName: "Jdevid", site: "Perth", appointment: "Job title", rank: "Lieutenant General", pmKeys: "ARMY", region: "WA", function: "", mobile: "123", pager: "", phone: "123425345346", fax: "", altContact: "1242345", altPhone: "", vip: "", status: "available"
        }, {
            surname: "manju ", firstName: "reddy", site: "Perth", appointment: "Job title", rank: "Lieutenant General", pmKeys: "ARMY", region: "WA", function: "", mobile: "123", pager: "", phone: "123425345346", fax: "", altContact: "1242345", altPhone: "", vip: "", status: "busy"
        }, {
            surname: "kiran", firstName: "kumar", site: "Perth", appointment: "Job title", rank: "Lieutenant General", pmKeys: "ARMY", region: "WA", function: "", mobile: "123", pager: "", phone: "123425345346", fax: "", altContact: "1242345", altPhone: "", vip: "", status: "busy"
        }
    ];
    return factory;
} )