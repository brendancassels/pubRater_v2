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

