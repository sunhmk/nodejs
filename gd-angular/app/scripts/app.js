'use strict';

/**
 * @ngdoc overview
 * @name gdAngularApp
 * @description
 * # gdAngularApp
 *
 * Main module of the application.
 */
angular
  .module('gdAngularApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ui.load',
    'oc.lazyLoad',
    'ui.bootstrap',
    'app.core'
  ])
  .config(['$stateProvider', '$urlRouterProvider','$httpProvider',
    function ($stateProvider,$urlRouterProvider,$httpProvider) {
            //$httpProvider.defaults.withCredentials = true;
            // 状态配置
            $stateProvider
                .state('main', {
                    url: '／main',
                    controller:function($scope)
                    {
                     /* $scope.gddata={
                        changed:'1',
                        showSearchPlace:false,
                      };
                      $scope.showSearchPlace=true;
                      setTimeout(function() {
                        $scope.gddata ={
                          changed:'22',
                          showSearchPlace:true
                        }; 
                        $scope.showSearchPlace=false;
                        $scope.$apply();
                      }, 10000);*/
                    },
                    templateUrl: 'views/main.html',
                });// 默认地址
            $urlRouterProvider.otherwise('/main');
  }]).run(['$state',function($state){
    /*$rootScope.$on('$routeChangeStart',function(/*evt,next,currnt){$state,$rootScope,$location,$window
      var forceSSL = function () {
          if ($location.protocol() !== 'https') {
              $window.location.href = $location.absUrl().replace('http', 'https');
          }
      };
      forceSSL();
    });*/
    /*navigator.geolocation.getCurrentPosition(onSuccess,onError);
     //成功时
           function onSuccess(position){
               //返回用户位置
               //经度
               var longitude =position.coords.longitude;
               //纬度
               var latitude = position.coords.latitude;

               //使用百度地图API
               //创建地图实例  
               var map =new BMap.Map("container");

               //创建一个坐标
               var point =new BMap.Point(longitude,latitude);
               //地图初始化，设置中心点坐标和地图级别  
               map.centerAndZoom(point,15);



           }
  

           //失败时
           function onError(error){
               switch(error.code){
                   case 1:
                   alert("位置服务被拒绝");
                   break;

                   case 2:
                   alert("暂时获取不到位置信息");
                   break;

                   case 3:
                   alert("获取信息超时");
                   break;

                   case 4:
                    alert("未知错误");
                   break;
               }

           }*/
    $state.go('main');
  }]);

