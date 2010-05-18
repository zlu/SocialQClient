# VERSION 2
%w(rubygems bunny json).each { |lib| require lib }
bunny = Bunny.new(:user    => 'rabbit0002',
                  :pass    => 'RbIEJfCuMc',
                  :host    => 'ec2-67-202-42-147.compute-1.amazonaws.com',
                  :port    => 15002,
                  :vhost   => '/rabbit0002',
                  :logging => true)
bunny.start

q = bunny.queue('socialq')
users_queue = []
5.times do 
  users_queue.push({
    "twitter_keywords"=>"squirrelrific", 
    "klout"=>{
      "twitter_screen_name"=>"BarackObama", 
      "twitter_id"=>"813286", 
      "score"=>{
        "kscore"=>100, 
        "kclass_description"=>"You have built a personal brand around your identity. There is a good chance that you work in social media or marketing but you might even be famous in real life. Being a persona is not just about having a ton of followers, to make it to the top right corner you need to engage with your audience. Make no mistake about it though, when you talk people listen.", 
        "slope"=>0.15, 
        "amplification_score"=>100, 
        "network_score"=>100, 
        "kscore_description"=>nil, 
        "true_reach"=>"0", 
        "kclass"=>"persona"
      }
    }, 
    "guid"=>(0...8).map{65.+(rand(25)).chr}.join, 
    "time"=>Time.now.to_s, 
    "phone_number"=>"+14155551212", 
    "channel"=>"twitter", 
    "queue_weight"=>rand(300), 
    "social_influence_rank"=>rand(9999), 
    "twitter_profile"=> {
      "profile_sidebar_fill_color"=>"e0ff92", 
      "profile_sidebar_border_color"=>"87bc44", 
      "profile_background_tile"=>false, 
      "name"=>"Barack Obama", 
      "created_at"=>"Mon Mar 05 22:08:25 +0000 2007", 
      "profile_image_url"=>"http://a3.twimg.com/profile_images/784227851/BarackObama_twitter_photo_normal.jpg", 
      "location"=>"Washington, DC", 
      "profile_link_color"=>"0000ff", 
      "url"=>"http://www.barackobama.com", 
      "favourites_count"=>0, 
      "contributors_enabled"=>false, 
      "id"=>813286, 
      "utc_offset"=>-18000, 
      "lang"=>"en", 
      "followers_count"=>3797052, 
      "protected"=>false,
      "profile_text_color"=>"000000", 
      "geo_enabled"=>false, 
      "description"=>"44th President of the United States", 
      "time_zone"=>"Eastern Time (US & Canada)", 
      "verified"=>true, 
      "notifications"=>false, 
      "profile_background_color"=>"3266CD", 
      "status"=>{
        "favorited"=>false, 
        "created_at"=>"Wed Apr 28 18:28:07 +0000 2010", 
        "truncated"=>false, 
        "text"=>"There’s still time to weigh in on which school will win the Race to the Top Commencement Challenge. http://j.mp/bjYoe7", 
        "id"=>13021098774, 
        "in_reply_to_user_id"=>nil, 
        "in_reply_to_screen_name"=>nil, 
        "source"=>"web", 
        "in_reply_to_status_id"=>nil
      }, 
      "profile_background_image_url"=>"http://a3.twimg.com/profile_background_images/57145311/twitterbamaNEW.jpg", 
      "friends_count"=>729778, 
      "statuses_count"=>677, 
      "following"=>false, 
      "screen_name"=>"BarackObama"
    }
  })
  users_queue.push({
    "twitter_keywords"=>"squirrelrific", 
    "klout"=>{
      "twitter_screen_name"=>"jsgoecke", 
      "twitter_id"=>"5760052", 
      "score"=> {
        "kscore"=>24, 
        "kclass_description"=>"You are a constant source of information to your friends and co-workers. There is a good chance that you probably introduced several of your friends to Twitter. Your taste and opinion is respected and your judgment is trusted.", 
        "slope"=>0, 
        "amplification_score"=>8.87, 
        "network_score"=>32.61, 
        "kscore_description"=>nil, 
        "true_reach"=>"57", 
        "kclass"=>"connector"
      }
    }, 
    "guid"=>(0...8).map{65.+(rand(25)).chr}.join, 
    "time"=>Time.now.to_s, 
    "phone_number"=>"+14155551212", 
    "channel"=>"twitter", 
    "queue_weight"=>rand(300), 
    "social_influence_rank"=>rand(9999),
    "twitter_profile"=>{
      "profile_sidebar_fill_color"=>"FFF7CC", 
      "profile_sidebar_border_color"=>"F2E195", 
      "profile_background_tile"=>false, 
      "name"=>"Jason Goecke", 
      "created_at"=>"Fri May 04 06:39:57 +0000 2007", 
      "profile_image_url"=>"http://a1.twimg.com/profile_images/326705566/1675181748_3fd2466492_o_normal.jpg", 
      "location"=>"San Carlos, CA", 
      "profile_link_color"=>"FF0000", 
      "favourites_count"=>9, 
      "contributors_enabled"=>false, 
      "url"=>"http://blog.goecke.net", 
      "id"=>5760052, 
      "utc_offset"=>-28800, 
      "lang"=>"en", 
      "protected"=>false, 
      "followers_count"=>442, 
      "profile_text_color"=>"0C3E53", 
      "description"=>"VP of Innovation @ Voxeo Labs working on Tropo.com.", 
      "time_zone"=>"Pacific Time (US & Canada)", 
      "geo_enabled"=>true, 
      "notifications"=>false, 
      "verified"=>false, 
      "profile_background_color"=>"BADFCD", 
      "friends_count"=>169, 
      "statuses_count"=>1888, 
      "status"=>{
        "favorited"=>false, 
        "created_at"=>"Thu Apr 29 00:57:44 +0000 2010", 
        "truncated"=>false, 
        "text"=>"Chesham is a difficult one over the phone. #sancarlos", 
        "id"=>13039292030, 
        "in_reply_to_user_id"=>nil, 
        "in_reply_to_screen_name"=>nil, 
        "source"=>"<a href=\"http://www.atebits.com/\" rel=\"nofollow\">Tweetie</a>", 
        "in_reply_to_status_id"=>nil
      }, 
      "profile_background_image_url"=>"http://a1.twimg.com/profile_background_images/4793628/cloud2.jpg", 
      "following"=>false, 
      "screen_name"=>"jsgoecke"
    }
  })
