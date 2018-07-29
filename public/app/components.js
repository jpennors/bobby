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
  .controller('MyItemsCtrl', function ($scope, serviceAjax, $routeParams, $location, $http, focusMe) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

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
        console.log('items', $scope.items);
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
      $http.put('http://localhost:8000/api/v1/items/'+ $item.id, $item, gererErreur).then(function(){
        $item.edit = !$item.edit;
        loadItem();
      })
    }

    $scope.cancel = function(){
      $scope.addNewItem = false;
      loadItem();
    }

    $scope.save = function(){
      console.log($scope.newItem);
      $scope.loading=true;
      serviceAjax.post('items', $scope.newItem, 'POST', gererErreur).then(function(){
        loadItem();
      })
      console.log($scope.items);      

      $scope.loading=false;

      loadNewItem();
    }



    $scope.delete = function($item){
      $http.delete('http://localhost:8000/api/v1/items/'+ $item.id).then(function(){
        loadItem();
      })

    }

    var gererErreur = function(error) {
        if(error.status == 422) {
            $scope.inputErrors = error.data.data;
        }
        else if(error.status == 409) {
            $scope.messageError = "Une machine avec le même nom existe déjà";
        }

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
  .controller('placesManagementCtrl', function ($scope, serviceAjax, $location, $http, focusMe) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

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
      })
      $scope.loading=false;
      $scope.addNewPlace = false;
      loadNewPlace();
    }



    $scope.delete = function($place){
      $http.delete('http://localhost:8000/api/v1/itemplaces/'+ $place.id).then(function(){
        loadPlace();
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
  .controller('categoriesManagementCtrl', function ($scope, serviceAjax, $location, $http, focusMe) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

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
      })
      $scope.loading=false;
      $scope.addNewCategorie = false;
      loadNewCategorie();
    }



    $scope.delete = function($categorie){
      $http.delete('http://localhost:8000/api/v1/itemtypes/'+ $categorie.id).then(function(){
        loadCategorie();
      })

    }

  });


