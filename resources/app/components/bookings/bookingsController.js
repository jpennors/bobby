'use strict';

/**
 * @ngdoc function
 * @name bobbyApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bobbyApp
 */
angular.module('bobbyApp')
  .controller('bookingsCtrl', function ($scope, serviceAjax, $routeParams, $location, $http, focusMe, $timeout, $filter) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    //Emprunt
    $scope.booking = {}

    /*Chargement des associations d'un utilisateur*/
    var loadAssociations = function(){
    $scope.loading = true;
    serviceAjax.get("associations").then(function(data){
        $scope.assos=data.data;
    });
    $scope.loading=false;
  }
  loadAssociations();

  //Fonction pour la sélection de l'association demandant un item
  $scope.assoRequesting = function($id){
    $scope.booking.assoRequesting = $scope.assos.filter((r)=>r.id == $id)[0];
    console.log($scope.booking);
    //Chargement des associations hormis celles sélectionnées
    loadAssociationsRequested($id);
  }

  /*Chargement des associations d'un utilisateur*/
    var loadAssociationsRequested = function($id){
    $scope.loading = true;
    serviceAjax.get("booking/assos/"+$id).then(function(data){
        $scope.assosRequested=data.data;
    });
    $scope.loading=false;
  }
  
  //Fonction pour la sélection de l'association possédant les items à emprunter
  $scope.associationRequested = function($id){
    $scope.booking.assoRequested = $scope.assos.filter((r)=>r.id == $id)[0];
    loadItem($scope.booking.assoRequested.id);
    //Chargement des associations hormis celles sélectionnées
  }

  /***  ETAPE 3 ***/
  $scope.dateSave = function(){
    $scope.booking.date = true;
  }

  /***  ETAPE 4 ***/
  //Chargement des items en fonction de l'association sélectionnée
  //ATTENTION FAIRE REQUETE SANS CAUTION ETC //
    var loadItem = function($id){
      $scope.loading=true;
      serviceAjax.get("booking/items/" + $id).then(function(data){
        $scope.items = data.data;
      });
      $scope.loading=false;
      
    }  

    //Items réservés 
    $scope.bookingline = {}
    $scope.bookingline.items = [];

    //Ajouter un item dans le panier en baissant la quantité d'items restantes
    $scope.addItem = function($item){
      //$scope.bboking
      $item.quantity--;

      var index = $scope.bookingline.items.map((p) => { return p.id; }).indexOf($item.id);
      if(index == -1) {
            $scope.bookingline.items.push({
                id: $item.id,
                name: $item.name,
                quantity: 1,
                startDateAngular : $scope.booking.startDate,
                endDateAngular : $scope.booking.endDate
            })
        }else {
            var itemBooked = $scope.bookingline.items[index];
            itemBooked.quantity += 1;
        }
    }

    /*** RESUME DE LA RESERVATION ***/

    //Modification de l'association demandant des items
    $scope.changeAssoRequesting = function(){
      $scope.booking.assoRequesting = null;
    }

    //Modification de l'association à qui des items sont demandés
    $scope.changeAssoRequested = function(){
      $scope.booking.assoRequested = null;
      $scope.bookingline.items = [];
    }

    //Fonction permettant d'ajouter dans le résumé de la réservation un item si le stock le permet (icone +)
    $scope.addItemByIndex = function($index){
      var itemBooked = $scope.bookingline.items[$index];
      var item = $scope.items.filter((r)=>r.id == itemBooked.id)[0];
        if(item.quantity > 0){
            item.quantity--;
            itemBooked.quantity++;
        }
    }

    //Fonction permettant dde diminuer dans le résumé de la réservation un item si le stock le permet (icone -)
    $scope.removeProductByIndex=function($index){
      var itemBooked = $scope.bookingline.items[$index];
      var item = $scope.items.filter((r)=>r.id == itemBooked.id)[0];
      item.quantity++;
      itemBooked.quantity--;
        if(itemBooked.quantity == 0){
            $scope.bookingline.items.splice($index, 1);
        }
    }

    //Modification de la date de départ du prêt d'un item
    $scope.editStartDate = function($item){
      $item.editStartDate = true; 
    }

    //Modification de la date de fin du prêt d'un item
    $scope.editEndDate = function($item){
      $item.editEndDate = true; 
    }

    //Validation de la commande
    $scope.save = function(){
      //console.log($scope.booking);
      $scope.booking.user = 1;
      $scope.booking.owner = $scope.booking.assoRequested.id;
      $scope.booking.booker = $scope.booking.assoRequesting.id;
      $scope.booking.status = 1;
      $scope.booking.cautionReceived = false;
      serviceAjax.post("booking/validation/items", $scope.bookingline, "POST").then(function(data){
        $scope.booking.caution = data.data;
        serviceAjax.post('bookings', $scope.booking, 'POST').then(function(data){
          console.log("bookingline", data);
          var bookingId = data.data.id;
          //Enregistrement des items un à un
         for(var i = $scope.bookingline.items.length - 1; i >= 0; i--) {

            $scope.bookingline.items[i].startDate = $filter('date')($scope.bookingline.items[i].startDateAngular, "yyyy-MM-dd HH:mm:ss");
            $scope.bookingline.items[i].endDate = $filter('date')($scope.bookingline.items[i].endDateAngular, "yyyy-MM-dd HH:mm:ss");
            $scope.bookingline.items[i].item = $scope.bookingline.items[i].id;
            $scope.bookingline.items[i].booking = bookingId;
            $scope.bookingline.items[i].status = 1;
            serviceAjax.post('bookinglines', $scope.bookingline.items[i], 'POST');
          }
        });
      })
      
    }



  });

