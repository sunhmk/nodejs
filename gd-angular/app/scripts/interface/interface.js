'use strict';
// var rs = angular.element($('body')).scope(); then use rs.$apply(function(){rs.myObject={...}})
var itf ;// angular.element($('body')).scope();
!(function(){
	
}());
function sleep(numberMillis) { 
	var now = new Date(); 
	var exitTime = now.getTime() + numberMillis; 
	while (true) { 
		now = new Date(); 
		if (now.getTime() > exitTime) 
		{
			return; 
		}
	} 
}
$(document).ready(function(){
	angular.element(document.body).scope().$on('searchViewsFirstReply',function(evt,views){
		console.log(views);
		//alert(views.pois);
	});
});

//设置中心位置
var setCurPosition = function(lng,lat)
{
	angular.element(document.body).scope().$broadcast('setCurPosition',lng,lat);
	//
	//alert("1");
	//alert(typeof(window.GdQuery));
	
};

var getPositionName = function()
{
	while(true)
	{
		if(typeof(angular.element(document.body).scope().posName) === 'undefined' || angular.element(document.body).scope().posName === '')
		{
			sleep(10);
		}
		else
		{
			break;
		}
	}
	return angular.element(document.body).scope().posName;
};

//无效
var setKey = function(key)
{
	//$('#gdkey').attr('src','http://webapi.amap.com/maps?v=1.3&key=' + key + '&plugin=AMap.Autocomplete,AMap.PlaceSearch,AMap.Walking,AMap.Riding');
};
var showSearchPlaces = function(isShow)
{
	/*方法一、设置变量然后监听变量
	angular.element(document.body).scope().showSearchPlace=isShow;
	angular.element(document.body).scope().$apply();
	*/
	/*方法二、通过事件*/
	angular.element(document.body).scope().$broadcast('showSearchPlace',isShow);
};
//问询
var askAbout = function(place)
{
	angular.element(document.body).scope().$broadcast('askAbout',place);
};
//参数经度、纬度、搜索半径
var searchViewsFirst = function(lng,lat,rad)
{
	angular.element(document.body).scope().$broadcast('searchViewsFirst',lng,lat,toNumber(rad));
};
var searchSecond = function(selIndex)
{
	angular.element(document.body).scope().$broadcast('searchSecond',toNumber(selIndex));	

};
var searchFoodsFirst = function(lng,lat,rad)
{
	angular.element(document.body).scope().$broadcast('searchFoodsFirst',lng,lat,toNumber(rad));
};
var searchHotelsFirst = function(lng,lat,rad)
{
	angular.element(document.body).scope().$broadcast('searchHotelsFirst',lng,lat,toNumber(rad));
};
var searchToiletsFirst = function(lng,lat,rad)
{
	angular.element(document.body).scope().$broadcast('searchToiletsFirst',lng,lat,toNumber(rad));
};
//0-驾车 1-公交 2-骑行 3-步行
var gotoByVehicleFirst = function(type)
{
	angular.element(document.body).scope().$broadcast('gotoByVehicleFirst',toNumber(type));
};
//待搜索的地区
var getWeatherLive = function (area) {
	angular.element(document.body).scope().$broadcast('getWeatherLive',area);
};
var getWeatherForecast = function(area)
{
	angular.element(document.body).scope().$broadcast('getWeatherForecast',area);
};
window.toNumber= function(param)
{
	if(typeof(param)==="string"&&param.length===0)
	{
		return 0;
	}

	if(typeof(param) === "string")
	{
		var n = parseInt(param);
		if (!isNaN(n))
		{
			return n;
		}
	}
	else if(typeof(param)==="number")
	{
		return param;
	}
	return 0;
};