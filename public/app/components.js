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
            console.log($scope.bookingline.items[i]);
            serviceAjax.post('bookinglines', $scope.bookingline.items[i], 'POST');
          }
        });
      })
      
    }



  });


'use strict';

/**
 * @ngdoc function
 * @name bobbyApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bobbyApp
 */
angular.module('bobbyApp')
  .controller('categorieCtrl', function ($scope, serviceAjax, $routeParams, $location, $http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.categorie_id = $routeParams.id;

     //Recherche de la catégorie séléectionné
    var loadCategorie = function(){
      $scope.loading = true;
      serviceAjax.get("itemtypes/"+$scope.categorie_id).then(function(data){
        $scope.type = data.data.name;
        console.log(data.data.name);
      })
    }
    loadCategorie();
    
    //Chargement des items en fonction de la catégorie sélectionnée
    var loadItem = function(){
      $scope.loading=true;
      serviceAjax.get("items/categories/"+$scope.categorie_id).then(function(data){
        $scope.items = data.data;
      });
      $scope.loading=false;
    }
    loadItem();

  });


'use strict';

/**
 * @ngdoc function
 * @name bobbyApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bobbyApp
 */
angular.module('bobbyApp')
  .controller('MyItemsCtrl', function ($scope, serviceAjax, $routeParams, $location, $http, focusMe, $timeout) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    /*Initialisation des boutons de confirmation*/
    $scope.addConfirmation = false;
    $scope.updateConfirmation = false;
    $scope.deleteConfirmation = false;

    $scope.asso_id = $routeParams.asso_id;

    var loadAssociation = function(){
      $scope.loading=true;
      serviceAjax.get("associations/"+$scope.asso_id).then(function(data){
        $scope.asso = data.data.name;
      });
      $scope.loading=false;
    }
    loadAssociation();

    var loadItemTypes = function(){
        $scope.loading = true;
      serviceAjax.get("itemtypes").then(function(data){
            $scope.types=data.data;
            //Initialisation du type du nouvel item avec le premier élément des types
            $scope.newItem.type = ""+$scope.types[0].id;
        });
    };
    loadItemTypes();

    var loadItemPlaces = function(){
        $scope.loading = true;
      serviceAjax.get("itemplaces").then(function(data){
            $scope.places=data.data;
            //Initialisation de la localisation du nouvel item avec le premier élément des localisations 
            $scope.newItem.place = "" + $scope.places[0].id;
        });
      
    };
    loadItemPlaces();

    
    //Chargement des items en fonction de l'association sélectionnée
    var loadItem = function(){
      $scope.loading=true;
      serviceAjax.get("association/items/"+$scope.asso_id).then(function(data){
        $scope.items = data.data;
        for (var i = $scope.items.length - 1; i >= 0; i--) {
          //Permet d'affecter au ng-model d'edition des éléments
          $scope.items[i].typeSection = $scope.types.filter((r)=>r.id == $scope.items[i].type)[0];
          $scope.items[i].placeSection = $scope.places.filter((r)=>r.id == $scope.items[i].place)[0];
          $scope.items[i].status = $scope.items[i].status.toString();
        }
      });
      $scope.loading=false;
      
    }
    loadItem();

    //Pour afficher le formulaire d'ajout d'un nouvel item
    $scope.addNewItem = false;
    
    var loadNewItem = function(){
      //Pour remplir le nouvel item
      $scope.newItem = {};
      //Paramètre par défaut
      $scope.newItem.status = "1";
      $scope.newItem.association = $routeParams.asso_id;
    }

    loadNewItem();

    /* Gestion des tries des items*/
    $scope.propertyName = 'name';
    $scope.reverse = false;

    $scope.sortBy = function(propertyName) {
      $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
      $scope.propertyName = propertyName;
    };

    /* Fonctions de gestions des items*/

    $scope.add = function(){
      $scope.addNewItem = true;
      $scope.focusInput = true;
      console.log('newItem', $scope.newItem);
    }

    $scope.edit = function($item){
      $scope.addNewItem = false;
      $item.edit=!$item.edit;
    }

    $scope.update = function($item){
      console.log($item);
      if($item.typeSection)
        $item.type = $item.typeSection.id;
      if($item.placeSection)
        $item.place = $item.placeSection.id;
      $http.put('http://localhost:8000/api/v1/items/'+ $item.id, $item).then(function(){
        $item.edit = !$item.edit;
        loadItem();
        $scope.updateConfirmation = true;
        $timeout(function() {
           $scope.updateConfirmation = false;
        }, 3000)
      })
    }

    $scope.cancel = function(){
      $scope.addNewItem = false;
      loadItem();
    }

    $scope.save = function(){
      console.log($scope.newItem);
      $scope.loading=true;
      serviceAjax.post('items', $scope.newItem, 'POST').then(function(){
        loadItem();
        $scope.addConfirmation = true;
        $timeout(function() {
           $scope.addConfirmation = false;
        }, 3000)
      })
      console.log($scope.items);      

      $scope.loading=false;
      $scope.addNewItem = false;

      loadNewItem();
      $scope.newItem.type = ""+$scope.types[0].id;
      $scope.newItem.place = "" + $scope.places[0].id;
    }



    $scope.delete = function($item){
      $http.delete('http://localhost:8000/api/v1/items/'+ $item.id).then(function(){
        loadItem();
        $scope.deleteConfirmation = true;
        $timeout(function() {
           $scope.deleteConfirmation = false;
        }, 3000)
      })

    }

  });


