(function() {
  (function($) {
    return developers.support = {
      faq: {
        init: function() {
          $(window.location.hash).closest('li').toggleClass('on');
          return $('.faq').children('li').click(function() {
            return $(this).toggleClass('on');
          });
        }
      }
    };
  })(jQuery);

}).call(this);
