'use strict';

angular.module('lmsApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/cust', {
        templateUrl: 'app/cust/cust.html',
        controller: 'CustCtrl'
      });
  });
