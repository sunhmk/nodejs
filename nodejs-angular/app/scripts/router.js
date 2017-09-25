'use strict';
angular.module('app').config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
  //$urlRouterProvider.otherwise('/frame/views/dashboard');

    $urlRouterProvider.otherwise('/login');
    $stateProvider
      .state('login',{
        url:'/login',
        controller:'logincontroller',
        templateUrl:'views/login/login.html',
        resolve:{
           deps:['$ocLazyLoad',function($ocLazyLoad){
                 return $ocLazyLoad.load(['scripts/controllers/logincontroller.js']);
              }]
        }
      })
      .state('frame',{
        url:'/frame',
        title:'frame',
        abstract:true,
        template:"<div ui-view='frame'></div>"
      })
      .state('frame.views',{
        url:'/views',
        abstract:true,
        title:'views',
        views:{
          'frame':{
            scope:{},
            templateUrl:'views/tpl/app.tpl',
            controller:'mainctrl',
          }
        },
        resolve:{
              deps:['$ocLazyLoad',function($ocLazyLoad){
                 return $ocLazyLoad.load(['scripts/controllers/main.js','scripts/fn.js','styles/footer.css','styles/aside.css']);
              }]
        }
      })
     .state('frame.views.dashboard',{
        url:'/dashboard',
        views:{
          'content':{
            template:'<div>dashboard</div>'
          }
        }
      })
     .state('frame.views.charts',{
        url:'/charts',
        abstract:true,
        views:{
          'content':{
            template:"<div ui-view='charts'></div>",
          }
        }
     })
     .state('frame.views.charts.flot',{
      url:'/flot',
      views:{
          'charts':{
            templateUrl:'views/charts/flot.html',
          }
      }
     })
     .state('frame.views.charts.radial',{
      url:'/radial',
      views:{
        'charts':{
          templateUrl:'views/charts/radial.html',
        }
      }
     })
     .state('frame.views.charts.rickshaw',{
      url:'rickshaw',
      views:{
        'charts':{
          templateUrl:'views/charts/rickshaw.html',
        }
      }
     })
     .state('frame.views.forms',{
      url:'/forms',
      abstract:true,
      views:{
        'content':{
          template:"<div ui-view='forms'></div>",
        }
      }
     })
     .state('frame.views.forms.classic',{
      url:'/classic',
      views:{
        'forms':{
          templateUrl:'views/forms/classic.html',
        }
      }
     })
     .state('frame.views.forms.advanced',{
      url:'/advanced',
      views:{
        'forms':{
          templateUrl:'views/forms/advanced.html',
        }
      }
     })
     .state('frame.views.forms.dropzone',{
      url:'/dropzone',
      views:{
        'forms':{
          templateUrl:'views/forms/dropzone.html'
        }
      }
     })
     .state('frame.views.forms.editors',{
      url:'/editors',
      views:{
        'forms':{
          templateUrl:'views/forms/editors.html',
        }
      }
     })
     .state('frame.views.forms.material',{
      url:'/material',
      views:{
        'forms':{
          templateUrl:'views/forms/material.html',
        }
      }
     })
     .state('frame.views.forms.upload',{
      url:'/upload',
      views:{
        'forms':{
          templateUrl:'views/forms/upload.html'
        }
      }
     })
     .state('frame.views.forms.validation',{
      url:'/validation',
      views:{
        'forms':{
          templateUrl:'views/forms/validation.html'
        }
      }
     })
     .state('frame.views.forms.xeditable',{
      url:'/xeditable',
      views:{
        'forms':{
          templateUrl:'views/forms/xeditable.html'
        }
      }
     });
  }])
  /*.run(function ($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
        // Check if user is authenticated
        // And route requires authentication
       if (!toState.data.requiresAuthentication) {
            $state.go(toState.name, toParams);
       } else if (user && toState.data.requiresAuthentication) {
            $state.go(toState.name, toParams);
       } else {
             $state.go('frame.views.dashboard');    
            //$state.go('frame.views.charts.plot');
      // }
    });
});*/
 .run(['$state','$rootScope', function($state,$rootScope) {
        /*$rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
        // Check if user is authenticated
        // And route requires authentication
       if (!toState.data.requiresAuthentication) {
            $state.go(toState.name, toParams);
       } else if (user && toState.data.requiresAuthentication) {
            $state.go(toState.name, toParams);
       } else {
         //  $state.go('frame.views.dashboard');    
          $state.go('frame.views.charts.plot');
       }
    });*/
    //$state.transitionTo('frame.views.dashboard');
    //$state.go('frame.views.charts.plot');
  }]);
