'use strict';

angular.module('lmsApp')
  .controller('CustCtrl', function ($scope,$http) {
    $scope.message = 'Hello';
  	$http.get('/api/books').then(function (response) {
    	$scope.oldbooks = response.data;
    });

  	$http.put('/api/books/borrowed/').then(function (response) {
    	$scope.borrowed = response.data;	
    });

  	$scope.sortTitle = function(){
  		$scope.oldbooks.sort(function(a, b){
		 	return a.title.localeCompare(b.title);
		});
		console.log(oldbooks);
  	}

  	$scope.sortAuthor = function(){
  		$scope.oldbooks.sort(function(a, b){
		 	return a.author.localeCompare(b.author);
		});
		console.log(oldbooks);
  	}

  	$scope.sortDate = function(){
  		$scope.oldbooks.sort(function(a, b){
		 	return Date.parse(a.date) - Date.parse(b.date);
		});
		console.log(oldbooks);
  	}

  	$scope.request = function(book){
		$http.put('/api/books/borrow/'+book._id).then(function (response) {
	    	location.reload();	
	    });
  	};

  	$scope.returnbook = function(book){
		$http.put('/api/books/return/'+book._id).then(function (response) {
	    	location.reload();	
	    });
  	};
  });