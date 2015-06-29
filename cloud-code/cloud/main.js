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

Parse.Cloud.afterSave("Rating", function(request) {

  var rating = request.object.get("Overall_Rating");
  var place = request.object.get("Venue_ID");
  var query = new Parse.Query("Rating");
  console.log(rating);
  query.equalTo("Venue_ID", place);
  query.find({
    success: function(allRatings) {
      var sum = 0;
      console.log(allRatings.length);
      for (var i = 0; i < allRatings.length; ++i) {
        sum += allRatings[i].get("Overall_Rating");
      };
      var aveRating = (sum / allRatings.length);
      var numberRatings = allRatings.length;
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