angular.module('starter', ['ionic', 'ionic.service.core', 'ionic.service.analytics', 'starter.filters', 'starter.controllers', 'starter.services', 'starter.directives', 'ti-segmented-control'])

.run(function($ionicPlatform, $ionicAnalytics) {
  $ionicPlatform.ready(function() {
    $ionicAnalytics.register();
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicAppProvider) {
  
  $ionicAppProvider.identify({
     app_id: 'de4a925e',
     api_key: '8f572defc4cd66f687d87628ec459da873c83f63e8be8010'
  });

  $stateProvider
  // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })
    // Each tab has its own nav history stack:
    .state('tab.tab-map', {
      url: '/map',
      views: {
        'tab-map': {
          templateUrl: 'templates/tab-map.html',
          controller: 'MapCtrl'
        }
      }
    })
    .state('tab.list', {
      url: '/list',
      views: {
        'tab-list': {
          templateUrl: 'templates/tab-list.html',
          controller: 'ListCtrl'
        }
      }
    })
    .state('tab.place', {
      url: '/list/place/:id',
      views: {
        'tab-list': {
          templateUrl: 'templates/tab-venues.html',
          controller: 'PlaceCtrl'
        }
      }
    })
    .state('tab.login-register', {
      url: "/login-register",
      views: {
        'tab-map': {
          templateUrl: 'templates/tab-login-register.html',
          controller: 'LoginRegisterCtrl'
        }
      }
    })    
    .state('tab.profile', {
      url: '/profile',
      views: {
        'tab-profile': {
          templateUrl: 'templates/tab-profile.html',
          controller: 'ProfileCtrl' 
        }
      }
    })
    .state('tab.rate', {
      url: '/rate/:id',
      views: {
        'tab-list': {
          templateUrl: 'templates/tab-rate.html',
          controller: 'RatingCtrl'
        }
      }
    })
    .state('tab.filter', {
      url: '/filter',
      views: {
        'tab-map': {
          templateUrl: 'templates/tab-filter.html',
          controller: 'FilterCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/map');
});
