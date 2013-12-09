(function () {
'use strict'

var app = angular.module('app', ['ngRoute','widgets']);

app.run(['$route', '$rootScope',  function ($route, $rootScope) {
 console.log('init');
}]);
})();
       
 
 