end

users_queue.push({
  "twitter_keywords"=>"squirrelrific", 
  "klout"=>{
    "twitter_screen_name"=>"kevinwhinnery", 
    "twitter_id"=>"813286", 
    "score"=>{
      "kscore"=>100, 
      "kclass_description"=>"You have built a personal brand around your identity. There is a good chance that you work in social media or marketing but you might even be famous in real life. Being a persona is not just about having a ton of followers, to make it to the top right corner you need to engage with your audience. Make no mistake about it though, when you talk people listen.", 
      "slope"=>0.15, 
      "amplification_score"=>100, 
      "network_score"=>100, 
      "kscore_description"=>nil, 
      "true_reach"=>"0", 
      "kclass"=>"persona"
    }
  }, 
  "guid"=>"1337", 
  "time"=>(Time.now - 60).to_s, 
  "phone_number"=>"+16512080532", 
  "channel"=>"twitter", 
  "queue_weight"=>240, 
  "social_influence_rank"=>9999, 
  "twitter_profile"=> {
    "profile_sidebar_fill_color"=>"e0ff92", 
    "profile_sidebar_border_color"=>"87bc44", 
    "profile_background_tile"=>false, 
    "name"=>"Kevin Whinnery", 
    "created_at"=>"Mon Mar 05 22:08:25 +0000 2007", 
    "profile_image_url"=>"http://a3.twimg.com/profile_images/597379283/head-clip_normal.jpg", 
    "location"=>"Saint Paul, MN", 
    "profile_link_color"=>"0000ff", 
    "url"=>"http://www.kevinwhinnery.com", 
    "favourites_count"=>0, 
    "contributors_enabled"=>false, 
    "id"=>813286, 
    "utc_offset"=>-18000, 
    "lang"=>"en", 
    "followers_count"=>3797052, 
    "protected"=>false,
    "profile_text_color"=>"000000", 
    "geo_enabled"=>false, 
    "description"=>"Appcelerator development crew", 
    "time_zone"=>"Central Time (US & Canada)", 
    "verified"=>true, 
    "notifications"=>false, 
    "profile_background_color"=>"3266CD", 
    "status"=>{
      "favorited"=>false, 
      "created_at"=>"Wed Apr 28 18:28:07 +0000 2010", 
      "truncated"=>false, 
      "text"=>"ZOMG - best episode of #glee EVAR!!!!! #soawesome #freakingout", 
      "id"=>13021098774, 
      "in_reply_to_user_id"=>nil, 
      "in_reply_to_screen_name"=>nil, 
      "source"=>"<a href=\"http://www.atebits.com/\" rel=\"nofollow\">Tweetie</a>", 
      "in_reply_to_status_id"=>nil
    }, 
    "profile_background_image_url"=>"http://a3.twimg.com/profile_background_images/57145311/twitterbamaNEW.jpg", 
    "friends_count"=>729778, 
    "statuses_count"=>677, 
    "following"=>false, 
    "screen_name"=>"kevinwhinnery"
  }
})

q.publish({
  "agents"=>[{
    "name"=>"John Doe", 
    "guid"=>"c2b8bac1-dc51-4660-bff1-d1f0aeb1bed9", 
    "phone_number"=>"+14157044517"
  }, 
  {
    "name"=>"Jane Smith", 
    "guid"=>"4d54ec51-531a-48e9-86ab-fa13e6354047", 
    "phone_number"=>"+14153675082"
  }], 
  "users"=>users_queue
}.to_json)
p 'Published some data!'









