YouTubeUrl = new Meteor.Collection("youtubeurl");

Meteor.subscribe("youtubeurl");

/* ROUTES */
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

Router.route('/widget/:_id/preview', function () {
  this.render('preview_widget', {
    data: function () {
      return YouTubeUrl.findOne({_id: this.params._id});
    }
  });

}); 

Router.route('/export', function () {
  this.render('export', {
    data: function () {
      return YouTubeUrl.find();
    }
  });

}); 

Router.route('/widget/:_id/export', function () {
  this.render('exportOne', {
    data: function () {
      return YouTubeUrl.findOne({_id: this.params._id});
    }
  });

}); 

Router.route('/widget/:_id/edit', function () {
  this.render('edit_widget', {
    data: function () {
      return YouTubeUrl.findOne({_id: this.params._id});
    }
  });

}); 

/* RENDERED */
Template.widget.rendered = function () {
  setTimeout(function(){
    
    UI.insert(UI.render(Template.ytapi), $('#ytapi-wrap').get(0) );  

    $('#vg-widget-form').parsley({trigger: 'change'}); 

    $('#vg-widget-form').parsley().subscribe('parsley:field:validated', function(fieldInstance){
      if ($('#vg-widget-form').parsley().isValid())
        console.log('valid');
      else
        console.log('invalid');
    });


  }, 1000);
  
};

