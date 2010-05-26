(function() {
  var users = [];
  
  //Put queue API in place
  $.extend(socialq, {
    queue: {
      viewDetails: function(guid) {
        var user = Titanium.JSON.parse(Titanium.App.Properties.getString(guid));
        
        //populate detail view parts
        $("#rank .detail-view .detail-name").html(user.twitter_profile.name);
        $("#rank .detail-view .avatar-bubble").css("background","url("+user.twitter_profile.profile_image_url+") no-repeat");
        $("#rank .detail-view .following span").html(user.twitter_profile.friends_count);
        $("#rank .detail-view .followers span").html(user.twitter_profile.followers_count);
        $("#rank .detail-view .location span").html(user.twitter_profile.location);
        $("#rank .detail-view .web span").html(user.twitter_profile.url);
        
        $("#rank .detail-view .twitter").html("@"+user.twitter_profile.screen_name).unbind('click').click(function() {
           socialq.tweet(user.guid);
        });
        $("#rank .detail-view .phone").html(user.phone_number).unbind('click').click(function() {
           socialq.phone(user.guid);
        });;
        
        //set up views and breadcrumb
        $("#rank-secondary ul").append("<li><span>"+user.twitter_profile.name.substring(0,8)+"..."+"<span></li>")
        $("#rank-queue-view").hide();
        $("#rank .detail-view").show();
        
        //Set up history feed
        socialq.queue.historyForId(user.guid);
        
      },
      removeFromQueue: function(guid) {
        $.each(users,function(idx,val) {
          if (val.guid === guid) {
            users.splice(idx,1);
          }
        });
        $("li[data-id="+options.customer_guid+"]").remove();
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
        
        $("#rank .history-view").html(html);
      },
      fetchQueue: function() {
        socialq.ind();
        socialq.data.getQueue(function(data) {
          if (data.length > 0) {
            users = data[data.length-1].users;
            $("#queue-cache").html($("#rank-queue").html());
            
            if ($("#queue-weight-sort").hasClass("selected-sort")) {
              socialq.queue.sortByQueueWeight();
            }
            else if($("#social-sort").hasClass("selected-sort")) {
              socialq.queue.sortBySocial();
            }
            else {
              socialq.queue.sortByChrono();
            }
          }
          socialq.hideInd();
        });
      },
      sortByQueueWeight: function() {
        $("#rank-queue").removeClass("social-big").addClass("weight-big");
        users.sort(function(a,b) {
          return b.queue_weight - a.queue_weight;
        });
        socialq.queue.printToQueue();
      },
      sortByChrono: function() {
        $("#rank-queue").removeClass("social-big").addClass("weight-big");
        users.sort(function(a,b) {
          date_a = Date.parse(a.time);
          date_b = Date.parse(b.time);
          //TODO - revisit the sort logic for chrono
          return date_a.compareTo(date_b);
        });
        socialq.queue.printToQueue();
      },
      sortBySocial: function() {
        $("#rank-queue").removeClass("weight-big").addClass("social-big");
        users.sort(function(a,b) {
          return b.social_influence_rank - a.social_influence_rank;
        });
        socialq.queue.printToQueue();
      },
      printToQueue: function() {
        //first, sort the data by the current selected sort
        var html = "";
        for (var i = 0; i < users.length; i++) {
          var user = users[i];
          
          //Save user details - TODO: Possibly switch this to use a database table
          Titanium.App.Properties.setString(user.guid,Titanium.JSON.stringify(user));
          
          //Build actions HTML
          var actionsHtml = '<div class="actions">';
          var twitterIndicator, phoneIndicator;
          if(user.channel == "twitter") {
            twitterIndicator = "source-twitter-active";
            phoneIndicator = "source-phone-inactive";
          }
          else {
            twitterIndicator = "source-twitter-inactive";
            phoneIndicator = "source-phone-active";
          }
          actionsHtml+='<table style="height:100%"><tr><td><img src="/assets/images/'+twitterIndicator+'.png"></img></td><td>'+
            '<div class="action" onclick="socialq.tweet(\''+user.guid+'\')">@'+user.twitter_profile.screen_name+'</div></td></tr><tr><td>'+
            '<img src="/assets/images/'+phoneIndicator+'.png"></img></td><td>'+
            '<div class="action" onclick="socialq.phone(\''+user.guid+'\')">'+user.phone_number+'</div></td></tr></table>'+
          '</div>';
          
          //Determine if we have a queue weight delta when new data is fetched
          var blueClass = '';
          var arrowClass = '';
          
          var old = $("#queue-cache li.queue-box[data-id="+user.guid+"]");
          if (old.length > 0) {
            var oldWeight = parseInt(old.find(".queue-weight").text());
            if (oldWeight != parseInt(user.queue_weight)) {
              blueClass = 'blue-bg';
              if (oldWeight > user.queue_weight) {
                arrowClass = 'dn-arrow';
              }
              else {
                arrowClass = 'up-arrow';
              }
            }
          }
          
          //main row HTML
          html += '<li class="queue-box '+blueClass+'" data-id="'+user.guid+'" data-timestring="'+user.time+'" data-weight="'+user.queue_weight+'">'+
          '<table style="width:100%;">'+
            '<tr>'+
              '<td valign="top" style="width:47px;">'+
                '<div class="avatar clickable" onclick="socialq.queue.viewDetails(\''+user.guid+'\')">'+
                  '<div class="avatar-bubble" style="background:url('+user.twitter_profile.profile_image_url+')"></div>'+
                '</div>'+
              '</td>'+
              '<td valign="top">'+
                '<div class="name">'+
                  '<span class="'+arrowClass+' clickable" onclick="socialq.queue.viewDetails(\''+user.guid+'\')">'+user.twitter_profile.name+'</span><br/><span class="timeago">'+$.timeago(Date.parse(user.time))+'</span>'+
                  '<div class="weights">'+
                    '<span class="queue-weight">'+parseInt(user.queue_weight)+'</span><span> / </span><span class="social-weight green">'+user.social_influence_rank+'</span>'+
                  '</div>'+
                '</div>'+
              '</td>'+
              '<td>'+actionsHtml+'</td>'+
            '</tr>'+
          '</table></li>';
        }
        if ($("#rank-queue").children().length == 0) {
          $("#rank-queue").html(html);
        }
        else {
          console.log("shuffle the deck...");
          $("#destination").html(html);
          $('#rank-queue').quicksand($('#destination li'), {
            duration:800,
            easing: 'easeInOutQuad'
          });
        }
      }
    }
  });

  //Initialize queue view
  $(function() {
    $("#queue-weight-sort").click(function() {
      if (!$(this).hasClass("selected-sort")) {
        $(this).addClass("selected-sort").siblings().removeClass("selected-sort");
        socialq.queue.sortByQueueWeight();
      }
    });

    $("#chrono-sort").click(function() {
      if (!$(this).hasClass("selected-sort")) {
        $(this).addClass("selected-sort").siblings().removeClass("selected-sort");
        socialq.queue.sortByChrono();
      }
    });
    
    $("#social-sort").click(function() {
      if (!$(this).hasClass("selected-sort")) {
        $(this).addClass("selected-sort").siblings().removeClass("selected-sort");
        socialq.queue.sortBySocial();
      }
    });

    $("#refresh-button").click(function() {
      socialq.queue.fetchQueue();
    });
    
    //Set up breadcrumbs
    $("#rank-secondary ul.bc li:first-child").click(function() {
      $("#rank .detail-view").hide();
      $("#rank-queue-view").show();
      $(this).siblings().remove();
    });
    
    //run initial fetch and set up auto-fetches
    socialq.queue.fetchQueue();
    setInterval(function() {
      socialq.queue.fetchQueue();
    },3000);
  });
})();