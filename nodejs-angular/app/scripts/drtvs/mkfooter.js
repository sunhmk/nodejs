'use strict';
angular.module('app.com')
	.directive('mkfooter',[function(){
		return{
			restrict:'E',
			replace:true,
			templateUrl:'views/tpl/footer.tpl',
			link:function()
			{

			}
		};
	}]);