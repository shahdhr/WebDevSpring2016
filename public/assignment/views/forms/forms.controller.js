/**
 * Created by Dhruv on 2/24/2016.
 */

(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController)

    function FormController($scope, $location, $rootScope, UserService, FormService) {
        var currentUser = $rootScope.newUser;

        FormService.findAllFormsForUser(currentUser._id,FromsForCurrentUser);


        function FromsForCurrentUser(formsCurrentUser) {
            $scope.forms = formsCurrentUser;

        }


    }


})();
