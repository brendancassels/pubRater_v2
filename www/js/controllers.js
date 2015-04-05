Parse.initialize("AJg4F48BJVT3ldknZtpKUi95OVFlqbhCSKeH051l", "wEBxFycPeb6kBTUE4jPFidx8FlZefkmHjKWqqYxJ");

angular.module('starter.controllers', [])

.controller('MapCtrl', function($scope, $ionicLoading, $filter, $compile) {
  $scope.mapCreated = function(map) {
    $scope.map = map;
    map.setCenter(new google.maps.LatLng(-27.465918, 153.025939));
    map.setZoom(15);
    var Places = Parse.Object.extend("Venue");
    var query = new Parse.Query(Places);
    query.find({
      success: function(places) {
        var openInfoWindow;
        angular.forEach(places , function(place, key){
          var map = $scope.map;
          // set the marker
          var marker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(place.attributes.Venue_Location.latitude, place.attributes.Venue_Location.longitude)
          });
          // set the info window
          var infowindow = new google.maps.InfoWindow();
          // establish the event listener for the popups
          google.maps.event.addListener(marker, 'click', function() {
            // close any prior open InfoWindows
            if (openInfoWindow != undefined) { 
              openInfoWindow.close();
            } 
            var name = place.attributes.Venue_Name;
            var description = $filter('hrefToJS')(place.attributes.Venue_Website);
            var content = "<div><strong>" + name + "</strong><br>" + description + "<br><a href='#/tab/list/tab-venues/" + place.id + "' class='button button-small button-stable' style='width: 100%; margin-top: 10px;'>View</a></div>";
            var compiled = $compile(content)($scope);
            var infowindow = new google.maps.InfoWindow({
              content: compiled[0]
            });
            openInfoWindow = infowindow;
            infowindow.setContent(compiled[0]);
            infowindow.open(map, this);
          });
        });
      },
      error: function(error) {
        return alert("Unable to load the places...");
      }
    })
    .then(function(places) {
      // hide the loading wheel
      $ionicLoading.hide();
    });
  }
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
    }, 
    function (error) {
      alert('Unable to get location: ' + error.message);
    });
  };
})

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

.controller('PlaceCtrl', function($scope, $stateParams, $ionicLoading) {
  loadPlace();
  $scope.mapCreated = function(map) {
    $scope.map = map;
  };
  $scope.loading = $ionicLoading.show({
    content: 'Loading...',
    showBackdrop: false
  });
  function loadPlace() {
    var Places = Parse.Object.extend("Venue");
    var query = new Parse.Query(Places);
    query.equalTo("objectId", $stateParams.id);
    query.first({
      success: function(place) {
        $scope.place = place;
        $scope.map.set(new google.maps.LatLng(place.attributes.Venue_Location.latitude, place.attributes.Venue_Location.longitude));
        $scope.map.setZoom(14);
        var marker = new google.maps.Marker({
          map: $scope.map,
          position: new google.maps.LatLng(place.attributes.Venue_Location.latitude, place.attributes.Venue_Location.longitude)
        });
      }
    })
    .then(function(places) {
      $ionicLoading.hide();
      $scope.$broadcast('scroll.refreshComplete');
    });
  }
  $scope.refresh = function() {
    loadPlace();
  }
})

.controller('VenueDetailCtrl', function($scope, $stateParams, Places) {
  $scope.place = Places.get($stateParams.placeId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('ListCtrl', function($scope, $ionicLoading) {
  $scope.loading = $ionicLoading.show({
    content: 'Loading...',
    showBackdrop: false
  });
  // load pins
  var Places = Parse.Object.extend("Venue");
  var query = new Parse.Query(Places);
  query.find({
    success: function(places) {
      $scope.places = places;
    }
  })
  .then(function(places) {
    $ionicLoading.hide();
  });
});
// var app = angular.module('Gender', ['ti-segmented-control']);
// app.controller('AppCtrl', function($scope){
//   $scope.buttonClicked = function(index){
//     $scope.selectedIndex = index;
//     $scope.$apply();
//   }
// });