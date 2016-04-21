/**
 * Created by Dhruv on 2/19/2016.
 */
"use strict";
(function(){
    angular
        .module("RentOutApp")
        .config(function($routeProvider) {

            $routeProvider
                .when("/", {
                    redirectTo: "/home"

                })

                //.when("/admin", {
                //        templateUrl: "views/admin/admin.view.html"
                //    })


                .when("/home", {
                    templateUrl: "views/home/home.view.html",
                    controller: "HomeController",
                    controllerAs: "model",
                    resolve: {
                        loggedin: getLoggedIn
                    }

                })

                .when("/register", {
                    templateUrl: "views/users/register.view.html",
                    controller: "RegisterController",
                    controllerAs: "model"
                })

                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",
                    controller: "ProfileController",
                    controllerAs: "model",
                    resolve: {
                        checkLoggedIn : checkLoggedIn
                    }
                })

                .when("/search/:searchPlace", {
                    templateUrl: "views/apartment/search.view.html",
                    controller: "SearchController",
                    controllerAs: "model",
                    resolve: {
                        loggedin: getLoggedIn
                    }
                })

                .when("/details/:apartmentId", {
                    templateUrl: "views/apartment/details.view.html",
                    controller: "ApartmentDetailsController",
                    controllerAs: "model",
                    resolve: {
                        loggedin: getLoggedIn
                    }
                })

                .when("/details/rentOut/:apartmentId", {
                    templateUrl: "views/apartment/detailsDb.view.html",
                    controller: "ApartmentDetailsDBController",
                    controllerAs: "model",
                    resolve: {
                        loggedin: getLoggedIn
                    }
                })

                .when("/message",{
                    templateUrl:"views/users/message.view.html",
                    controller:"ChatController",
                    controllerAs:"model",
                    resolve: {
                        loggedin: checkLoggedIn
                    }
                })

                .when("/apartment",{
                    templateUrl:"views/apartment/apartment.view.html",
                    controller:"ApartmentController",
                    controllerAs:"model",
                    resolve: {
                        loggedin: checkLoggedIn
                    }
                })

                .when("/admin",{
                    templateUrl : "views/admin/users.view.html",
                    controller: "AdminController",
                    controllerAs : "model",
                    resolve: {
                        loggedin:checkLoggedIn
                    }
                })

                .when("/admin/apartment",{
                    templateUrl : "views/admin/apartments.view.html",
                    controller:"ApartmentAdminController",
                    controllerAs : "model",
                    resolve: {
                        loggedin : checkLoggedIn
                    }
                })



                .otherwise({
                    redirectTo: "/"
                })


        });


    var checkLoggedIn = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            console.log(user);
            if (user !== '0')
            {
                $rootScope.newUser = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/home');
            }
        });

        return deferred.promise;
    };

    var getLoggedIn = function($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0'){
                $rootScope.newUser = user;
            }
            deferred.resolve();
        });

        return deferred.promise;
    };

})();
