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
                //.when("/forms", {
                //        templateUrl: "views/forms/forms.view.html"
                //    })
                //.when("/fields", {
                //        templateUrl: "views/forms/fields.view.html"
                //    })

                .when("/home", {
                    templateUrl: "views/home/home.view.html",
                    controller: "HomeController"
                })
                .when("/details/:apartmentId", {
                    templateUrl: "views/apartment/details.view.html",
                    controller: "ApartmentDetailsController"
                })
                .when("/login", {
                    templateUrl: "views/users/login.view.html",
                    controller: "LoginController"
                })
                .when("/register", {
                    templateUrl: "views/users/register.view.html",
                    controller: "RegisterController"
                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",
                    controller: "ProfileController"
                })
                .when("/apartment", {
                    templateUrl: "views/apartment/apartment.view.html",
                    controller: "ApartmentController"
                })
                .when("/booking", {
                    templateUrl: "views/booking/booking.view.html",
                    controller: "BookingController"
                })
                .when("/review", {
                    templateUrl: "views/review/review.view.html",
                    controller: "ReviewController"
                })
                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html",
                    controller: "AdminController"
                })
                .otherwise({
                    redirectTo: "/"
                })


        });
})();
