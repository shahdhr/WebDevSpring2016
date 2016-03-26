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
                        getLoggedIn : getLoggedIn
                    }
                })
                .when("/details/:apartmentId", {
                    templateUrl: "views/apartment/details.view.html",
                    controller: "ApartmentDetailsController",
                    controllerAs: "model",
                    resolve: {
                        getLoggedIn : getLoggedIn
                    }
                })
                .when("/login", {
                    templateUrl: "views/users/login.view.html",
                    controller: "LoginController",
                    controllerAs: "model",
                })
                .when("/register", {
                    templateUrl: "views/users/register.view.html",
                    controller: "RegisterController",
                    controllerAs: "model",
                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",
                    controller: "ProfileController",
                    controllerAs: "model",
                    resolve: {
                        checkLoggedIn : checkLoggedIn
                    }
                })
                .when("/apartment", {
                    templateUrl: "views/apartment/apartment.view.html",
                    controller: "ApartmentController",
                    controllerAs: "model"
                })
                .when("/booking", {
                    templateUrl: "views/booking/booking.view.html",
                    controller: "BookingController",
                    controllerAs: "model"
                })
                .when("/review", {
                    templateUrl: "views/review/review.view.html",
                    controller: "ReviewController",
                    controllerAs: "model"
                })
                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html",
                    controller: "AdminController",
                    controllerAs: "model"
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
                UserService.setCurrentUser(currentUser);
                deferred.resolve();
            });
        return deferred.promise;
    }

    function checkLoggedIn(UserService, $q, $location) {
        var deferred = $q.defer();
        UserService
            .getCurrentSessionUser()
            .then(function (response){
                var currentUser = response.data;
                if(currentUser) {
                    UserService.setCurrentUser(currentUser);
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url("/home");
                }
            });
        return deferred.promise;
    }
})();
