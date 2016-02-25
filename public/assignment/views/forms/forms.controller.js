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
        $scope.deleteForm = deleteForm;

        FormService.findAllFormsForUser(currentUser._id,FormsForCurrentUser);


        function FormsForCurrentUser(formsCurrentUser) {
            $scope.forms = formsCurrentUser;

        }

        function addForm(form) {
            form.userId = currentUser._id;
            form._id = (new Date()).getTime();
            FormService.createFormForUser(currentUser._id,form,addFormCallback)
        }

        function addFormCallback(form) {
            console.log(form);
            FormService.findAllFormsForUser(currentUser._id,FormsForCurrentUser);
        }

        function deleteForm(index) {
            var formId = $scope.forms[index]._id;
            FormService.deleteFormById(formId,deleteFormCallback)

        }

        function deleteFormCallback(forms) {
            FormService.findAllFormsForUser(currentUser._id,FormsForCurrentUser);
        }

        function selectForm(index) {
            $scope.selectedRow = index;


        }


    }


})();
