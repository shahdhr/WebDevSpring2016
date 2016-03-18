/**
 * Created by Dhruv on 2/24/2016.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController);

    function FormController($scope, $location, UserService, FormService) {

        //currently logged in user
        var currentUser = UserService.getCurrentUser();
        $scope.$location = $location;

        //Event handler declarations
        $scope.addForm = addForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        $scope.updateForm = updateForm;

        //Fetching all forms for current user to display
        function init() {
            FormService
                .findAllFormsForUser(currentUser._id)
                .then(findAllFormsForUserCallback);
        }
        init();

        //Event handler implementations
        function addForm(form) {
            form.userId = currentUser._id;
            form._id = (new Date()).getTime();
            FormService
                .createFormForUser(currentUser._id,form)
                .then(addFormCallback);
            $scope.form = null;
        }

        function deleteForm(index) {
            var formId = $scope.forms[index]._id;
            FormService
                .deleteFormById(formId)
                .then(deleteFormCallback);

        }

        function selectForm(index) {

            $scope.selectedRow = index;
            $scope.form = {
                _id: $scope.forms[index]._id,
                title: $scope.forms[index].title,
                userId: $scope.forms[index].userId
            };

        }

        function updateForm(form) {
             FormService
                 .updateFormById(form._id,form)
                 .then(updateFormCallback);
            $scope.form = null;
        }


        //callback functions
        function findAllFormsForUserCallback(formsCurrentUser) {
            $scope.forms = formsCurrentUser;

        }

        function addFormCallback(form) {
            init();
        }

        function deleteFormCallback(forms) {
            init();
        }

        function updateFormCallback(form) {
            init();
        }


    }


})();
