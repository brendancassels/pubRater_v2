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

  // var rating = request.object.get("Rating");
  // var place = request.object.get("Venue");

  // var query = new Parse.Query("Rating");
  // query.equalTo("Venue", place);
  // query.find({
  //   success: function(rating) {

  //     // var sum = 0;
  //     // for (var i = 0; i < comments.length; ++i) {
  //     //   sum += comments[i].get("Rating");
  //     // }
  //     var aveRating = (sum / comments.length);
  //     var numberRatings = comments.length;

  //     var query = new Parse.Query("Places");
  //     query.equalTo("objectId", place.id);
  //     query.first({
  //       success: function(place) {

  //         place.set("AverageRating", aveRating);
  //         place.set("NumberRatings", numberRatings);
          
  //         place.save();
  //       },
  //       error: function(error) {
  //         console.log(error);
  //       }
  //     });

  //   },
  //   error: function() {
  //     response.error("failed");
  //   }
  // });
});