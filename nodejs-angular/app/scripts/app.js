'use strict';
window.APP = { version : 'v=20170918' };
/**
 * @ngdoc overview
 * @name nodejsAngularApp
 * @description
 * # nodejsAngularApp
 *
 * Main module of the application.
 */
angular.module('app.com',[]);
angular.module('app',['ngAnimate',
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
    'app.com'])
.directive('asidecontent',['$window',function($window){
  return {
    restrict:'C',
    scope:{},
    link:function($scope, element, attrs){
      var winowHeight = $window.innerHeight; //获取窗口高度
      var headerHeight = 50;
      var footerHeight = 50;
      element.css('overflow-y','scroll');
      element.css('height',(winowHeight - headerHeight - footerHeight-10) + 'px');
    }
  }
}]);
/*angular
  .module('app', [
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
    'app.com',
    'core.menu.services'
  ])
  /*.config(function($resourceProvider)
  {
    $resourceProvider.defaults.useXDomain = true;
  })
  /*.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });*/
