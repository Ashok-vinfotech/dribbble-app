'use strict';

angular.module('Shots', ['ngRoute'])

.controller('ShotsCtrl', function(ShotsResource, $scope, $uibModal) {
	$scope.page = 1;
	
	$scope.shots = [];
	
	ShotsResource.query({ page: $scope.page }).$promise.then(function(data) {
		$scope.shots = data;
	});
	
	$scope.showDetails = function (index) {
		$uibModal.open({
			templateUrl: 'details',
			size: 'details',
			controller: 'DetailsCtrl',
			resolve: {
				shot: function() {
					return $scope.shots[index];
				}
			}
		});
	}
	
	$scope.loadMore = function () {
		$scope.page += 1;
		ShotsResource.query({ page: $scope.page, per_page: 15 }).$promise.then(function (data) {
			for (var key in data)
			{
				if (!isNaN(key))
					$scope.shots.push(data[key]);
			}
		});
	}
});