'use strict';

/**
 * @ngdoc function
 * @name bobbyApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bobbyApp
 */
angular.module('bobbyApp')
  .controller('indexMyBookingsCtrl', function ($scope, serviceAjax, $location) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.asso_id = 1;

    /*Filtre en fonction du statut des réservations*/
    $scope.status = 1;

    $scope.changeStatus=function(nb){
      $scope.status = nb;
    }

     //Recherche de la catégorie séléectionné
    var loadBookings = function(){
      $scope.loading = true;
      serviceAjax.get("bookings/asso/" + $scope.asso_id).then(function(data){
        $scope.bookings = data.data;
        console.log("donnees", $scope.bookings)
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

