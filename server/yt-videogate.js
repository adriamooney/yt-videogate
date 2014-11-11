YouTubeUrl = new Meteor.Collection("youtubeurl");

/*YouTubeUrl.attachSchema(new SimpleSchema({

	email: {
		type: String,
    	label: "Email",
    	optional: false
	}
})); */

  Meteor.startup(function () {
    // code to run on server at startup
  });


Meteor.methods({
  enterYTURL : function(youtubeId, msg, incFname, incLname, incEmail, incCompany, incPhone, incAddress, incCity, incState, incZip ){
    console.log('entering youtube url');
    var preferenceId = YouTubeUrl.insert({
          youtubeId : youtubeId,
          date: new Date(),
          msg: msg,
          incFname: incFname,
          incLname: incLname,
          incEmail: incEmail,
          incCompany: incCompany,
          incPhone: incPhone,
          incAddress: incAddress,
          incCity: incCity,
          incState: incState,
          incZip: incZip,
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
  },
  editForm: function(id, msg, stopAt, incFname, incLname, incEmail, incCompany, incPhone, incAddress, incCity, incState, incZip ) {
  	YouTubeUrl.update(
      {_id: id},
      {$set: {'msg': msg, 'stopAt': stopAt, 'incFname': incFname, 'incLname': incLname, 'incEmail': incEmail, 'incCompany': incCompany, 'incPhone': incCompany, 'incAddress': incAddress, 'incCity': incCity, 'incState': incState, 'incZip': incZip}}
    );
  }
});

Meteor.publish("youtubeurl", function(id) {
    return YouTubeUrl.find(); 
});
