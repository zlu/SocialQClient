var socialq = function() {
  //Navigate to the given tab, and send an event that the new tab is selected
  function navigateToTab(tab) {
    //Handle tab transition
    var target = $("#"+tab+"-tab");
    var siblings = target.siblings();
    target.addClass("active-tab").attr("src",target.attr("src").replace("off","on"));
    siblings.removeClass("active-tab").each(function() {
      $(this).attr("src", $(this).attr("src").replace("on", "off"));
    });
    
    //handle view transition
    target = $("#"+tab+"-secondary, #"+tab);
    siblings = target.siblings();
    siblings.hide();
    target.show();
  }
  
  function indicator() {
    $("#ajax").show();
  }
  
  function hideIndicator() {
    $("#ajax").hide();
  }
  
  function openTweetWindow(guid) {
    Titanium.App.Properties.setString("currentUser",guid);
    var twitter = Titanium.UI.createWindow({
      url:"app://twitter.html",
      height:290,
      width:450
    });
    twitter.open();
  }
  
  function openPhoneWindow(guid) {
    Titanium.App.Properties.setString("currentUser",guid);
    var phone = Titanium.UI.createWindow({
      url:"app://phone.html",
      height:290,
      width:450
    });
    phone.open();
  }
  
  return {
    nav:navigateToTab,
    ind:indicator,
    hideInd:hideIndicator,
    tweet:openTweetWindow,
    phone:openPhoneWindow
  };
}();

// Custom sorting plugin (Required for Quicksand)
(function($) {
  $.fn.sorted = function(customOptions) {
    var options = {
      reversed: false,
      by: function(a) { return a.text(); }
    };
    $.extend(options, customOptions);
    $data = $(this);
    arr = $data.get();
    arr.sort(function(a, b) {
      var valA = options.by($(a));
      var valB = options.by($(b));
      if (options.reversed) {
        return (valA < valB) ? 1 : (valA > valB) ? -1 : 0;				
      } else {		
        return (valA < valB) ? -1 : (valA > valB) ? 1 : 0;	
      }
    });
    return $(arr);
  };
})(jQuery);

//reverse plugin
(function($) {
$.fn.reverse = function() {
	return this.each(function() {
		$(this).prependTo( $(this).parent() );
	});
};
})(jQuery);

//Set up configu menu
var mainMenu = Titanium.UI.createMenu();
mainMenu.appendItem(Titanium.UI.createMenuItem("Configuration"));

var menu = Titanium.UI.createMenu();
menu.appendItem(Titanium.UI.createMenuItem("Manage Agent Info", function() {
  var agent = Titanium.UI.createWindow({
    url:"app://config.html",
    height:290,
    width:450
  });
  agent.open();
}));

//flip test data off on app exit
Titanium.API.addEventListener(Titanium.EXIT, function() {
  Titanium.App.Properties.setBool("test",false);
});

var createMenu = Titanium.UI.createMenu;
var mainMenu = createMenu();
mainMenu.addItem("Preferences");
var menu = createMenu();
mainMenu.getItemAt(0).setSubmenu(menu);

var checkItem = Titanium.UI.createCheckMenuItem("Use Test Data", function() {
	Titanium.App.Properties.setBool("test", !checkItem.getState());
});

menu.appendItem(checkItem);
menu.addItem("SocialQ Options", function() {
  var agent = Titanium.UI.createWindow({
    url:"app://config.html",
    height:300,
    width:450
  });
  agent.open();
});
Titanium.UI.currentWindow.setMenu(mainMenu);


//Initialize application
$(function() {
  
  //Add tab click handler
  $("#tabs .tab").click(function() {
    socialq.nav($(this).attr("id").split("-")[0]);
  });
  
});