/**
 * Created by Dhruv on 2/24/2016.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController);

    function FormController($location, UserService, FormService,$routeParams) {
        var vm = this;
        //currently logged in user
        var currentUser = UserService.getCurrentUser();
        vm.$location = $location;

        //Event handler declarations
        vm.addForm = addForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;
        vm.updateForm = updateForm;
        vm.formClick = formClick;

        //Fetching all forms for current user to display
        function init() {
            console.log("form controller init()");
            FormService
                .findAllFormsForUser(currentUser._id)
                .then(findAllFormsForUserCallback);
        }
        init();

        //Event handler implementations
        function addForm(form) {
            form.userId = currentUser._id;
            //form._id = (new Date()).getTime();
            FormService
                .createFormForUser(currentUser._id,form)
                .then(addFormCallback);
            vm.form = null;
        }

        function deleteForm(index) {
            var formId = vm.forms[index]._id;
            FormService
                .deleteFormById(formId)
                .then(deleteFormCallback);

        }

        function selectForm(index) {

            vm.selectedRow = index;
            vm.form = {
                _id: vm.forms[index]._id,
                title: vm.forms[index].title,
                userId: vm.forms[index].userId
            };
            console.log(vm.form);

        }

        function updateForm(form) {
            FormService
                .updateFormById(form._id,form)
                .then(updateFormCallback);
            vm.form = null;
        }

        function formClick(form) {

            console.log(form._id);
            $location.path("/form/"+form._id+"/fields");
        }


        //callback functions
        function findAllFormsForUserCallback(formsCurrentUser) {
            console.log(formsCurrentUser);
            vm.forms = formsCurrentUser.data;

        }

        function addFormCallback(form) {
            console.log("Add form callback init called");
            init();
        }

        function deleteFormCallback(forms) {
            init();
        }

        function updateFormCallback(form) {
            console.log("Add form callback init called");
            init();
        }


    }


})();
