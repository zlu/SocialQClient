$(function() {
  var agentProfile;
  try {
    agentProfile = Titanium.JSON.parse(Titanium.App.Properties.getString("agentProfile"));
  } catch(e) {
    console.log(e);
  }
  
  if (agentProfile) {
    $("#un").val(agentProfile.twitter_username);
    $("#pw").val(agentProfile.twitter_password);
    $("#ph").val(agentProfile.phone);
    $("#url").val(agentProfile.queueEndpoint);
  }
  
  $("#cancel").click(function() {
    Titanium.UI.getCurrentWindow().close();
  });
  
  $("#save").click(function() {
    agentProfile = {
      twitter_username: $("#un").val(),
      twitter_password: $("#pw").val(),
      phone: $("#ph").val(),
      queueEndpoint: $("#url").val()
    };
    
    Titanium.App.Properties.setString("agentProfile", Titanium.JSON.stringify(agentProfile));
    Titanium.UI.getCurrentWindow().close();
  });
});