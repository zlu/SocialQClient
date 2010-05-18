(function() {
  $.extend(socialq, {
    live: {
      search: function() {
        socialq.ind();
        $.getJSON("http://search.twitter.com/search.json?q="+escape($("#live-search").val())+"&rpp=50", function(data) {
          var html = "";
          
          for (var i = 0; i < data.results.length; i++) {
            var created_at = "";
            if (data.results[i].created_at) {
              var date = Date.parse(data.results[i].created_at);
              if (date) {
                created_at = $.timeago(date);
              }
            }
            
            html += '<li class="queue-box">'+
            '<table style="width:100%;">'+
              '<tr>'+
                '<td valign="top" style="width:47px;">'+
                  '<div class="avatar">'+
                    '<div class="avatar-bubble" style="background:url('+data.results[i].profile_image_url+')"></div>'+
                  '</div>'+
                '</td>'+
                '<td valign="top">'+
                  '<div class="name">'+
                    '<span>'+data.results[i].from_user+'</span><br/><span class="timeago">'+created_at+'</span>'+
                    '<div class="twitter-status">'+data.results[i].text+'</div>'+
                  '</div>'+
                '</td>'+
              '</tr>'+
            '</table></li>';
          }
          
          $("#live-search-results").html(html);
          socialq.hideInd();
        });
      }
    }
  });

  //Initialize Live UI
  $(function() {
    $("#live-search").keyup(function(e) {
      if (e.keyCode == 13) {
        socialq.live.search();
      }
    });
    
    $("#clear-live").click(function() {
      $("#live-search").val("").focus();
    });
    
    socialq.live.search();
  });
})();