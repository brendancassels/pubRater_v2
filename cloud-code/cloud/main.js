Parse.Cloud.define("getPlace", function(request, response) {
	var query = new Parse.Query("Venue");
  query.equalTo("objectId", request.params.objectId);
  query.first({
    success: function(place) {
			// increment the place's Views count
      place.increment("Views");
			place.save(null, {
        success: function(place) {
          response.success(place);
				  },
          error: function(place, error) {
      		  response.success(error);
				  }
      });
    },
    error: function(error) {
      console.log(error);
      response.error(error);
    }
  });
});

Parse.Cloud.afterSave("Ratings", function(request) {
  var rating = request.object.get("Rating");
  var place = request.object.get("Venue");
  var query = new Parse.Query("Ratings");
  query.equalTo("Venue", place);
  query.find({
    success: function(rating) {
      var sum = 0;
      for (var i = 0; i < rating.length; ++i) {
        sum += rating[i].get("Rating");
      };
      var aveRating = (sum / rating.length);
      var numberRatings = rating.length;
      var query = new Parse.Query("Venue");
      query.equalTo("objectId", place.id);
      query.first({
        success: function(place) {
          place.set("Overall_Rating_Average", parseInt(aveRating));
          place.set("Num_Ratings", parseInt(numberRatings));
          place.save();
        },
        error: function(error) {
          console.log(error);
        }
      });
    },
    error: function() {
      response.error("failed");
    }
  });
});