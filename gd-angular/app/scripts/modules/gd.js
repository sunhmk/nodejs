'use strict';
// Show/hide should indeed work, my thoughts are its simply down to your incorrect use of curly-brace bindings i.e. {{variable}}. Remove those and it should work fine: ng-show="variable"
//https://github.com/angular/angular.js/issues/2339
angular.module('app.core')
	.directive('gd',[function(){
		return {
			replace:true,
			require:'?^ngModel',
			scope:{
				//showSearchPlace:'@',
			},
			templateUrl:'views/gd/gd.html',
			//用作多个指令共享动作
			controller:function($scope)
			{
			},
			link:function(scope,element,attrs,ngModel)
			{
			   //gdservice.getInputTips('杭州东');
			   var map = new AMap.Map('container', {
    				resizeEnable: true,
    				zoom:12,
    				doubleClickZoom: true,
    				center: [120.150057,30.245575]
				});
			   
			    //工具条、比例尺
				AMap.plugin([/*'AMap.ToolBar',*/ 'AMap.Scale', 'AMap.MapType'],
					function () {
					   /* map.addControl(new AMap.ToolBar());*/
					    map.addControl(new AMap.Scale());
		        /*输入提示框*/
			    
					   /* ,'AMap.Geolocation'
					   var geolocation = new AMap.Geolocation({
					        enableHighAccuracy: true,//是否使用高精度定位，默认:true
					        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
					        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
					        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
					        showButton: true,        //显示定位按钮，默认：true
					        buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
					        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
					        showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
					        showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
					        panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
					        zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
					    });
					    map.addControl(geolocation);
					    geolocation.getCurrentPosition();
					    AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
					    AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息*/
				});
				/*//定位开始start
				function onComplete(data){
		            //console.log(completFunc)

               		//创建一个坐标
		            $log.info(data);
		          //  if(completFunc){
		                //completFunc(data);
		           // }
		        }
		        function onError(data){
		            var str = '定位失败,';
		            str += '错误信息：';
		            switch(data.info) {
		                case 'PERMISSION_DENIED':
		                    str += '浏览器阻止了定位操作';
		                    break;
		                case 'POSITION_UNAVAILBLE':
		                    str += '无法获得当前位置';
		                    break;
		                case 'TIMEOUT':
		                    str += '定位超时';
		                    break;
		                default:
		                    str += '未知错误';
		                    break;
		            }
		            //alert(str);
		            $log.info(str);
		        }*/

		        //定位结束 end
				//添加放大、缩小地图组件 start
			    AMapUI.loadUI(['control/BasicControl'], function(BasicControl) {
		            map.addControl(new BasicControl.Zoom({
		            	//theme: 'dark'
		                position: 'br',
		                showZoomNum: true
		            }));
		            map.addControl(new BasicControl.LayerSwitcher({
			            position: 'tr'
			        }));
			    });
			    //end
			   // map.setCity('上海市');//无效
			   
        		
			    var autoOptions = {
			        input: "tipinput"
			    };
				//下拉选择搜索
			    var auto = new AMap.Autocomplete(autoOptions);
			    var inputPlaceSearch = new AMap.PlaceSearch({
			        map: map
			    });  //构造地点查询类
			    function select(e) {
			        inputPlaceSearch.setCity(e.poi.adcode);
			        inputPlaceSearch.search(e.poi.name);  //关键字查询查询
			    }
			    AMap.event.addListener(auto, "select", select);//注册监听，当选中某条记录时会触发
			    function gdQuery(type,poi)
			    {
				    if(typeof(window.GdQuery) != 'undefined' && typeof(window.GdQuery.Call) != 'undefined')
					{
						var str='';
						if(poi == null || poi.length == 0)
						{
							str='';
						}
						else {
							for(var i = 0; i < poi.length && i<5;i++)
							{
								str += poi[i].name;
								if(i <poi.length-1)
								{
									str+= '||';
								}
							}
						}
						//alert("2");
						window.GdQuery.Call(type,str);
					}
			    }
			    /*
			    var placeSearchOptions = { //构造地点查询类
			        pageSize: 5,
			        pageIndex: 1,
			        city: "021" //城市
			    };
			    var placeSearch = new AMap.PlaceSearch(placeSearchOptions);
			    //关键字查询，您如果想修改结果展现效果，请参考页面：http://lbs.amap.com/fn/css-style/
			    placeSearch.search('东方明珠', callback);
			    var placeSearchRender=new Lib.AMap.PlaceSearchRender();
			    function callback(status, result) {
			        if (status === 'complete' && result.info === 'OK') {
			            placeSearchRender.autoRender({
			                placeSearchInstance: placeSearch,
			                methodName: "search",
			                methodArgumments: ["东方明珠", callback],
			                data: result,
			                map: map,
			                panel: "panel"
			            });
			        }
			    }*/

			   //$scope.showSearchPlace = false;
			   element.on('click',function(e){return;
			   		/*if(e.target != null&&e.target.hasAttribute('id'))
			   		{
			   			if(e.target.attributes['id'].nodeValue == 'inputQuery')
			   			{
			   				
			   			}
		   			alert(e.target.attributes['id'].nodeValue);
			   		}
			   		else if(e.target.hasAttribute('class')&&e.target.attributes['class'].nodeValue=='search-place-img')
			   		{
			   			alert(1);
			   		}
			   		else if(e.target.hasAttribute('class')&&e.target.attributes['class'].nodeValue=='text-center search-place-text')
			   		{
			   			alert(2);
			   		}*/
			   });

				scope.showSearchPlace = false;
				//setTimeout(function() {$scope.showSearchPlace = !$scope.showSearchPlace;$scope.$apply();}, 3000);
				//setInterval(function() {
					//$scope.showSearchPlace = !$scope.showSearchPlace;$scope.$apply();
				//},3000);
				var clear = function()
				{
					if(placeSearch !== null){
						placeSearch.clear();
					}
					if(driving !=null){
						driving.clear();
					}
					if(transfer!=null)
					{
						transfer.clear();
					}
					if(riding!=null)
					{
						riding.clear();
					}
					if(walking!=null)
					{
						walking.clear();
					}
				};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////问询 //////////////////////////////////////////
				scope.$on('askAbout',function(dvt,place){
					map.setZoomAndCenter(16, scope.curlocation);
					clear();
					placeSearch = new AMap.PlaceSearch({ //构造地查询类
			            pageSize: 5,
			            //type: '汽车服务|汽车销售|汽车维修|摩托车服务|餐饮服务|购物服务|生活服务|体育休闲服务|医疗保健服务|住宿服务|风景名胜|商务住宅|政府机构及社会团体|科教文化服务|交通设施服务|金融保险服务|公司企业|道路附属设施|地名地址信息|公共设施',
			            pageIndex: 1,
			            city: "杭州市", //城市
			            map: map,
			            panel: "panel"
			        });
			        
			       scope.searchplaces = null;
			       scope.selIndex = -1;
			       placeSearch.search(place,function(status, result){
					    //TODO : 按照自己需求处理查询结果
					    scope.searchplaces = result.poiList;
					    //alert(result);
					    gdQuery('askAbout',result.poiList.pois);
					});
				});
//////////////////////设置景区搜索//////////////////////////////////////////////////////
				scope.$on('setCurPosition',function(evt,lng,lat){
					clear();
					//设置缩放级别中心位置
				    map.setZoomAndCenter(16, [lng, lat]);
				    var marker = new AMap.Marker({
	            			icon: "images/curlocation.svg",
	            			position: [lng, lat],
	        		});
	        		marker.setMap(map);
	        		scope.curlocation = [lng, lat];
	        		//实例化Geocoder
				    var geocoder = new AMap.Geocoder({
				        city: "0571"//城市，默认：“全国”
				    });
				    scope.posName = '';
				    //TODO: 使用geocoder 对象完成相关功能
				    geocoder.getAddress(scope.curlocation, function(status, result) {
					    if (status === 'complete' && result.info === 'OK') {
					       //获得了有效的地址信息:
					       scope.posName = result.regeocode.formattedAddress;
					    }else{
					       //获取地址失败
					       scope.posName = 'get address fail';
					    }
					    evt.targetScope.posName = scope.posName;
					    if(typeof(window.GdQuery) != 'undefined' && typeof(window.GdQuery.Call) != 'undefined')
						{
							//alert("2");
							window.GdQuery.Call('address',scope.posName);
						}
					});  
	        		/*var marker1 = new AMap.Marker({
	            			icon: "",
	            			position: [115.205467, 39.907761]
	        		});
	        		marker1.setMap(map);
	        		marker.setPosition([116.205467, 39.907761]);*/
				});
				var placeSearch = null;
				/*通过事件，与interface对应*/
				scope.$on('showSearchPlace',function(evt,isShow){
					isShow?$('#queryplace').css('display','block'):$('#queryplace').css('display','none');
				});
//////////////////////设置景区搜索//////////////////////////////////////////////////////
				scope.$on('getPostionName',function(evt){
					evt.targetScope.posName = scope.posName;
				});
//////////////////////////////////////////搜索风景 //////////////////////////////////////////
				scope.$on('searchViewsFirst',function(dvt,lng,lat,rad){
					clear();
					map.setZoomAndCenter(16, [lng, lat]);
					placeSearch = new AMap.PlaceSearch({ //构造地查询类
			            pageSize: 5,
			            type: '风景名胜|国家级景点',
			            pageIndex: 1,
			            city: "0571", //城市
			            map: map,
			            panel: "panel"
			        });
			        
			        var cpoint = [lng,lat]; //中心点坐标
			        scope.searchplaces = null;
			        scope.selIndex = -1;
			        placeSearch.searchNearBy('', cpoint, rad, function(status, result) {
			        	if (status === 'complete' && result.info === 'OK') {
			        		scope.searchplaces=result.poiList;
			        		scope.$emit('searchViewsFirstReply',result.poiList);
					    	gdQuery('searchViewsFirst',result.poiList.pois);
			        	}
			        });
				});

				scope.$on('searchSecond',function(evt,selIndex){
					//placeSearch.clear();
					//placeSearch = null;
					if(scope.searchplaces == null || selIndex  == -1 || scope.searchplaces.pois.length-1<selIndex)
					{
						return;//需选择点位
					}
					var view = scope.searchplaces.pois[selIndex];
					//map.setZoomAndCenter(16, [view.location.lng, view.location.lat]);
					if(scope.selIndex!=null&&scope.selIndex>=0 &&scope.selIndex<=4)
					{
						$('#panel .amap_lib_placeSearch_ul li').eq(scope.selIndex).removeClass('selected');
						$.each($('#container .amap-marker-content'),function(key,val){
							if($(val).children('.amap_lib_placeSearch_poi').text() == (scope.selIndex + 1)+'')
							{
								$(val).removeClass('selected');
							}
						});
						//$('#container .amap-markers .amap-marker .amap-marker-content').eq(scope.selIndex).removeClass('selected');
					}
					if(selIndex != null &&selIndex >=0 &&selIndex <=4)
					{
						if(scope.searchplaces != null &&scope.searchplaces.pois!=null &&scope.searchplaces.pois.length>scope.selIndex)
						{
							map.panTo([scope.searchplaces.pois[selIndex].location.getLng(),scope.searchplaces.pois[selIndex].location.getLat()]);
							//map.setZoomAndCenter(16,[scope.searchplaces.pois[selIndex].location.getLng(),scope.searchplaces.pois[selIndex].location.getLat()],function(){
							//	alert(1);
							//});
						}
						$('#panel .amap_lib_placeSearch_ul li').eq(selIndex).addClass('selected');
						$.each($('#container .amap-marker-content'),function(key,val){
							if($(val).children('.amap_lib_placeSearch_poi').text() == (selIndex + 1)+'')
							{
								$(val).addClass('selected');
							}
						});
						//$('#container .amap-markers .amap-marker .amap-marker-content').eq(selIndex).addClass('selected');
						$('#panel .amap_lib_placeSearch_ul li').eq(selIndex).click();
					}
					//$('#panel .amap_lib_placeSearch_ul li').eq(selIndex).addClass('selected');
					//$('#container .amap-markers .amap-marker .amap-marker-content').eq(selIndex).addClass('selected');				
					scope.selIndex = selIndex;
				});

//////////////////////////////////////////搜索美食 //////////////////////////////////////////
				scope.$on('searchFoodsFirst',function(dvt,lng,lat,rad){
					clear();
					map.setZoomAndCenter(16, [lng, lat]);
					placeSearch = new AMap.PlaceSearch({ //构造地查询类
			            pageSize: 5,
			            type: '餐饮服务',
			            pageIndex: 1,
			            city: "0571", //城市
			            map: map,
			            panel: "panel"
			        });
			        
			        var cpoint = [lng,lat]; //中心点坐标
			        scope.searchplaces = null;
			        scope.selIndex = -1;
			        placeSearch.searchNearBy('', cpoint, rad, function(status, result) {
			        	if (status === 'complete' && result.info === 'OK') {
			        		scope.searchplaces=result.poiList;
			        		scope.$emit('searchViewsFirstReply',result.poiList);
					    	gdQuery('searchFoodsFirst',result.poiList.pois);
			        	}
			        });
				});
//////////////////////////////////////////搜索酒店 //////////////////////////////////////////
				scope.$on('searchHotelsFirst',function(dvt,lng,lat,rad){
					clear();
					map.setZoomAndCenter(16, [lng, lat]);
					placeSearch = new AMap.PlaceSearch({ //构造地查询类
			            pageSize: 5,
			            type: '住宿服务',
			            pageIndex: 1,
			            city: "0571", //城市
			            map: map,
			            panel: "panel"
			        });
			        
			        var cpoint = [lng,lat]; //中心点坐标
			        scope.searchplaces = null;
			        scope.selIndex = -1;
			        placeSearch.searchNearBy('', cpoint, rad, function(status, result) {
			        	if (status === 'complete' && result.info === 'OK') {
			        		scope.searchplaces=result.poiList;
			        		scope.$emit('searchViewsFirstReply',result.poiList);
					    	gdQuery('searchHotelsFirst',result.poiList.pois);
			        	}
			        });
				});
//////////////////////////////////////////搜索厕所 //////////////////////////////////////////
				scope.$on('searchToiletsFirst',function(dvt,lng,lat,rad){
					clear();
					map.setZoomAndCenter(16, [lng, lat]);
					placeSearch = new AMap.PlaceSearch({ //构造地查询类
			            pageSize: 5,
			            type: '厕所',
			            pageIndex: 1,
			            city: "0571", //城市
			            map: map,
			            panel: "panel"
			        });
			        
			        var cpoint = [lng,lat]; //中心点坐标
			        scope.searchplaces = null;
			        scope.selIndex = -1;
			        placeSearch.searchNearBy('', cpoint, rad, function(status, result) {
			        	if (status === 'complete' && result.info === 'OK') {
			        		scope.searchplaces=result.poiList;
			        		scope.$emit('searchViewsFirstReply',result.poiList);
					    	gdQuery('searchToiletsFirst',result.poiList.pois);
			        	}
			        });
				});
				var weather = null;
//////////////////////////////////////////搜索天气 //////////////////////////////////////////
				//////实时天气
				scope.$on('getWeatherLive',function(dvt,area){
					clear(); 
					if(weather == null)
					{
						weather = new AMap.Weather();
					}
        			//查询实时天气信息, 查询的城市到行政级别的城市，如朝阳区、杭州市
			        weather.getLive(area, function(err, data) {
			            if (!err) {
			                var str = "";
			                str += ('##实时天气');
			                str += ('##城市/区：' + data.city);
			                str += ('##天气：' + data.weather);
			                str += ('##温度：' + data.temperature + '℃');
			                str += ('##风向：' + data.windDirection);
			                str += ('#风力：' + data.windPower + ' 级');
			                str += ('##空气湿度：' + data.humidity);
			                str += ('##发布时间：' + data.reportTime);
			                $("#weather").text(data.weather);
			                $("#temperature").text(data.temperature+'℃');
			                gdWeather('getWeatherLive',str);
			                /*var marker = new AMap.Marker({map: map, position: map.getCenter()});
			                var infoWin = new AMap.InfoWindow({
			                    content: str.join(''),
			                    offset: new AMap.Pixel(0, -20)
			                });
			                infoWin.open(map, marker.getPosition());
			                marker.on('mouseover', function() {
			                    infoWin.open(map, marker.getPosition());
			                });*/
			            }
			        });
				});
				//////预测天气
				scope.$on('getWeatherForecast',function(dvt,area){
					clear(); 
					if(weather == null)
					{
						weather = new AMap.Weather();
					}
        			
	                //未来4天天气预报
			        weather.getForecast(area, function(err, data) {
			            if (err) {return;}
			            //var str = [];
			            var str ="";
			            for (var i = 0,dayWeather; i < data.forecasts.length; i++) {
			                dayWeather = data.forecasts[i];
			                if(i ==0)//表示今天
			                {
			                	var now = new Date(),hour = now.getHours();
			                	if(now >= 6 && now <=19)//白天
			                	{
			                		$("#weather").text(dayWeather.dayWeather);
			                	}
			                	else{//黑夜
			                		$("#weather").text(dayWeather.nightWeather);
			                	}
			                	$("#temperature").text(dayWeather.nightTemp + '/' + dayWeather.dayTemp+'℃');
			                }
			                str += ('date:' + dayWeather.date+'##dayweather:'+dayWeather.dayWeather+ '##nightWeather:' + dayWeather.nightWeather  
			                 +'##dayWindDir:' +dayWeather.dayWindDir + '##dayWindPower:' + dayWeather.dayWindPower 
			                 +'##nightWindDir:' + dayWeather.nightWindDir + '##nightWindPower:' + dayWeather.nightWindPower
			                 +'##Temp:'+ dayWeather.nightTemp + '~' + dayWeather.dayTemp + '℃');
			                if(i <data.forecasts.length -1 )
			                {
			                	str += "||";
			                }
			            }
			            gdWeather('getWeatherForecast',str);
			        });
				});
				function gdWeather(type,str)
				{
					if(typeof(window.GdQuery) != 'undefined' && typeof(window.GdQuery.Call) != 'undefined')
					{
						window.GdQuery.Call(type,str);
					}
				}
				function gdDrivingQuery(type,arr)
				{
					if(typeof(window.GdQuery) != 'undefined' && typeof(window.GdQuery.Call) != 'undefined')
					{
						var str='';
						if(arr == null || arr.length == 0)
						{
							str='';
						}
						else {
							for(var i = 0; i < arr.length;i++)
							{
								if(arr[i].steps != null && arr[i].steps.length > 0)
								{
									for(var j = 0; j < arr[i].steps.length; j ++)
									{
										str += arr[i].steps[j].instruction;
										if(i <arr.length-1 || (i == arr.length-1 &&j < arr[i].steps.length-1))
										{
											str+= '||';
										}
									}
								}
							}
						}
						//alert("2");
						window.GdQuery.Call(type,str);
					}
				}
				function gdTransferQuery(type,arr)
				{
					if(typeof(window.GdQuery) != 'undefined' && typeof(window.GdQuery.Call) != 'undefined')
					{
						var str='';
						if(arr == null || arr.length == 0)
						{
							str='';
						}
						else {
							for(var i = 0; i < arr.length;i++)
							{
								if(arr[i].segments != null && arr[i].segments.length > 0)
								{
									for(var j = 0; j < arr[i].segments.length; j ++)
									{
										str += arr[i].segments[j].instruction;
										if(i <arr.length-1 || (i == arr.length-1 &&j < arr[i].segments.length-1))
										{
											str+= '||';
										}
									}
								}
							}
						}
						//alert("2");
						window.GdQuery.Call(type,str);
					}
				}
				function gdRidingQuery(type,arr)
				{
					if(typeof(window.GdQuery) != 'undefined' && typeof(window.GdQuery.Call) != 'undefined')
					{
						var str='';
						if(arr == null || arr.length == 0)
						{
							str='';
						}
						else {
							for(var i = 0; i < arr.length;i++)
							{
								if(arr[i].rides != null && arr[i].rides.length > 0)
								{
									for(var j = 0; j < arr[i].rides.length; j ++)
									{
										str += arr[i].rides[j].instruction;
										if(i <arr.length-1 || (i == arr.length-1 &&j < arr[i].rides.length-1))
										{
											str+= '||';
										}
									}
								}
							}
						}
						//alert("2");
						window.GdQuery.Call(type,str);
					}
				}
				var driving = null, transfer =null, riding=null,walking= null;
				scope.$on('gotoByVehicleFirst',function(dvt,type){
					//map.setZoomAndCenter(16,[116.397428, 39.90923]);
					clear();
					var point =  scope.searchplaces.pois[scope.selIndex].location;
					
					if(type==0)
					{
						 //构造路线导航类
					    driving = new AMap.Driving({
					        map: map,
					        panel: "panel"
					    }); 
					    // 根据起终点名称规划驾车导航路线
					    //driving.search([
					    //    {keyword: '北京市地震局(公交站)',city:'杭州'},
					    //    {keyword: '亦庄文化园(地铁站)',city:'杭州'}
					    //]);
					   
					    driving.search(new AMap.LngLat(scope.curlocation[0],scope.curlocation[1]), new AMap.LngLat(point.lng,point.lat),function(status, result) {
						     //TODO 解析返回结果，自己生成操作界面和地图展示界面
						     if(status == 'complete' && result.info == 'OK')
						     {
						     	gdDrivingQuery('driving',result.routes);
						     }
						});
					}
					else if(type == 1)
					{
						var transOptions = {
					        map: map,
					        city: '杭州市',
					        panel: 'panel',
					        policy: AMap.TransferPolicy.LEAST_TIME
					    };
					    //构造公交换乘类
					    transfer = new AMap.Transfer(transOptions);
					    //根据起、终点坐标查询公交换乘路线
					    transfer.search(new AMap.LngLat(scope.curlocation[0],scope.curlocation[1]), new AMap.LngLat(point.lng,point.lat),function(status, result) {
						     //TODO 解析返回结果，自己生成操作界面和地图展示界面
						     if(status == 'complete' && result.info == 'OK')
						     {
						     	gdTransferQuery('transfer',result.plans);
						     }
						});
					}
					else if(type==2)
					{
						   //骑行导航
						   riding = new AMap.Riding({
						        map: map,
						        panel: "panel"
						   }); 
						   //根据起终点坐标规划骑行路线
						   riding.search([scope.curlocation[0],scope.curlocation[1]],[point.lng,point.lat],function(status, result) {
						     //TODO 解析返回结果，自己生成操作界面和地图展示界面
						     if(status == 'complete' && result.info == 'OK')
						     {
						     	gdRidingQuery('riding',result.routes);
						     }
							});
					}
					else if(type==3)
					{
						  //步行导航
					    walking = new AMap.Walking({
					        map: map,
					        panel: "panel"
					    }); 
					    //根据起终点坐标规划步行路线
					    walking.search([scope.curlocation[0],scope.curlocation[1]],[point.lng,point.lat],function(status, result) {
						     //TODO 解析返回结果，自己生成操作界面和地图展示界面
						     if(status == 'complete' && (result.info == 'OK'||result.info == 'ok'))
						     {
						     	gdDrivingQuery('walking',result.routes);
						     }
						});
					}
				});

				/*方法一、设置变量然后监听变量 对应interface.js
			    scope.$watch('showSearchPlace',function(n,o){
			    	n=='true'?$('#queryplace').css('display','block'):$('#queryplace').css('display','none');
			    },true);
			    */
			   /*scope.$watch(attrs.ngModel,function(){
			   		//alert(attrs.ngModel);
			   },true);*/

			}
		};
	}]);