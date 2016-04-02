/**
 * Created by Dhruv on 3/18/2016.
 */
"use strict";
(function () {

    angular
        .module('FormBuilderApp')
        .controller('ModalInstance', function ( $uibModalInstance, editField, popupHeader) {

            var vm = this;
            vm.editField = editField;
            vm.popupHeader = popupHeader;
            if(editField.options) {

                console.log(editField.options);
                var fromattedOptions = null;
                for (var index =0; index< editField.options.length; index++) {
                    console.log(editField.options[index]);
                    var option = editField.options[index];
                    if (fromattedOptions) {

                        fromattedOptions = fromattedOptions + "\n" + option.value + ":" + option.label;
                    } else {

                        fromattedOptions = option.value + ":" + option.label;
                    }
                }

                vm.editField.placeholder = fromattedOptions;
            }
            vm.submit = function(updatedOptions) {
                var temp = [];
                if(updatedOptions.placeholder) {
                    temp = updatedOptions.placeholder.split('\n');
                }

                var newOptions = [];
                for(var index =0;index<temp.length;index++) {
                    var tempString = temp[index];
                    newOptions.push({
                        value: tempString.split(':')[0],
                        label: tempString.split(':')[1]
                    })
                }
                updatedOptions.options = newOptions;
                $uibModalInstance.close(updatedOptions);
            };

            vm.cancel = function() {
                $uibModalInstance.dismiss();
            };
        });

    angular
        .module("FormBuilderApp")
        .controller("FieldController",FieldController);

    function FieldController($location, UserService, FormService,$routeParams, FieldService,$uibModal) {
        var vm = this;
        //currently logged in user
        var currentUser = UserService.getCurrentUser();
        var formId = $routeParams.formId;
        function init() {
            FieldService.getFieldsForForm(formId)
                .then(fieldsForFormCallback);
        }
        init();

        vm.$location = $location;
        vm.modelOptions = {
            fieldType: null,
            availableOptions: [{id: '1', name: 'Single Line Text Field'},
                {id: '2', name: 'Multi Line Text Field'},
                {id: '3', name: 'Date Field'},
                {id: '4', name: 'Checkboxes Field'},
                {id: '5', name: 'Dropdown Field'},
                {id: '6', name: 'Radio Buttons Field'}]
        };

        vm.open = function (fieldType, field) {

            var modalInstance = null;
            var currentLabel = field.label,
                currentPlaceholder = field.placeholder;

            switch (fieldType) {
                case 'TEXT':
                    modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'labelPlaceholder.html',
                        controller: 'ModalInstance',
                        controllerAs:"modelPopUp",
                        size: 'sm',
                        resolve: {
                            popupHeader: function() {
                                return 'Single Line Field'
                            },
                            editField: field
                        }
                    });
                    break;
                case 'EMAIL':
                    modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'labelPlaceholder.html',
                        controller: 'ModalInstance',
                        controllerAs:"modelPopUp",
                        size: 'sm',
                        resolve: {
                            popupHeader: function() {
                                return 'Email Field'
                            },
                            editField: field
                        }
                    });
                    break;
                case 'TEXTAREA':
                    modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'labelPlaceholder.html',
                        controller: 'ModalInstance',
                        controllerAs:"modelPopUp",
                        size: 'sm',
                        resolve: {
                            popupHeader: function() {
                                return 'Multiple Lines Field'
                            },
                            editField: field
                        }
                    });
                    break;
                case 'DATE':
                    modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'labelPlaceholderDate.html',
                        controller: 'ModalInstance',
                        controllerAs:"modelPopUp",
                        size: 'sm',
                        resolve: {
                            popupHeader: function() {
                                return 'Date Field'
                            },
                            editField: field
                        }
                    });
                    break;
                case 'OPTIONS':
                    modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'labelOptions.html',
                        controller: 'ModalInstance',
                        controllerAs:"modelPopUp",
                        size: 'sm',
                        resolve: {
                            popupHeader: function() {
                                return 'Dropdown Field'
                            },
                            editField: field
                        }
                    });
                    break;
                case 'CHECKBOXES':
                    modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'labelOptions.html',
                        controller: 'ModalInstance',
                        controllerAs:"modelPopUp",
                        size: 'sm',
                        resolve: {
                            popupHeader: function() {
                                return 'Checkbox Field'
                            },
                            editField: field
                        }
                    });
                    break;
                case 'RADIOS':
                    modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'labelOptions.html',
                        controller: 'ModalInstance',
                        controllerAs:"modelPopUp",
                        size: 'sm',
                        resolve: {
                            popupHeader: function() {
                                return 'Radio Button Field'
                            },
                            editField: field
                        }
                    });
                    break;
                default:
                    break;
            }

            modalInstance.result.then(function (model) {
                field.label = model.label;
                field.placeholder = model.placeholder;
                FieldService.updateFields(formId, vm.fields);
                console.log(field);
            }, function () {
                field.label = currentLabel;
                field.placeholder = currentPlaceholder;
                console.log("Cancel Pressed");
            });

        };

        //Event handler declarations
        vm.addField=addField;
        vm.removeField = removeField;
        vm.cloneField = cloneField;
        vm.updateModelOnSort=updateModelOnSort;

        //Event handler implementation
        function addField(fieldType) {
            console.log("addField"+fieldType);
            if(fieldType) {
                switch(fieldType) {
                    case "Single Line Text Field":
                        console.log("create text field controller"+formId);
                        FieldService.createFieldForForm(formId,{"label": "New Text Field", "type": "TEXT", "placeholder": "New Field"})
                            .then(function(res) {
                                console.log("create text field controller response"+res);
                                console.log(res);
                                vm.fields = res.data.fields;
                            });

                        break;
                    case "Multi Line Text Field":
                        FieldService.createFieldForForm(formId,{"label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"})
                            .then(function(res) {
                                vm.fields = res.data.fields;
                            });
                        break;
                    case "Date Field":
                        FieldService.createFieldForForm(formId,{ "label": "New Date Field", "type": "DATE"})
                            .then(function(res) {
                                vm.fields = res.data.fields;
                            });
                        break;
                    case "Checkboxes Field":
                        FieldService.createFieldForForm(formId,{ "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                                {"label": "Option A", "value": "OPTION_A"},
                                {"label": "Option B", "value": "OPTION_B"},
                                {"label": "Option C", "value": "OPTION_C"}
                            ]})
                            .then(function(res) {
                                vm.fields = res.data.fields;
                            });
                        break;

                    case "Dropdown Field":
                        FieldService.createFieldForForm(formId,{ "label": "New Dropdown", "type": "OPTIONS", "options": [
                                {"label": "Option 1", "value": "OPTION_1"},
                                {"label": "Option 2", "value": "OPTION_2"},
                                {"label": "Option 3", "value": "OPTION_3"}
                            ]})
                            .then(function(res) {
                                vm.fields = res.data.fields;
                            });
                        break;
                    case "Radio Buttons Field":
                        FieldService.createFieldForForm(formId,{ "label": "New Radio Buttons", "type": "RADIOS", "options": [
                                {"label": "Option X", "value": "OPTION_X"},
                                {"label": "Option Y", "value": "OPTION_Y"},
                                {"label": "Option Z", "value": "OPTION_Z"}
                            ]})
                            .then(function(res) {
                                console.log(res.data.fields);
                                vm.fields = res.data.fields;
                            });
                        break;
                    default:
                        break;
                }
            }

        }

        function removeField(field) {
            console.log("remove"+field._id);
            FieldService.deleteFieldFromForm(formId,field._id)
                .then(function(res) {
                    vm.fields = res.data.fields;
                })
        }

        function cloneField(field) {
            console.log("cloneField"+field.type);

            switch (field.type) {
                case 'TEXT':
                    addField("Single Line Text Field");
                    break;
                case 'EMAIL':
                    addField("Single Line Text Field");
                    break;
                case 'TEXTAREA':
                    addField("Multi Line Text Field");
                    break;
                case 'DATE':
                    addField("Date Field");
                    break;
                case 'OPTIONS':
                    addField("Dropdown Field");
                    break;
                case 'CHECKBOXES':
                    addField("Checkboxes Field");
                    break;
                case 'RADIOS':
                    addField("Radio Buttons Field");
                    break;
                default:
                    break;
            }
        }

        function updateModelOnSort() {
            FieldService.updateFields(formId, vm.fields);
        }

        //callbacks
        function fieldsForFormCallback(fields) {
            vm.fields = fields.data;
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