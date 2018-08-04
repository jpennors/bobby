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
        templateUrl : 'app/components/bookings/create_booking.html',
        controller : 'createBookingCtrl',
        controllerAs : 'createBooking'
      })
      .when('/mybookings',{
        templateUrl : 'app/components/bookings/index_my_bookings.html',
        controller : 'indexMyBookingsCtrl',
        controllerAs : 'createBooking'
      })
      .when('/booking/:id',{
        templateUrl : 'app/components/bookings/edit_booking.html',
        controller : 'editBookingCtrl',
        controllerAs : 'editBooking'
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
        templateUrl : 'app/components/bookings/administrator/index_bookings.html',
        controller : 'indexBookingsCtrl',
        controllerAs : 'indexBookings'
      })      
      .otherwise({
        redirectTo: '/'
      });
  });
