angular.module('starter.controllers', [])

.controller('MapCtrl', function($scope, $ionicLoading) {

  

  $scope.mapCreated = function(map) {

  


    $scope.map = map;
    map.setCenter(new google.maps.LatLng(-27.465918, 153.025939));
    map.setZoom(15);

    // $scope.loading = $ionicLoading.show({
    //   content: 'Loading the places...',
    //   showBackdrop: false
    // });

	var Places = Parse.Object.extend("Venue");
    var query = new Parse.Query(Places);

    query.find({
      success: function(places) {

        angular.forEach(places , function(place, key){

          var map = $scope.map;

          // set the marker
          var marker = new google.maps.Marker({
              map: map,
              position: new google.maps.LatLng(place.attributes.Venue_Location.latitude, place.attributes.Venue_Location.longitude)
          });

         });

       }
   	})

  };

  $scope.centerOnMe = function () {
    console.log("Centering");
    if (!$scope.map) {
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log('Got pos', pos);
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      $scope.loading.hide();
    }, function (error) {
      alert('Unable to get location: ' + error.message);
    });
  };

 //   $scope.centerOnBNE = function (map) {

 //    map.setCenter(new google.maps.LatLng(-27.4073899, 153.0028595));
 //    map.setZoom(2);

 //    $scope.loading = $ionicLoading.show({
 //      content: 'Loading the places...',
 //      showBackdrop: false
 //    });

	// var Places = Parse.Object.extend("Venue");
 //    var query = new Parse.Query(Places);

 //    query.find({
 //      success: function(places) {

 //        angular.forEach(places , function(place, key){

 //          var map = $scope.map;

 //          // set the marker
 //          var marker = new google.maps.Marker({
 //              map: map,
 //              position: new google.maps.LatLng(place.attributes.Venue_Location.latitude, place.attributes.Venue_Location.longitude)
 //          });

 //         });

 //       }
 //   })
 // }



})

.controller('VenuesCtrl', function($scope, Venues) {
  $scope.venues = Venues.all();
  $scope.remove = function(venue) {
    Venues.remove(venue);
  }
})

.controller('VenueDetailCtrl', function($scope, $stateParams, Venues) {
  $scope.venue = Venues.get($stateParams.venueId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

// .controller('MapCtrl', function($scope, $ionicLoading) {
  
// });

          var app = angular.module('Gender', ['ti-segmented-control']);
          app.controller('AppCtrl', function($scope){

              $scope.buttonClicked = function(index){
                $scope.selectedIndex = index;
                $scope.$apply();
              }
          });