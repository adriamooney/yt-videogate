YouTubeUrl = new Meteor.Collection("youtubeurl");

Meteor.startup(function () {
  // code to run on server at startup
});


Meteor.methods({
  enterYTURL : function(youtubeId, msg, incOptions, reqOptions ){
    console.log('entering youtube url');
    var preferenceId = YouTubeUrl.insert({
          youtubeId : youtubeId,
          date: new Date(),
          msg: msg,
          incOptions: incOptions,
          reqOptions: reqOptions,
          stopAt: 0,
          leads: [ 

          ]
      });
    return preferenceId;
  },
  videoGateTime: function(stopAt, id) {
    YouTubeUrl.update(
      {_id: id},
      {$set: {'stopAt': stopAt}}
    );
  },
  submitForm: function(fields, id) {
  	YouTubeUrl.update(
      {_id: id},
      {$push: {'leads': fields } }
    );
  },
  editForm: function(id, msg, stopAt, incOptions, reqOptions ) {
  	YouTubeUrl.update(
      {_id: id},
      {$set: {'msg': msg, 'stopAt': stopAt, 'incOptions': incOptions, 'reqOptions': reqOptions}}
    );
  }
});

Meteor.publish("youtubeurl", function(id) {
    return YouTubeUrl.find(); 
});
