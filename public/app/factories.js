angular.module('bobbyApp')  
  .factory('focusMe', ['$timeout', '$parse', function ($timeout, $parse) {
      return {
        //scope: true,   // optionally create a child scope
        link: function (scope, element, attrs) {
          var model = $parse(attrs.focusMe);
          scope.$watch(model, function (value) {
            console.log('value=', value);
            if (value === true) {
              $timeout(function () {
                element[0].focus();
              });
            }
          });
          // to address @blesh's comment, set attribute value to 'false'
          // on blur event:
          element.bind('blur', function () {
            console.log('blur');
            scope.$apply(model.assign(scope, false));
          });
        }
      };
  }]);
'use strict';

/**
 * @ngdoc service
 * @name bobbyApp.serviceAjax
 * @description
 * # serviceAjax
 * Factory in the bobbyApp.
 */
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;

}

var csrftoken =  getCookie('csrftoken');

angular.module('bobbyApp')
  .factory('serviceAjax', function serviceAjax($http) {
        return{
            get: function(path){
                return $http.get(__ENV.apiUrl + '/' + path);
            },

            post: function(path, item, methodType){
                return $http({
                    method : methodType,
                    url : __ENV.apiUrl + '/' + path,
                    data : item,
                });
            }

        }
    });