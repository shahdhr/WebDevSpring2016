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

                .otherwise({
                    redirectTo: "/"
                })


        });


})();
