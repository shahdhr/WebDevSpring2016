/**
 * Created by Dhruv on 2/24/2016.
 */

(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController)

    function FormController($scope, $location, $rootScope, UserService, FormService) {
        var currentUser = $rootScope.newUser;
        $scope.addForm = addForm;


        FormService.findAllFormsForUser(currentUser._id,FromsForCurrentUser);


        function FromsForCurrentUser(formsCurrentUser) {
            $scope.forms = formsCurrentUser;

        }

        function addForm(form) {
            form.userId = currentUser._id;
            form._id = (new Date).getTime();
            FormService.createFormForUser(currentUser._id,form,newFormAdded)
        }

        function newFormAdded(form) {
            console.log(form);
            FormService.findAllFormsForUser(currentUser._id,FromsForCurrentUser);
        }


    }


})();
