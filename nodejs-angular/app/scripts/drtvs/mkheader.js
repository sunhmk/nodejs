'use strict';
angular.module('app.com')
	.directive('mkheader',['$log',function($log){
		return {
			restrict:'E',
			replace:true,
			require:'?ngModel',
			templateUrl:'views/tpl/header.tpl',
			controller:function($scope){
				
			},
			link:function($scope){//$scope,element,attrs,ngModel){
				$log.info('test');
				//$log.info(MenuServices.get());
			}
		};
	}]);