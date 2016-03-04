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
            //.when("/profile", {
            //        templateUrl: "views/users/profile.view.html",
            //        controller: "ProfileController"
            //    })
            //.when("/admin", {
            //        templateUrl: "views/admin/admin.view.html"
            //    })
            //.when("/forms", {
            //        templateUrl: "views/forms/forms.view.html"
            //    })
            //.when("/fields", {
            //        templateUrl: "views/forms/fields.view.html"
            //    })
            //.when("/register", {
            //        templateUrl: "views/users/register.view.html",
            //        controller: "RegisterController"
            //    })
            //.when("/login", {
            //        templateUrl: "views/users/login.view.html",
            //        controller: "LoginController"
            //    })
            .when("/home", {
                templateUrl: "client/views/home/home.view.html",
                controller: "HomeController"
            })
            .when("/details/:apartmentId", {
                templateUrl: "client/views/apartment/details.view.html",
                controller: "ApartmentDetailsController"
            })
            .otherwise({
                    redirectTo: "/"
                })


    });
})();
