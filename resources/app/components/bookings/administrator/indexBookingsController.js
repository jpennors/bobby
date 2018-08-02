'use strict';

/**
 * @ngdoc function
 * @name bobbyApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bobbyApp
 */
angular.module('bobbyApp')
  .controller('indexBookingsCtrl', function ($scope, serviceAjax, $location) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

     //Recherche de la catégorie séléectionné
    var loadBookings = function(){
      $scope.loading = true;
      serviceAjax.get("bookings").then(function(data){
        $scope.bookings = data.data;
        console.log($scope.bookings)
      })
    }
    loadBookings();

    /* Gestion des tries des items*/
    $scope.propertyName = 'booker';
    $scope.reverse = false;

    $scope.sortBy = function(propertyName) {
      $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
      $scope.propertyName = propertyName;
    };

    /* Ouverture d'une réservation */
    $scope.open= function($id){
      console.log($id);
    }

  });

