/**
 * Created by Dhruv on 3/3/2016.
 */
"use strict";
(function() {
    angular
        .module("RentOutApp")
        .controller("ApartmentDetailsDBController",ApartmentDetailsDBController);

    function ApartmentDetailsDBController( $routeParams, ApartmentService,UserService,ReviewService,BookingService,MessageService) {
        var vm = this;

        var today = new Date().toISOString().split('T')[0];
        vm.minDate = today;
        var apartmentId = $routeParams.apartmentId;
        console.log(apartmentId);
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
        ApartmentService.findApartmentDetailsByDbId(apartmentId)
            .then(renderDetails);


        function bookApartment(book,bookButton) {
            if(bookButton=="Submit") {
                var date1 = new Date(book.startDate);
                var date2 = new Date(book.endDate);
                var timeDiff = Math.abs(date2.getTime() - date1.getTime());
                var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                console.log(diffDays);
                console.log(vm.pricing.price);
                vm.Total = diffDays * vm.pricing.price;
                vm.bookButton = "Book?"
            } else {
                console.log("iyan aayvu");
                var user = UserService.getCurrentUser();
                console.log(user);
                if(user) {
                    var booking = {
                        startDate:book.startDate,
                        endDate:book.endDate,
                        apartmentId:vm.apartment._id,
                        apartmentName:vm.apartment.title,
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
            //$scope.apartments.push(newApartment);
        }

        function renderDetails(apartmentDetails) {
            console.log(apartmentDetails.data);
            vm.apartment = apartmentDetails.data;
            vm.pricing = {
                price:apartmentDetails.data.price
            };
            console.log(vm.pricing);
            makeSlides();
        }

        function addApartmentToFavourites() {
            var user = UserService.getCurrentUser();
            user.favourites.push(apartmentId);
            UserService
                .updateUser(user._id, user)
                .then(addApartmentToFavouritesCallback);

        }

        function addApartmentToFavouritesCallback(user) {
            console.log(user.data.favourites);
            vm.favouriteButton = "Marked";
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
          var slidesNew = vm.apartment.featured_photo;
            if(slidesNew.length > 0) {
                var loop = slidesNew.length;
                if(loop > 10) {
                    loop = 10;
                }
                for(var  i = 0;i<loop;i++) {
                    //console.log(slidesNew[i].place_photo.url);

                    slidesNew[i].place_photo.url = slidesNew[i].place_photo.url.replace("/medium.","/large.");
                    slides.push(slidesNew[i]);
                }

                vm.newSlides = slides;
            }else {
            vm.noImage = "http://e-makaan.com/wp-content/uploads/2015/07/rental-property-no-photo-available-600x400.jpg"
            }
        }

        function alertClosed() {
            vm.bookingDone = null;
            vm.messageDone = null;
        }


        function sendMessage(message) {
            var user = UserService.getCurrentUser();
            var newMessage = {
                message: message,
                message_to: vm.apartment.owner_id,
                message_by: user._id,
                message_time : Date.now,
                message_by_name : user.firstName +" "+user.lastName,
                apartment : vm.apartment.title,
                apartment_id : apartmentId
            }
            MessageService.addMessage(newMessage)
                .then(function(res) {
                    vm.messageDone = "Message sent to owner"
                })

        }

    }
    })();