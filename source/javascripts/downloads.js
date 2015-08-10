(function($) {
  'use strict';

  var DOWNLOAD_URL = 'http://download.spiceworks.com/DesktopDevEdition/current/Spiceworks.exe';

  var onLogin = function () {
    window.location.href = DOWNLOAD_URL;
  }

  developers.downloads = {
    init: function () {
      var login = new SW.Login({appUid: 'bfe9764216a6762c790e314923e277fd23064dc2c7f424c5fe930a9379f4bb71',
                                clientId: 'bfe9764216a6762c790e314923e277fd23064dc2c7f424c5fe930a9379f4bb71'});
      $('.download-dev-edition-button').on('click', function (e) {
        e.preventDefault();
        if ($('html').hasClass('ie')) {
          onLogin();
        }
        else {
          login.request('login').then(onLogin);
        }
      });
    }
  };

  $(document).ready(function(){
    $("ul.download-box_tab-header li").click(function(e){
      console.log('click!');
      if (!$(this).hasClass("active") && !$(this).hasClass("filler")) {
        var tabNum = $(this).index();
        var nthChild = tabNum+1;
        $("ul.download-box_tab-header li.active").removeClass("active");
        $(this).addClass("active");
        $("ul.download-box_tab-body li.active").removeClass("active");
        $("ul.download-box_tab-body li:nth-child("+nthChild+")").addClass("active");
      }
    });
  });

  $(document).ready(function(){
    $(".download-box_button").click(function(e){
      console.log('CLEEK');
      console.log($(".download-box_splash"));
      $(".download-box_splash").addClass("download-box_hidden");
      console.log('A');
      $("ul.download-box_tab-header").removeClass("download-box_hidden");
      console.log('B');
      $("ul.download-box_tab-body").removeClass("download-box_hidden");
      console.log('C');
    });
  });

}(jQuery));
