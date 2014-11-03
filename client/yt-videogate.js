YouTubeUrl = new Meteor.Collection("youtubeurl");

Meteor.subscribe("youtubeurl");

Router.route('/', function () {
  this.render('Home');
});

Router.route('/widget/:_id', function () {
  this.render('widget', {
    data: function () {
      return YouTubeUrl.findOne({_id: this.params._id});
    }
  });

}); 

//UI.insert(UI.render(Template.gateTime), $('#gate-time-configure').get(0) );

Template.widget.rendered = function () {
  
  setTimeout(function(){UI.insert(UI.render(Template.ytapi), $('#ytapi-wrap').get(0) );}, 1000);
};

Template.widget.events({
  'click #submitform': function (e) {
    e.preventDefault();
    Cookie.set('yt-vidgate', 'yt-vidgate-unlocked');
    console.log(this);
    var email = $('#ytvg_email').val();


    Meteor.call("submitForm",email, this._id);
    //TODO: add validation

    
    setTimeout(function(){player.playVideo()}, 1000);
  }

});
 
Template.youtubeurls.items = function(){
    return YouTubeUrl.find( {},{sort: {date: -1}, limit: 1} );
};

  // counter starts at 0
  Session.setDefault("counter", 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get("counter");
    }
    
  });


  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set("counter", Session.get("counter") + 1);
    }
  });

  Template.youtubeurls.events({
    'click .save': function(event) {
      var val = $('.slider').val();

      function hmsToSecondsOnly(str) {
        var p = str.split(':'),
            s = 0, m = 1;

        while (p.length > 0) {
            s += m * parseInt(p.pop(), 10);
            m *= 60;
        }

        return s;
      } 

      Meteor.call("videoGateTime",hmsToSecondsOnly(val), this._id);
      console.log(this._id);
    }
  });

  Template.youtubeURLForm.events({
    'click .submit' : function(event){
        event.preventDefault();
        var val = document.getElementById("youtubeURL").value;
        var spl = val.split('=');
        var youtubeURL = spl[1];
        Meteor.call("enterYTURL",youtubeURL,function(error , preferenceId){
          console.log('added youtube with Id .. '+preferenceId+' and value of '+youtubeURL);
        });
       /* Meteor.call("newVideo", 360, 640, youtubeURL, function(error) {
          console.log(youtubeURL);
        });  */
        newVideo(640, 360, youtubeURL);

        var player = undefined;

        document.getElementById("youtubeURL").value = "";



        function newVideo(width, height, id) {

          var tag = document.createElement('script');
          tag.src = "https://www.youtube.com/player_api";
          var firstScriptTag = document.getElementsByTagName('script')[0];
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

          // Replace the 'ytplayer' element with an <iframe> and
          // YouTube player after the API code downloads.

          window.onYouTubePlayerAPIReady = function() {
            player = new YT.Player('ytplayer', {
              height: height,
              width: width,
              videoId: id,
              events: {
                'onReady': onPlayerReady,
              },
              playerVars: {enablejsapi: true}
            });
          }
        }

        function onPlayerReady(event) {
          var len = player.getDuration();
          console.log(len);

          
          //UI.insert(UI.render(Template.gateTime), $('#gate-time-configure').get(0) );


          $('.slider').noUiSlider({
            start: [ 0 ],
            step: 1,
            range: {
              'min': 0,
              'max': len
            },
            format: {
              to: function ( time ) {
                var minutes = Math.floor(time / 60);
                if(minutes < 10)
                {
                  minutes = '0'+minutes;
                }
                var seconds = Math.round(time - minutes * 60);
                if(seconds < 10)
                {
                  seconds = '0'+seconds;
                }
                return minutes+':'+ seconds;
              },
              from: function ( time ) {
              return time;
              }
            }
          });
          $(".slider").Link('lower').to($("#field"));
          $("#videogate-time-save").show();


        } 
 
    }
});





