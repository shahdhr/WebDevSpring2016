/**
 * Created by Dhruv on 2/19/2016.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .config(function($routeProvider) {

            $routeProvider
                .when("/", {
                    redirectTo: "/home"

                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",
                    controller: "ProfileController",
                    controllerAs: "model",
                    resolve: {
                        checkLoggedIn : checkLoggedIn
                    }
                })
                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html",
                    controller: "AdminController",
                    controllerAs: "model",
                    resolve: {
                        verifyLoggedInAsAdmin : verifyLoggedInAsAdmin
                    }
                })
                .when("/forms", {
                    templateUrl: "views/forms/forms.view.html",
                    resolve: {
                        checkLoggedIn : checkLoggedIn
                    }
                })
                .when("/form/:formId/fields", {
                    templateUrl: "views/forms/fields.view.html",
                    controller: "FieldController",
                    controllerAs: "model",
                    resolve: {
                        getLoggedIn : getLoggedIn
                    }
                })
                .when("/register", {
                    templateUrl: "views/users/register.view.html",
                    controller: "RegisterController",
                    controllerAs: "model"
                })
                .when("/login", {
                    templateUrl: "views/users/login.view.html",
                    controller: "LoginController",
                    controllerAs: "model"

                })
                .when("/home", {
                    templateUrl: "views/home/home.view.html",
                    resolve: {
                        getLoggedIn : getLoggedIn
                    }



                })
                .otherwise({
                    redirectTo: "/"
                })


        });

    function getLoggedIn(UserService, $q) {
        var deferred = $q.defer();
        UserService
            .getCurrentSessionUser()
            .then(function (response) {
                var currentUser = response.data;
                console.log("getLoggedIn");
                console.log(currentUser);
                if (currentUser !== '0')
                {
                    UserService.setCurrentUser(currentUser);
                    deferred.resolve();
                } else {
                    UserService.setCurrentUser(null);
                    deferred.resolve();
                }

            });
        return deferred.promise;
    }


    var checkLoggedIn = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user.data !== '0')
            {
                $rootScope.newUser = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

    function verifyLoggedInAsAdmin(UserService, $q, $location, $rootScope) {
        var deferred = $q.defer();
        UserService.getCurrentSessionUser()
            .then(function (response){
                if (response.data === '0') {
                    delete $rootScope.user;
                    deferred.reject();
                    $location.url("/");
                } else {
                    var user = response.data;
                    $rootScope.user = response.data;
                    if (user.roles.indexOf('admin') === -1) {
                        deferred.reject();
                        $location.url("/");
                    } else {
                        deferred.resolve();
                    }
                }
            });
        return deferred.promise;
    }
})();


;