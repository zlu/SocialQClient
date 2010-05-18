$(function() {
  var user = Titanium.JSON.parse(Titanium.App.Properties.getString(Titanium.App.Properties.getString("currentUser")));
  console.log(user);
  
  var agentProfile;
  try {
    agentProfile = Titanium.JSON.parse(Titanium.App.Properties.getString("agentProfile"));
  } catch(e) {
    console.log(e);
  }
  
  $("h2").html("@"+user.twitter_profile.screen_name);
  
  $("#tweet").val("@"+user.twitter_profile.screen_name).keyup(function(e) {
    $("#chars").html(140-$(this).val().length);
  });
  
  $("#chars").html(140-$("#tweet").val().length);
  
  $("#cancel").click(function() {
    Titanium.UI.getCurrentWindow().close();
  });
  
  $("#post").click(function() {
    socialq.ind();
    $.post("https://"+agentProfile.twitter_username+":"+agentProfile.twitter_password+"@twitter.com/statuses/update.json",{status:$("#tweet").val()},function(data) {
      //TODO: Error handling
      socialq.data.saveToHistory(user.guid,"twitter",$("#tweet").val(),
        user.twitter_profile.name,
        user.twitter_profile.screen_name,
        user.twitter_profile.profile_image_url
      );
      Titanium.UI.getMainWindow().getDOMWindow().socialq.data.agentReady({
         customer_guid: user.guid,
         agent_phone: "+14155551212",
         action: "tweet"
      });
      Titanium.UI.getMainWindow().getDOMWindow().socialq.history.search();
      Titanium.UI.getMainWindow().getDOMWindow().socialq.queue.fetchQueue();
      Titanium.UI.getMainWindow().getDOMWindow().socialq.queue.historyForId(user.guid);
      Titanium.UI.getMainWindow().getDOMWindow().socialq.history.historyForId(user.guid);
      Titanium.UI.getCurrentWindow().close();
    },"json");
  });
});