'use strict';

/**
 * @ngdoc function
 * @name bobbyApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bobbyApp
 */
angular.module('bobbyApp')
  .controller('placesManagementCtrl', function ($scope, serviceAjax, $location, $http, focusMe, $timeout) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    /*Initialisation des boutons de confirmation*/
    $scope.addConfirmation = false;
    $scope.updateConfirmation = false;
    $scope.deleteConfirmation = false;

    //Pour afficher le formulaire d'ajout d'une nouvelle catégorie
    $scope.addNewPlace = false;
    
    var loadNewPlace = function(){
      //Pour remplir la nouvelle catégorie
      $scope.newPlace = {};
    }

    loadNewPlace();


     //Recherche de la catégorie séléectionné
    var loadPlace = function(){
      $scope.loading = true;
      serviceAjax.get("itemplaces").then(function(data){
        $scope.places = data.data;
      })
    }
    loadPlace();

    /* Tri des catégories */
    $scope.reverse = false;

    $scope.sort = function() {
      $scope.reverse = !$scope.reverse;
    };

    /* Fonctions de gestions des catégories*/

    $scope.add = function(){
      $scope.addNewPlace = true;
      $scope.focusInput = true;
    }

    $scope.edit = function($place){
      $place.edit=!$place.edit;
    }

    $scope.update = function($place){
      $http.put('http://localhost:8000/api/v1/itemplaces/'+ $place.id, $place).then(function(){
        $place.edit = !$place.edit;
        $scope.updateConfirmation = true;
        $timeout(function() {
           $scope.updateConfirmation = false;
        }, 3000);
      })
    }

    $scope.cancel = function(){
      $scope.addNewPlace = false;
      loadPlace();
    }

    $scope.save = function(){
      $scope.loading=true;
      serviceAjax.post('itemplaces', $scope.newPlace, 'POST').then(function(){
        loadPlace();
        $scope.addConfirmation = true;
        $timeout(function() {
           $scope.addConfirmation = false;
        }, 3000)
      })
      $scope.loading=false;
      $scope.addNewPlace = false;
      loadNewPlace();
    }



    $scope.delete = function($place){
      $http.delete('http://localhost:8000/api/v1/itemplaces/'+ $place.id).then(function(){
        loadPlace();
        $scope.deleteConfirmation = true;
        $timeout(function() {
           $scope.deleteConfirmation = false;
        }, 3000)
      })

    }

  });


'use strict';

/**
 * @ngdoc function
 * @name bobbyApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bobbyApp
 */
angular.module('bobbyApp')
  .controller('categoriesManagementCtrl', function ($scope, serviceAjax, $location, $http, focusMe, $timeout) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    /*Initialisation des boutons de confirmation*/
    $scope.addConfirmation = false;
    $scope.updateConfirmation = false;
    $scope.deleteConfirmation = false;

    //Pour afficher le formulaire d'ajout d'une nouvelle catégorie
    $scope.addNewCategorie = false;
    
    var loadNewCategorie = function(){
      //Pour remplir la nouvelle catégorie
      $scope.newCategorie = {};
    }

    loadNewCategorie();


     //Recherche de la catégorie séléectionné
    var loadCategorie = function(){
      $scope.loading = true;
      serviceAjax.get("itemtypes").then(function(data){
        $scope.categories = data.data;
      })
    }
    loadCategorie();

    /* Tri des catégories */
    $scope.reverse = false;

    $scope.sort = function() {
      $scope.reverse = !$scope.reverse;
    };

    /* Fonctions de gestions des catégories*/

    $scope.add = function(){
      $scope.addNewCategorie = true;
      $scope.focusInput = true;
    }

    $scope.edit = function($categorie){
      $categorie.edit=!$categorie.edit;
    }

    $scope.update = function($categorie){
      $http.put('http://localhost:8000/api/v1/itemtypes/'+ $categorie.id, $categorie).then(function(){
        $categorie.edit = !$categorie.edit;
        $scope.updateConfirmation = true;
        $timeout(function() {
           $scope.updateConfirmation = false;
        }, 3000)
      })
    }

    $scope.cancel = function(){
      $scope.addNewCategorie = false;
      loadCategorie();
    }

    $scope.save = function(){
      $scope.loading=true;
      serviceAjax.post('itemtypes', $scope.newCategorie, 'POST').then(function(){
        loadCategorie();
        $scope.addNewCategorie = false;
        $scope.addConfirmation = true;
        $timeout(function() {
           $scope.addConfirmation = false;
        }, 3000)
      })
      $scope.loading=false;
      
      loadNewCategorie();
    }



    $scope.delete = function($categorie){
      $http.delete('http://localhost:8000/api/v1/itemtypes/'+ $categorie.id).then(function(){
        loadCategorie();
        $scope.deleteConfirmation = true;
        $timeout(function() {
           $scope.deleteConfirmation = false;
        }, 3000)
      })

    }

  });


