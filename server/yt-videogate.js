YouTubeUrl = new Meteor.Collection("youtubeurl");

  Meteor.startup(function () {
    // code to run on server at startup
  });


Meteor.methods({
  enterYTURL : function(youtubeId){
    console.log('entering youtube url');
    var preferenceId = YouTubeUrl.insert({
          youtubeId : youtubeId,
          date: new Date(),
          stopAt: 0,
          lead: {
	          	email: '',
	          	date: new Date()
          	}
      });
    return preferenceId;
  },
  videoGateTime: function(stopAt, id) {
    YouTubeUrl.update(
      {_id: id},
      {$set: {'stopAt': stopAt}}
    );
  },
  submitForm: function(email, id) {
  	YouTubeUrl.update(
      {_id: id},
      {$push: {'lead': {'email': email, 'date': new Date()} } }
    );
  }
});

Meteor.publish("youtubeurl", function(id) {
    return YouTubeUrl.find(); 
});
