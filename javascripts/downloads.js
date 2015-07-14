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

}(jQuery));
