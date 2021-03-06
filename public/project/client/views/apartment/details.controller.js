/**
 * Created by Dhruv on 3/3/2016.
 */
"use strict";
(function() {
    angular
        .module("RentOutApp")
        .controller("ApartmentDetailsController",ApartmentDetailsController);

    function ApartmentDetailsController( $sce, $routeParams, ApartmentService,UserService,ReviewService,BookingService,MessageService) {

        //Declarations
        var vm = this;
        vm.deliberatelyTrustDangerousSnippet = deliberatelyTrustDangerousSnippet;
        var today = new Date().toISOString().split('T')[0];
        vm.minDate = today;
        var apartmentId = $routeParams.apartmentId;
        var currentUser = UserService.getCurrentUser();
        vm.addApartmentToFavourites = addApartmentToFavourites;
        vm.showReviews = showReviews;
        vm.addReview = addReview;
        vm.bookApartment = bookApartment;
        vm.bookButton = "Submit";
        vm.alertClosed = alertClosed;
        vm.sendMessage = sendMessage;
        vm.favouriteButton = "Mark as favourite";
        console.log(apartmentId);


        //Initialization method
        function init() {
            ApartmentService.findApartmentDetailsById(apartmentId, renderDetails);
        } init();


        //Implementations
        function deliberatelyTrustDangerousSnippet(text) {
            return $sce.trustAsHtml(text);
        }


        function checkIfFavourite() {
            var currentUser = UserService.getCurrentUser();
            if(currentUser) {
                for(var i = 0;i<currentUser.favourites.length;i++) {
                    if(currentUser.favourites[i]==vm.apartment.id) {
                        vm.favourited = true;
                    }
                }
                console.log(vm.favourited);
            }
        }

        function bookApartment(book,bookButton) {
            var user = UserService.getCurrentUser();
            if(user) {
                if(bookButton=="Submit") {
                    var date1 = new Date(book.startDate);
                    var date2 = new Date(book.endDate);
                    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
                    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    vm.Total = diffDays * Number(vm.pricing.price);
                    vm.bookButton = "Book?"
                } else {
                    console.log("iyan aayvu");

                    console.log(user);
                    if(user) {
                        var booking = {
                            startDate:book.startDate,
                            endDate:book.endDate,
                            apartmentId:vm.apartment.id,
                            apartmentName:vm.apartment.name,
                            booked_by:user._id,
                            amount:vm.Total
                        };
                        BookingService.addBooking(booking)
                            .then(function (res) {
                                    vm.bookingDone = "Booking Done!";
                                    vm.bookButton = "Submit"
                                    vm.Total = null;
                                    vm.book=null;
                                },
                                function (err) {
                                    vm.bookingDone = "Booking Failed!"
                                });
                    } else {
                        UserService.loginFirst();
                    }


                }
            } else {
                UserService.loginFirst();
            }


        }

        function showReviews() {
            ReviewService
                .findAllReviewsForApartemnt(apartmentId)
                .then(function(res){
                    console.log(res.data);
                    vm.reviews = res.data;

                });
        }
        showReviews();

        function addReview(review)
        {
            var user = UserService.getCurrentUser();
            if(user) {
                if(review) {


                    var newReview = {
                        apartmentId : apartmentId,
                        description : review.description,
                        rating : review.rating,
                        reviewed_by : user._id
                    };
                    ReviewService
                        .addReview(newReview)
                        .then(addReviewCallback);

                    vm.review = null;
                }

            } else {
                UserService.loginFirst();
            }

        }

        function renderDetails(apartmentDetails) {
            console.log(apartmentDetails.place.place_details);
            vm.apartment = apartmentDetails.place.place_details;
            vm.pricing = apartmentDetails.place.pricing;
            makeSlides();
            checkIfFavourite();
        }

        function addApartmentToFavourites() {
            var currentUser = UserService.getCurrentUser();
            if(currentUser) {
                if(!vm.favourited) {
                    var user = UserService.getCurrentUser();
                    user.favourites.push(apartmentId);
                    UserService
                        .updateUser(user._id, user)
                        .then(addApartmentToFavouritesCallback);
                }
            } else {
                UserService.loginFirst();
            }



        }

        function addApartmentToFavouritesCallback(user) {
            console.log(user.data.favourites);
            vm.favouriteButton = "Marked";
            vm.favourited=true;
        }

        function addReviewCallback(review) {
            console.log(review);
            showReviews();
        }


        vm.myInterval = 5000;
        vm.noWrapSlides = false;
        vm.active = 0;
        var slides = [];
        var currIndex = 0;


        function makeSlides() {
            var slidesNew = vm.apartment.additional_photos;
            var loop = slidesNew.length;
            if(loop > 10) {
                loop = 10;
            }
            for(var  i = 0;i<loop;i++) {
                slidesNew[i].place_photo.url = slidesNew[i].place_photo.url.replace("/medium.","/large.");
                slides.push(slidesNew[i]);
            }

            vm.newSlides = slides;
        }

        function alertClosed() {
            vm.bookingDone = null;  vm.messageDone = null;
        }


        function sendMessage(message) {
            var user = UserService.getCurrentUser();
            if(user) {
                var newMessage = {
                    message: message,
                    message_to: "9FlatsOwner",
                    message_by: user._id,
                    message_time : Date.now,
                    message_by_name : user.firstName +" "+user.lastName,
                    apartment : vm.apartment.name,
                    apartment_id : apartmentId
                };
                MessageService.addMessage(newMessage)
                    .then(function(res) {
                        vm.messageDone = "Message sent to owner"
                    })

            } else {
                UserService.loginFirst();
            }

        }

    }
})();