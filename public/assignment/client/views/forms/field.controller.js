/**
 * Created by Dhruv on 3/18/2016.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("FieldController",FieldController);

    function FieldController($scope, $location, UserService, FormService,$routeParams, FieldService) {

        //currently logged in user
        var currentUser = UserService.getCurrentUser();
        var formId = $routeParams.formId;
        function init() {
            FieldService.getFieldsForForm(formId)
                .then(fieldsForFormCallback);
        }
        init();

        $scope.$location = $location;
        $scope.model = {
            fieldType: null,
            availableOptions: [{id: '1', name: 'Single Line Text Field'},
                {id: '2', name: 'Multi Line Text Field'},
                {id: '3', name: 'Date Field'},
                {id: '4', name: 'Checkboxes Field'},
                {id: '5', name: 'Dropdown Field'},
                {id: '6', name: 'Radio Buttons Field'}]
        };

        //Event handler declarations
        $scope.addField=addField;
        $scope.removeField = removeField;

        //Event handler implementation
        function addField(fieldType) {
            if(fieldType) {
                console.log(fieldType);
            }

        }

        function removeField(field) {
            console.log("remove"+field._id);
        }

        //callbacks
        function fieldsForFormCallback(fields) {
            $scope.fields = fields.data;
            console.log(fields);
        }
    }


    //Callback function


    //    //Event handler declarations
    //    $scope.addForm = addForm;
    //    $scope.deleteForm = deleteForm;
    //    $scope.selectForm = selectForm;
    //    $scope.updateForm = updateForm;
    //
    //    //Fetching all forms for current user to display
    //    function init() {
    //        FormService
    //            .findAllFormsForUser(currentUser._id)
    //            .then(findAllFormsForUserCallback);
    //    }
    //    init();
    //
    //    //Event handler implementations
    //    function addForm(form) {
    //        form.userId = currentUser._id;
    //        form._id = (new Date()).getTime();
    //        FormService
    //            .createFormForUser(currentUser._id,form)
    //            .then(addFormCallback);
    //        $scope.form = null;
    //    }
    //
    //    function deleteForm(index) {
    //        var formId = $scope.forms[index]._id;
    //        FormService
    //            .deleteFormById(formId)
    //            .then(deleteFormCallback);
    //
    //    }
    //
    //    function selectForm(index) {
    //
    //        $scope.selectedRow = index;
    //        $scope.form = {
    //            _id: $scope.forms[index]._id,
    //            title: $scope.forms[index].title,
    //            userId: $scope.forms[index].userId
    //        };
    //
    //    }
    //
    //    function updateForm(form) {
    //        FormService
    //            .updateFormById(form._id,form)
    //            .then(updateFormCallback);
    //        $scope.form = null;
    //    }
    //
    //
    //    //callback functions
    //    function findAllFormsForUserCallback(formsCurrentUser) {
    //        console.log(formsCurrentUser.data);
    //        $scope.forms = formsCurrentUser.data;
    //
    //    }
    //
    //    function addFormCallback(form) {
    //        init();
    //    }
    //
    //    function deleteFormCallback(forms) {
    //        init();
    //    }
    //
    //    function updateFormCallback(form) {
    //        init();
    //    }
    //
    //
    //}


})();