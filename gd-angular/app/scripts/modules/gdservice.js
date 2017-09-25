'use strict';
angular.module('app.core',[])
	   .factory('gdservice',function($http){
	   		return{
	   			getInputTips:function(keywords)
	   			{
			   		var promise = $http({
			   			method:'GET',
			   			url:'http://restapi.amap.com/v3/assistant/inputtips?key=c93e1e293e5b1c3dc581f3ff633144d3&keywords=' + keywords+ '&types=050301&location=&city=杭州&datatype=all'
			   		});
			   		promise.then(function(data, status, headers, config){
						alert(data);
					},function(data, status, headers, config){
						alert(data);
					});

	   			}
	   		};
	   });