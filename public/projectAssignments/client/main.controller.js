/**
 * Created by Dhruv on 3/2/2016.
 */
"use strict";
(function(){
    angular
        .module("RentOutApp")
        .controller("MainController", MainController);
    function MainController($scope, $location) {
        $scope.$location = $location
    }
})();