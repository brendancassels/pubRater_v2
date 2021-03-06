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
            var content = "<div><strong>" + name + "</strong><br>" + description + "<br><a href='#/tab/list/place/" + place.id + "' class='button button-small button-positive' style='width: 100%; margin-top: 10px;'>View</a></div>";
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

.controller('PlaceCtrl', function($scope, $stateParams, $ionicLoading, $ionicAnalytics) {
  
  $ionicAnalytics.track('View', {
    item_id: 123,
    item_name: "View Venue"
  });

  loadPlace();
  $scope.mapCreated = function(map) {
    $scope.map = map;
  };
  $scope.loading = $ionicLoading.show({
    content: 'Loading...',
    showBackdrop: false
  });
  function loadPlace() {
    Parse.Cloud.run('getPlace', { objectId: $stateParams.id }, {
      success: function(place) {  
        $scope.place = place;
        var Places = Parse.Object.extend("Venue");
        var query = new Parse.Query(Places);
        query.equalTo("objectId", $stateParams.id);
        query.first({
          success: function(place) {
            $scope.place = place; 
            $scope.map.setCenter(new google.maps.LatLng(place.attributes.Venue_Location.latitude, place.attributes.Venue_Location.longitude));
            $scope.map.setZoom(16);
            var marker = new google.maps.Marker({
              map: $scope.map,
              position: new google.maps.LatLng(place.attributes.Venue_Location.latitude, place.attributes.Venue_Location.longitude)
            });
          }
        })
      }, 
      error: function(error) {
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

.controller('VenueDetailCtrl', function($scope, $stateParams, $state, Places) {
  $scope.place = Places.get($stateParams.placeId);
})

.controller('LoginRegisterCtrl', function($scope, $ionicPopup, $state, $ionicHistory) {
  $scope.registerLogin = true;
  $scope.selectLoginRegister = function(index) {
    if (index === 0) {
      //alert("x");
      $scope.registerLogin = true;
      // $scope.login = false;
    } else {
      //$scope.register = true;
      $scope.registerLogin = false;
    }
    $scope.$apply();
  }
  $scope.register = function(registerFirstName, registerLastName, registerEmail, registerPassword) {
    if (registerFirstName && registerFirstName && registerEmail && registerPassword) {
      // create a new user object (note the the username and email are the same)
      var user = new Parse.User();
      user.set("username", registerEmail);
      user.set("password", registerPassword);
      user.set("email", registerEmail);
      // set the other fields
      user.set("firstName", registerFirstName);
      user.set("lastName", registerLastName);
      user.signUp(null, {
        success: function(user) {
          var alertPopup = $ionicPopup.alert({
             title: 'Success',
             template: 'Thank you for registering'
           });
          $ionicHistory.nextViewOptions({
            disableBack: true
          });
          $state.go('tab.tab-map');
        },
        error: function(user, error) {
          var alertPopup = $ionicPopup.alert({
             title: 'Error',
             template: 'Unable to successfully register'
          });
        }
      });
    } else {
      var alertPopup = $ionicPopup.alert({
         title: 'Missing Fields',
         template: 'Please enter all the required fields'
      });
    }
  }
  $scope.login = function(loginUsername, loginPassword) {
    Parse.User.logIn(loginUsername, loginPassword, {
      success: function(user) {
        var alertPopup = $ionicPopup.alert({
           title: 'Welcome Back',
           template: 'It\'s great to see you again!'
        });
        $ionicHistory.nextViewOptions({
          disableBack: true
        });
        $state.go('tab.tab-map');
      },
      error: function(user, error) {
        var alertPopup = $ionicPopup.alert({
           title: 'Error',
           template: 'Unable to log you in'
        });
      }
    });
  }
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
})

.controller('RatingCtrl', function($scope, $state, $ionicHistory, $stateParams, $ionicPopup, $ionicLoading, $ionicAnalytics) {
  $ionicAnalytics.track('Rate', {
    item_id: 123,
    item_name: "Rate Venue"
  });
  $scope.addRating = function(ratingBusy, ratingService, ratingPrice, ratingQueue, ratingOverall, sports, liveMusic, dj, tab) {
    var Places = Parse.Object.extend("Venue");
    var query = new Parse.Query(Places);
    query.equalTo("objectId", $stateParams.id);
    query.first({
      success: function(place) {
        if (!ratingBusy) {
          ratingBusy = 50;
        };
        if (!ratingService) {
          ratingService = 50;
        };
        if (!ratingPrice) {
          ratingPrice = 50;
        };
        if (!ratingQueue) {
          ratingQueue = 0;
        };
        if (!ratingOverall) {
          ratingOverall = 50;
        };
        if (!sports) {
          sports = false;
        };
        if (!liveMusic) {
          liveMusic = false;
        };
        if (!dj) {
          dj = false;
        };
        if (!tab) {
          tab = false;
        };
        var Rating = Parse.Object.extend("Rating");
        var rating = new Rating();
        rating.set("Busy", parseInt(ratingBusy));
        rating.set("Service", parseInt(ratingService));
        rating.set("Price", parseInt(ratingPrice));
        rating.set("Queue", parseInt(ratingQueue));
        rating.set("Overall_Rating", parseInt(ratingOverall));
        rating.set("Sports", sports);
        rating.set("Live_Music", liveMusic);
        rating.set("DJ", dj);
        rating.set("TAB", tab);
        rating.set("Venue_ID", place);
        rating.set("createdBy", Parse.User.current());
        rating.save(null, {
          success: function(rating) {
            var alertPopup = $ionicPopup.alert({
              title: 'Success',
              template: 'Thank you for rating'
             });
            $ionicHistory.nextViewOptions({
              disableBack: true
            });
            $state.go('tab.tab-map');
          },
          error: function(post, error) {
            var alertPopup = $ionicPopup.alert({
              title: 'Error',
              template: 'Unable to successfully rate'
            });
          }
        });
      }
    });
  }; 
})

.controller('FilterCtrl', function($scope, $ionicLoading) {
  // $scope.loading = $ionicLoading.show({
  //   content: 'Loading...',
  //   showBackdrop: false
  // });
})

.controller('ProfileCtrl', function($scope) {
  $scope.genderbutton = function(index) {
    var gender;
    if(index == 0){
      gender = "male";
    } else {
      gender = "female";
    };
    var user = Parse.User.current();
    user.set("Gender", gender);
    user.save(null, {
      success: function() {
      },
      error: function(error) {
      }
    });
  };
  $scope.relationshipbutton = function(index) {
    var relationship;
    if(index ==  0){
      relationship = "single";
    } else {
      relationship = "relationship";
    };
    var user = Parse.User.current();
    user.set("RelationStat", relationship);
    user.save(null, {
      success: function() {
      },
      error: function(error) {
      }
    });
  };
  $scope.addDetails = function(occupation, prefbev, prefvenue, dob){
    var user = Parse.User.current();
    user.set("DOB", dob);
    user.set("Profession", occupation);
    user.set("PreferBev", prefbev);
    user.set("PreferVenue", prefvenue);
    user.save(null, {
      success: function() {
      },
      error: function(error) {
      }
    });
  }
});



// var app = angular.module('Gender', ['ti-segmented-control']);
// app.controller('AppCtrl', function($scope){
//   $scope.buttonClicked = function(index){
//     $scope.selectedIndex = index;
//     $scope.$apply();
//   }
// });