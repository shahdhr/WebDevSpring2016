/**
 * Created by Dhruv on 2/24/2016.
 */

(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController)

    function FormController($scope, $location, $rootScope, UserService, FormService) {

        //currently logged in user
        var currentUser = $rootScope.newUser;

        //Event handler declarations
        $scope.addForm = addForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        //Fetching all forms for current user to display
        FormService.findAllFormsForUser(currentUser._id,findAllFormsForUserCallback);



        //Event handler implementations
        function addForm(form) {
            form.userId = currentUser._id;
            form._id = (new Date()).getTime();
            FormService.createFormForUser(currentUser._id,form,addFormCallback)
        }

        function deleteForm(index) {
            var formId = $scope.forms[index]._id;
            FormService.deleteFormById(formId,deleteFormCallback)

        }

        function selectForm(index) {
            $scope.selectedRow = index;


        }


        //callback functions
        function findAllFormsForUserCallback(formsCurrentUser) {
            $scope.forms = formsCurrentUser;

        }

        function addFormCallback(form) {
            console.log(form);
            FormService.findAllFormsForUser(currentUser._id,findAllFormsForUserCallback);
        }

        function deleteFormCallback(forms) {
            FormService.findAllFormsForUser(currentUser._id,findAllFormsForUserCallback);
        }


    }


})();
