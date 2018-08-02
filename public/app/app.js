/**
 * @ngdoc overview
 * @name bobbyApp
 * @description
 * # bobbyApp
 *
 * Main module of the application.
 */


/**
 *  Configuration de l'environnement
 */
var __ENV = window.__env;

/**
 * Enable console log when debug is true only
*/



var app  = angular
  .module('bobbyApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angular-toArrayFilter'
  ])
  .constant('__ENV', __ENV)

  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/components/dashboard/main.html',
      })
      .when('/items/:asso_id', {
        templateUrl: 'app/components/items/my_items.html',
        controller: 'MyItemsCtrl',
        controllerAs: 'MyItems'
      })
      .when('/categories/:id', {
        templateUrl: 'app/components/categories/categories.html',
        controller: 'categorieCtrl',
        controllerAs: 'categorie'
      })
      .when('/booking',{
        templateUrl : 'app/components/bookings/createBooking.html',
        controller : 'createBookingCtrl',
        controllerAs : 'createBooking'
      })
      .when('/mybookings',{
        templateUrl : 'app/components/bookings/indexMyBookings.html',
        controller : 'indexMyBookingsCtrl',
        controllerAs : 'createBooking'
      })
      .when('/gestion/categories', {
        templateUrl : 'app/components/categories/administrator/categories_management.html',
        controller : 'categoriesManagementCtrl',
        controllerAs : 'categoriesManagement'
      })
      .when('/gestion/places', {
        templateUrl : 'app/components/places/places_management.html',
        controller : 'placesManagementCtrl',
        controllerAs : 'placesManagement'
      })
      .when('/gestion/bookings',{
        templateUrl : 'app/components/bookings/administrator/indexBookings.html',
        controller : 'indexBookingsCtrl',
        controllerAs : 'indexBookings'
      })      
      /*.when('/items/:asso_id', {
        templateUrl: 'views/items.html',
        controller: 'ItemsCtrl',
        controllerAs: 'Items'
      }).when('/add_item/:asso_id', {
        templateUrl: 'views/add_item.html',
        controller: 'AddItemCtrl',
        controllerAs: 'addItem'
      })
        .when('/validated_booking/:asso_id', {
        templateUrl: 'views/validated_booking.html',
        controller: 'ValidatedBookingCtrl',
        controllerAs: 'validatedBooking'
      })
        .when('/waiting_booking/:asso_id', {
        templateUrl: 'views/waiting_booking.html',
        controller: 'WaitingBookingCtrl',
        controllerAs: 'waitingBooking'
      })
        .when('/refused_booking/:asso_id', {
        templateUrl: 'views/refused_booking.html',
        controller: 'RefusedBookingCtrl',
        controllerAs: 'refusedBooking'
      })
        .when('/my_validated_booking/:asso_id', {
        templateUrl: 'views/my_validated_booking.html',
        controller: 'MyValidatedBookingCtrl',
        controllerAs: 'MyValidatedBooking'
      })
        .when('/my_waiting_booking/:asso_id', {
        templateUrl: 'views/my_waiting_booking.html',
        controller: 'MyWaitingBookingCtrl',
        controllerAs: 'MyWaitingBooking'
      })
        .when('/my_refused_booking/:asso_id', {
        templateUrl: 'views/my_refused_booking.html',
        controller: 'MyRefusedBookingCtrl',
        controllerAs: 'MyRefusedBooking'
      })*/
      .otherwise({
        redirectTo: '/'
      });
  });
