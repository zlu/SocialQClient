(function() {
  //Populate app database
  var db = Titanium.Database.open("data.db");
  db.execute("CREATE TABLE IF NOT EXISTS history(guid TEXT, channel TEXT, body TEXT, name TEXT, twitterName TEXT, profileUrl TEXT, created_at TEXT);");
  
  function saveToHistory(guid,channel,body,name,twitterName,profileUrl) {
    db.execute("INSERT INTO history(guid,channel,body,name,twitterName,profileUrl,created_at) VALUES (?,?,?,?,?,?,?);",
      guid,channel,body,name,twitterName,profileUrl,
      new Date().toString('yyyy-MM-dd HH:mm')
    );
  }
  
  function searchHistory(term) {
    return db.execute("SELECT * FROM history WHERE body LIKE '%"+term+"%' OR name LIKE '%"+term+"%' OR twitterName LIKE '%"+term+"%' ORDER BY rowid DESC;");
  }

  //used for populating dummy data
  function randomString() {
  	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  	var string_length = 8;
  	var randomstring = '';
  	for (var i=0; i<string_length; i++) {
  		var rnum = Math.floor(Math.random() * chars.length);
  		randomstring += chars.substring(rnum,rnum+1);
  	}
  	return randomstring;
  }
  
  function randomNumber() {
    return Math.floor(Math.random()*300);
  }
  
  //an in-memory representation of the queue
  window.the_queue = [{
    guid:"1337", 
    time:"Tue May 04 22:08:25 +0000 2010", 
    phone_number:"+16512080532", 
    channel:"twitter", 
    queue_weight:randomNumber(), 
    social_influence_rank:randomNumber(), 
    twitter_profile: {
      name:"Kevin Whinnery", 
      profile_image_url:"http://a3.twimg.com/profile_images/597379283/head-clip_normal.jpg", 
      status: {
        text:"ZOMG - best episode of #glee EVAR!!!!! #soawesome #freakingout", 
        id:13021098774
      }, 
      friends_count:335,
      followers_count:12322,
      location:"Anytown, USA",
      url:"http://www.appcelerator.com",
      statuses_count:randomNumber(), 
      screen_name:"kevinwhinnery"
    }
  },
  {
    guid:"l7", 
    time:"Tue May 04 22:08:25 +0000 2010", 
    phone_number:"+15554446666", 
    channel:"phone", 
    queue_weight:randomNumber(), 
    social_influence_rank:randomNumber(), 
    twitter_profile: {
      name:"Maisy Flores", 
      profile_image_url:"http://a3.twimg.com/profile_images/853914019/Danica_Avatar_normal.jpg", 
      status: {
        text:"RT @katalysthq: Check out the newest tune from @katbadar -let's hear it for one of our favorite artists! http://ow.ly/1GpbC", 
        id:13021098774
      }, 
      friends_count:729778, 
      followers_count:12322,
      location:"Anytown, USA",
      url:"http://www.appcelerator.com",
      statuses_count:randomNumber(), 
      screen_name:"mflores"
    }
  },
  {
    guid:"asdljnasd", 
    time:"Tue May 04 22:08:25 +0000 2010", 
    phone_number:"+15554446666", 
    channel:"twitter", 
    queue_weight:randomNumber(), 
    social_influence_rank:999, 
    twitter_profile: {
      name:"Ashton Kutcher", 
      profile_image_url:"http://a1.twimg.com/profile_images/638714290/profile_pic_normal.jpg", 
      status: {
        text:"RT @katalysthq: Check out the newest tune from @katbadar -let's hear it for one of our favorite artists! http://ow.ly/1GpbC", 
        id:13021098774
      }, 
      friends_count:729778, 
      followers_count:12322,
      location:"Anytown, USA",
      url:"http://www.appcelerator.com",
      statuses_count:randomNumber(), 
      screen_name:"aplusk"
    }
  },
  {
    guid:"aonsjdaosdn", 
    time:"Tue May 04 22:08:25 +0000 2010", 
    phone_number:"+15554446666", 
    channel:"twitter", 
    queue_weight:randomNumber(), 
    social_influence_rank:randomNumber(), 
    twitter_profile: {
      name:"Dixie Adams", 
      profile_image_url:"http://a3.twimg.com/profile_images/115528167/3396557521_52901463ae_normal.jpg", 
      status: {
        text:"I love it when V8 gets faster. http://bit.ly/apjmuT The Web gets faster. webOS gets faster :)", 
        id:13021098774
      }, 
      friends_count:729778, 
      followers_count:12322,
      location:"Anytown, USA",
      url:"http://www.appcelerator.com",
      statuses_count:randomNumber(), 
      screen_name:"dadams"
    }
  },
  {
    guid:"asjdnfidfns", 
    time:"Tue May 04 22:08:25 +0000 2010", 
    phone_number:"+15554446666", 
    channel:"twitter", 
    queue_weight:randomNumber(), 
    social_influence_rank:randomNumber(), 
    twitter_profile: {
      name:"David Johansson", 
      profile_image_url:"http://a3.twimg.com/profile_images/600844867/IMG_0617_normal.jpg", 
      status: {
        text:"I love it when V8 gets faster. http://bit.ly/apjmuT The Web gets faster. webOS gets faster :)", 
        id:13021098774
      }, 
      friends_count:729778, 
      followers_count:12322,
      location:"Anytown, USA",
      url:"http://www.appcelerator.com",
      statuses_count:randomNumber(), 
      screen_name:"boogieshoes"
    }
  },
  {
    guid:"ajsndiasndasidniasdnsd", 
    time:"Tue May 04 22:08:25 +0000 2010", 
    phone_number:"+15554446666", 
    channel:"twitter", 
    queue_weight:randomNumber(), 
    social_influence_rank:randomNumber(), 
    twitter_profile: {
      name:"Dion Almaer", 
      profile_image_url:"http://a1.twimg.com/profile_images/292949152/dionprofile_normal.png", 
      status: {
        text:"I love it when V8 gets faster. http://bit.ly/apjmuT The Web gets faster. webOS gets faster :)", 
        id:130210
      }, 
      friends_count:729778, 
      followers_count:12322,
      location:"Anytown, USA",
      url:"http://www.appcelerator.com",
      statuses_count:randomNumber(), 
      screen_name:"dalmaer"
    }
  },
  {
    guid:"loaisbciadosboudbfsifwoeu", 
    time:"Tue May 04 22:08:25 +0000 2010", 
    phone_number:"+13332229999", 
    channel:"phone", 
    queue_weight:randomNumber(), 
    social_influence_rank:randomNumber(), 
    twitter_profile: {
      name:"Calvin Hobbes", 
      profile_image_url:"http://a1.twimg.com/profile_images/227846424/1382184741_e16416a45b_b_normal.jpg", 
      status: {
        text:"RT @newyorkpost Report: An antitrust app - Apple might be under possible DOJ/FTC investigation soon. http://bit.ly/9main8 #apple #iphone", 
        id:13021098774
      }, 
      friends_count:729778, 
      followers_count:12322,
      location:"Anytown, USA",
      url:"http://www.appcelerator.com",
      statuses_count:randomNumber(), 
      screen_name:"chobbes"
    }
  },
  {
    guid:"ajsirwdyibvcehyiru", 
    time:"Tue May 04 22:08:25 +0000 2010", 
    phone_number:"+13332229999", 
    channel:"phone", 
    queue_weight:randomNumber(), 
    social_influence_rank:randomNumber(), 
    twitter_profile: {
      name:"Jeff Haynie", 
      profile_image_url:"http://a3.twimg.com/profile_images/374572107/twitterProfilePhoto_normal.jpg", 
      status: {
        text:"RT @newyorkpost Report: An antitrust app - Apple might be under possible DOJ/FTC investigation soon. http://bit.ly/9main8 #apple #iphone", 
        id:13021098774
      }, 
      friends_count:729778, 
      followers_count:12322,
      location:"Anytown, USA",
      url:"http://www.appcelerator.com",
      statuses_count:randomNumber(), 
      screen_name:"jhaynie"
    }
  },
  {
    guid:"sajndonsaasnonosaonkkkkk", 
    time:"Tue May 04 21:08:25 +0000 2010", 
    phone_number:"+13332229999", 
    channel:"phone", 
    queue_weight:randomNumber(), 
    social_influence_rank:randomNumber(), 
    twitter_profile: {
      name:"Oscar Rosario", 
      profile_image_url:"http://a3.twimg.com/profile_images/845865623/jonathanstark-scarf_normal.jpg", 
      status: {
        text:"RT @newyorkpost Report: An antitrust app - Apple might be under possible DOJ/FTC investigation soon. http://bit.ly/9main8 #apple #iphone", 
        id:13021098774
      }, 
      friends_count:729778, 
      followers_count:12322,
      location:"Anytown, USA",
      url:"http://www.appcelerator.com",
      statuses_count:randomNumber(), 
      screen_name:"oroso"
    }
  }];
  
  
  //Service implementations and mocks
  function getQueueLive(fn) {
    var url = "http://socialq.heroku.com/messages";
    try {
      var agentProfile = Titanium.JSON.parse(Titanium.App.Properties.getString("agentProfile"));
      if (agentProfile && agentProfile.queueEndpoint)
      url = agentProfile.queueEndpoint;
    } catch(e) {
      console.log("queueEndpoint not defined, using default");
    }
    
    $.getJSON(url, fn);
  }
  
  function getQueueSim(fn) {
    setTimeout(function() {
      the_queue[Math.floor(Math.random()*(the_queue.length-1))].queue_weight+=100;
      fn.call(this,[{
        agents:[],
        users:the_queue
      }]);
    },800);
  }
  
  function removeFromQueueSim(guid) {
    for (var i =0; i < the_queue.length; i++) {
      if (the_queue[i].guid == guid) {
        the_queue.splice(i,1);
      }
    }
  }
  
  function agentReady(options) {
    $.ajax({
      url:"http://socialq.heroku.com/agent_ready",
      type:"POST",
      contentType:"application/json",
      data:Titanium.JSON.stringify(options),
      dataType:"json",
      success: function(data) {
        socialq.removeFromQueue(options.customer_guid);
        console.log(data);
      }
    });
  }
  
  //Configure final data API usage
  $.extend(socialq, {
    data: {
      getQueue: function(fn) {
        if (Titanium.App.Properties.hasProperty("test") && Titanium.App.Properties.getBool("test")) {
          getQueueSim(fn);
        }
        else {
          getQueueLive(fn);
        }
      },
      agentReady: function(options) {
        if (Titanium.App.Properties.hasProperty("test") && Titanium.App.Properties.getBool("test")) {
          removeFromQueueSim(options.customer_guid);
        }
        else {
          agentReady(options);
        }
      },
      saveToHistory:saveToHistory,
      searchHistory:searchHistory
    }
  });
})();