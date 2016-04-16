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
                    controllerAs: "model"

                })

                .when("/register", {
                    templateUrl: "views/users/register.view.html",
                    controller: "RegisterController",
                    controllerAs: "model"
                })

                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",
                    controller: "ProfileController",
                    controllerAs: "model"
                })

                .otherwise({
                    redirectTo: "/"
                })


        });


    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
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


})();
