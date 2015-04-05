angular.module('starter.services', [])

.factory('Venues', function() {
  // Might use a resource here that returns a JSON array
  // Some fake testing data
  var venues = [{
    id: 0,
    name: 'Royal Exchange Hotel',
    address: '10 High St, Toowong, QLD, 4066',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlin',
    lastText: 'Did you get the ice cream?',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];
  return {
    all: function() {
      return venues;
    },
    remove: function(venue) {
      venues.splice(venues.indexOf(venue), 1);
    },
    get: function(venueId) {
      for (var i = 0; i < venues.length; i++) {
        if (venues[i].id === parseInt(venueId)) {
          return venues[i];
        }
      }
      return null;
    }
  };
});