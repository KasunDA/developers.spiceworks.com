(function($) {
  'use strict';

  var setupSidebar = function () {
    var $sideBar = $('.aside-wrapper aside');

    $sideBar.affix({
      offset: {
        top: function () {
          var offsetTop = $sideBar.offset().top;
          var domesticNavHeight = $('.domestic-nav').outerHeight(true);
          return (this.top = offsetTop - domesticNavHeight);
        },
        bottom: function () {
          return (this.bottom = $('footer').outerHeight(true))
        }
      }
    });

    $('body').scrollspy({
      target: '.aside-wrapper',
      offset: 0
    });
  }

  developers['what-is-spiceworks'] = {
    init: function () {
      setupSidebar();
    }
  };

  developers['getting-started'] = {
    init: function () {
      setupSidebar();
    }
  }

}(jQuery));
