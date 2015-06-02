angular.module('starter', ['ionic', 'starter.filters', 'starter.controllers', 'starter.services', 'starter.directives', 'ti-segmented-control'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    //Parse.initialize("AJg4F48BJVT3ldknZtpKUi95OVFlqbhCSKeH051l", "wEBxFycPeb6kBTUE4jPFidx8FlZefkmHjKWqqYxJ");
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
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
        controller: 'RateCtrl'
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
