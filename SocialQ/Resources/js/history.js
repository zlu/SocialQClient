$.extend(socialq, {
  history: {
    viewDetails: function(guid) {
      var user = Titanium.JSON.parse(Titanium.App.Properties.getString(guid));
      
      //populate detail view parts
      $("#history .detail-view .detail-name").html(user.twitter_profile.name);
      $("#history .detail-view .avatar-bubble").css("background","url("+user.twitter_profile.profile_image_url+") no-repeat");
      $("#history .detail-view .following span").html(user.twitter_profile.friends_count);
      $("#history .detail-view .followers span").html(user.twitter_profile.followers_count);
      $("#history .detail-view .location span").html(user.twitter_profile.location);
      $("#history .detail-view .web span").html(user.twitter_profile.url);
      $("#history .detail-view .twitter").html("@"+user.twitter_profile.screen_name).unbind('click').click(function() {
         socialq.tweet(user.guid);
      });
      $("#history .detail-view .phone").html(user.phone_number).unbind('click').click(function() {
         socialq.phone(user.guid);
      });;
      
      //set up views and breadcrumb
      $("#history-secondary ul").append("<li><span>"+user.twitter_profile.name.substring(0,8)+"..."+"<span></li>")
      $("#history .queue-list").hide();
      $("#history .detail-view").show();
      
      //Set up history feed
      socialq.queue.historyForId(user.guid);
      
    },
    historyForId: function(guid) {
      var user = Titanium.JSON.parse(Titanium.App.Properties.getString(guid));
      
      //Set up history feed
      var rows = socialq.data.searchHistory(user.twitter_profile.screen_name);
      var html = "";
      while (rows.isValidRow()) {

        var created_at = "no date available";
        if (rows.fieldByName("created_at")) {
          var date = Date.parse(rows.fieldByName("created_at"));
          if (date) {
            created_at = $.timeago(date);
          }
        }
        html+= '<div class="history-bubble">'+
					'<img src="/assets/images/source-'+rows.fieldByName("channel")+'-active.png">'+
					'<h5>'+created_at+'</h5>'+
					'<p>'+rows.fieldByName("body")+'</p>'+
				'</div>';     
    		rows.next();
      }
      rows.close();
      
      $("#history .history-view").html(html);
    },
    search: function() {
      var rows = socialq.data.searchHistory($("#history-search").val());
      var html = "";
      while (rows.isValidRow()) {

        var created_at = "no date available";
        if (rows.fieldByName("created_at")) {
          var date = Date.parse(rows.fieldByName("created_at"));
          if (date) {
            created_at = $.timeago(date);
          }
        }
        html += '<li class="queue-box">'+
        '<table style="width:100%;">'+
          '<tr>'+
            '<td valign="top" style="width:47px;">'+
              '<div class="avatar clickable" onclick="socialq.history.viewDetails(\''+rows.fieldByName("guid")+'\')">'+
                '<div class="avatar-bubble" style="background:url('+rows.fieldByName("profileUrl")+')"></div>'+
              '</div>'+
            '</td>'+
            '<td valign="top" style="width:100%">'+
              '<div class="name clickable" onclick="socialq.history.viewDetails(\''+rows.fieldByName("guid")+'\')">'+
                '<span>'+rows.fieldByName("name")+'</span><br/><span class="timeago">'+created_at+'</span>'+
                '<div class="twitter-status">'+rows.fieldByName("body")+'</div>'+
              '</div>'+
            '</td>'+
            '<td><img src="/assets/images/source-'+rows.fieldByName("channel")+'-active.png"></td>'+
          '</tr>'+
        '</table></li>';      
    		rows.next();
      }
      rows.close();

      $("#history ul").html(html);
    }
  }
})

$(function() {
  $("#history-search").keyup(function(e) {
    if (e.keyCode == 13) {
      socialq.history.search();
    }
  });
  
  $("#clear-history").click(function() {
    $("#history-search").val("").focus();
  });
  
   //Set up breadcrumbs
    $("#history-secondary ul.bc li:first-child").click(function() {
      $("#history .detail-view").hide();
      $("#history .queue-list").show();
      $(this).siblings().remove();
    });
  
  socialq.history.search();

});