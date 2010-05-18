$(function() {
  var user = Titanium.JSON.parse(Titanium.App.Properties.getString(Titanium.App.Properties.getString("currentUser")));
  console.log(user);
  
  var agentProfile;
  try {
    agentProfile = Titanium.JSON.parse(Titanium.App.Properties.getString("agentProfile"));
  } catch(e) {
    console.log(e);
  }
  
  Titanium.UI.getMainWindow().getDOMWindow().socialq.data.agentReady({
     customer_guid: user.guid,
     agent_phone: agentProfile.phone||"",
     action: "phone"
  });
  
  $("h2").html(user.twitter_profile.name);
  
  $("#phone").val("Your call will be connected shortly.  Enter details about your conversation with "+user.twitter_profile.name+" here.");
  
  $("#cancel").click(function() {
    Titanium.UI.getCurrentWindow().close();
  });
  
  $("#save").click(function() {
    socialq.ind();
    socialq.data.saveToHistory(user.guid,"phone",$("#phone").val(),
      user.twitter_profile.name,
      user.twitter_profile.screen_name,
      user.twitter_profile.profile_image_url
    );
    Titanium.UI.getMainWindow().getDOMWindow().socialq.history.search();
    Titanium.UI.getMainWindow().getDOMWindow().socialq.queue.fetchQueue();
    Titanium.UI.getMainWindow().getDOMWindow().socialq.queue.historyForId(user.guid);
    Titanium.UI.getMainWindow().getDOMWindow().socialq.history.historyForId(user.guid);
    Titanium.UI.getCurrentWindow().close();
  });
});