Template.edit_widget.rendered = function () {

  //TODO: how to reuse functions from Template.youtubeURLForm.events. This is dupliate code
  
  setTimeout(function(){var id = $('#youtubeURL').val();newVideo(id)}, 1000);
  function newVideo(id) {



          var tag = document.createElement('script');
          tag.src = "https://www.youtube.com/player_api";
          var firstScriptTag = document.getElementsByTagName('script')[0];
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

          // Replace the 'ytplayer' element with an <iframe> and
          // YouTube player after the API code downloads.

          window.onYouTubePlayerAPIReady = function() {
            player = new YT.Player('ytplayer', {
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
          var stopAt = parseInt( $('#stopTime').val()) ;
          console.log(stopAt);

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
          $(".videogate-time-save").show();
          $(".slider").val(stopAt);


        } 

};
/* EVENTS */

Template.header.events({
  'click .navbar-brand': function(e) {
    e.preventDefault();
    Router.go('/');
    setTimeout(function(){window.location.reload()}, 1000);
  }
});

Template.youtubeurls.events({
    'click .save': function(event) {
      var val = $('.slider').val();

      //reuse this function. where to put it?
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
      if ( $('#widget-code').is(':hidden') ) {
        $('#get-code').show();
      }
      else {

      }
      $('#preview-widget, #new-widget').show();
    },
    'click #get-code': function(event) {
      $('#widget-code').show();
      $('#get-code').hide();
    },
    'click #preview-widget': function(event) {
      Router.go('/widget/'+this._id+'/preview');
      setTimeout(function(){window.location.reload()}, 1000);
    },
    'click #new-widget': function(e) {
      Router.go('/');
      setTimeout(function(){window.location.reload()}, 1000);
    }

});

Template.youtubeURLForm.events({
    'change .incField': function(e) {
      var a = e.currentTarget.nextElementSibling;
      //var req = e.currentTarget.parentElement.nextElementSibling.nextElementSibling;
      var field = e.currentTarget;
      $(a).toggleClass('hidden');
      console.log(e.currentTarget);

    },
    'click .submit' : function(event){
        event.preventDefault();
        var val = document.getElementById("youtubeURL").value;
        var spl = val.split('=');
        var youtubeURL = spl[1];
        var msg = document.getElementById("vidgatemsg").value;


        var incFname = document.getElementById('fname').checked;
        var incLname = document.getElementById('lname').checked;
        var incEmail = document.getElementById('email').checked;
        var incCompany= document.getElementById('company').checked;
        var incPhone= document.getElementById('phone').checked;
        var incAddress= document.getElementById('address').checked;
        var incCity= document.getElementById('city').checked;
        var incState= document.getElementById('state').checked;
        var incZip= document.getElementById('zip').checked;


        var incOpts = {
          incFname: incFname,
          incLname: incLname,
          incEmail: incEmail,
          incCompany: incCompany,
          incPhone: incPhone,
          incAddress: incAddress,
          incCity: incCity,
          incState: incState,
          incZip: incZip
        };

        var incFnameReq = document.getElementById('fnameReq').checked;
        var incLnameReq = document.getElementById('lnameReq').checked;
        var incEmailReq = document.getElementById('emailReq').checked;
        var incCompanyReq= document.getElementById('companyReq').checked;
        var incPhoneReq= document.getElementById('phoneReq').checked;
        var incAddressReq= document.getElementById('addressReq').checked;
        var incCityReq= document.getElementById('cityReq').checked;
        var incStateReq= document.getElementById('stateReq').checked;
        var incZipReq= document.getElementById('zipReq').checked;

        var reqOpts = {
          incFnameReq: incFnameReq,
          incLnameReq: incLnameReq,
          incEmailReq: incEmailReq,
          incCompanyReq: incCompanyReq,
          incPhoneReq: incPhoneReq,
          incAddressReq: incAddressReq,
          incCityReq: incCityReq,
          incStateReq: incStateReq,
          incZipReq: incZipReq
        };



        function ytVidId(url) {
            var p = /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?(?=.*v=((\w|-){11}))(?:\S+)?$/;
            return (url.match(p)) ? RegExp.$1 : false;
        }

        if (ytVidId(val) !== false) {

            newVideo(640, 360, youtubeURL);

            var player = undefined;

            document.getElementById("youtubeURL").value = "";

            $('#configure-form').fadeOut('slow');

            Meteor.call("enterYTURL",youtubeURL, msg, incOpts, reqOpts, function(error , preferenceId){
              console.log('added youtube with Id .. '+preferenceId+' and value of '+youtubeURL);
            });

        }
        else {
            alert('please enter a valid YouTube URL')
        }


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
          $(".videogate-time-save").fadeIn();


        } 
 
    }
});

Template.preview_widget.events({
  'click #new-widget': function(e) {
    e.preventDefault();
    Router.go('/');
    setTimeout(function(){window.location.reload()}, 1000);
  },
  'click #edit-widget': function(e) {
    e.preventDefault();
    var id = $('#vidID').val();
    Router.go('/widget/'+id+'/edit');
    setTimeout(function(){window.location.reload()}, 1000);
  }

});

Template.widget.events({
  'submit #vg-widget-form': function (e) {
    e.preventDefault();
    //only set cookie if form is filled out correctly

        //var email = $('#ytvg_email').val();
        var fields = $('#vg-widget-form').serializeObject();
        //console.log(fields);
        fields.date = new Date();

        console.log(fields);


        
        if ( $('#vg-widget-form').parsley().isValid() ) {
        
            //TODO: turn all field values into an object (a above)
           Meteor.call("submitForm", fields, this._id, function() {
            Cookie.set('yt-vidgate', 'yt-vidgate-unlocked');
            $('#vg-widget-form').remove();
          }); 


        }

    setTimeout(function(){
      player.playVideo(); //firefox bug is here.

    }, 3000);
  }

});

Template.edit_widget.events({
    'change .incField': function(e) {
      var a = e.currentTarget.nextElementSibling;
      var field = e.currentTarget;
      if ( $(field).is(':checked') ) {
        $(a).removeClass('hidden');
      }
      else {
         $(a).addClass('hidden');
      }
      //$(a).toggleClass('hidden');
      console.log(e.currentTarget);
    },
    'click #submitform': function (e) {
    e.preventDefault();
    var id = document.getElementById("vidID").value;
    var msg = document.getElementById("vidgatemsg").value;
    //var stopAt = document.getElementById("stopAt").value;
    
    function hmsToSecondsOnly(str) {
        var p = str.split(':'),
            s = 0, m = 1;

        while (p.length > 0) {
            s += m * parseInt(p.pop(), 10);
            m *= 60;
        }

        return s;
    }
    var val = $('.slider').val();
    var stopAt = hmsToSecondsOnly(val);


    var incFname = document.getElementById('fname').checked;
    var incLname = document.getElementById('lname').checked;
    var incEmail = document.getElementById('email').checked;
    var incCompany= document.getElementById('company').checked;
    var incPhone= document.getElementById('phone').checked;
    var incAddress= document.getElementById('address').checked;
    var incCity= document.getElementById('city').checked;
    var incState= document.getElementById('state').checked;
    var incZip= document.getElementById('zip').checked;

    var incOpts = {
          incFname: incFname,
          incLname: incLname,
          incEmail: incEmail,
          incCompany: incCompany,
          incPhone: incPhone,
          incAddress: incAddress,
          incCity: incCity,
          incState: incState,
          incZip: incZip
        };

    var incFnameReq = document.getElementById('fnameReq').checked;
    var incLnameReq = document.getElementById('lnameReq').checked;
    var incEmailReq = document.getElementById('emailReq').checked;
    var incCompanyReq= document.getElementById('companyReq').checked;
    var incPhoneReq= document.getElementById('phoneReq').checked;
    var incAddressReq= document.getElementById('addressReq').checked;
    var incCityReq= document.getElementById('cityReq').checked;
    var incStateReq= document.getElementById('stateReq').checked;
    var incZipReq= document.getElementById('zipReq').checked;

    var reqOpts = {
      incFnameReq: incFnameReq,
      incLnameReq: incLnameReq,
      incEmailReq: incEmailReq,
      incCompanyReq: incCompanyReq,
      incPhoneReq: incPhoneReq,
      incAddressReq: incAddressReq,
      incCityReq: incCityReq,
      incStateReq: incStateReq,
      incZipReq: incZipReq
    };


    Meteor.call("editForm", id, msg, stopAt, incOpts, reqOpts, function(error , preferenceId){
          console.log('edited form');
          Router.go('/widget/'+id+'/preview');
          
          setTimeout(function(){window.location.reload()}, 1000);
    });

  }
});

/* HELPERS */

Template.widget.helpers ({
    fnameReq: function() {
        return this.reqOptions.incFnameReq;
    },
    lnameReq: function() {
        return this.reqOptions.incLnameReq;
    },
    emailReq: function() {
        return this.reqOptions.incEmailReq;
    },
    companyReq: function() {
        return this.reqOptions.incCompanyReq;
    },
    addressReq: function() {
        return this.reqOptions.incAddressReq;
    },
    cityReq: function() {
        return this.reqOptions.incCityReq;
    },
    stateReq: function() {
        return this.reqOptions.incStateReq;
    },
    zipReq: function() {
        return this.reqOptions.incZipReq;
    },
    phoneReq: function() {
        return this.reqOptions.incPhoneReq;
    }
});

Template.edit_widget.helpers({
    isChecked: function(context) {
    return this.context;
    //why doesn't this work?
    },
    isCheckedFname: function() {
    return this.incFname;
    },
    isCheckdedLname: function() {
    return this.incLname;

    },
    isCheckdedEmail: function() {
    return this.incEmail;
    },
    isCheckedCompany: function() {
    return this.incCompany;
    },
    isCheckedPhone: function() {
    return this.incPhone;
    },
    isCheckedAddress: function() {
    return this.incAddress;
    },
    isCheckedCity: function() {
    return this.incCity;
    },
    isCheckedState: function() {
    return this.incState;
    },
    isCheckedZip: function() {
    return this.incZip;
    }

});

/* FUNCTIONS */

Template.youtubeurls.items = function(){
    return YouTubeUrl.find( {},{sort: {date: -1}, limit: 1} );
};

$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
}









