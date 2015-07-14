(function($) {
  'use strict';

  var highlightElement = function(el){
    var $el = $(el);
    var highlightClass = 'highlighted';
    $el.show().addClass(highlightClass);
    setTimeout(function(){$el.removeClass(highlightClass);},2000);
  },

  toggleLoginButtonForm = function(){
    $('.login-with-spiceworks-form').toggle()[0].reset();
    $('.login-button-form-thank-you').toggle();
  },

  setupLoginWithSWForm = function(){
    var $form = $('.login-with-spiceworks-form'),
        submitButton = Ladda.create( $form.find('.sui-bttn-primary')[0] );

    $form
      .on('submit', function(){ submitButton.start(); })
      .on('ajax:complete', function(){
        toggleLoginButtonForm();
        submitButton.stop();
        });
  },

  setFollowButtonCode = function(){
    var vendorName = $('#vendor-name').val();
    vendorName = vendorName || 'VENDOR_NAME';
    $('.follow-button-code')
      .val('<a href="http://community.spiceworks.com/pages/' + vendorName +
        '/follow"><img src="http://static.spiceworks.com/share/follow.png"' +
        'title="Follow us on Spiceworks" alt="Follow us on Spiceworks" /></a>');
  },

  startListeningForCopyToClipboardClicks = function(){
    $('.copy-to-clipboard-btn')
      .on('click', function(e){
        e.preventDefault();
        highlightElement($('.copy-success'));
      })
      .zclip({
        path:'http://www.steamdev.com/zclip/js/ZeroClipboard.swf',
        copy: function(){return $('#' + $(this).data('clipboard-source')).val();},
        afterCopy: function(){highlightElement($(this).data('clipboard-source'));}
      });
  };

  developers.documentation = {
    share: {
      init: function () {
        setupLoginWithSWForm();

        //set up events for buttons
        $('.update-follow-button-code').on('click', function(e){
          e.preventDefault();
          setFollowButtonCode();
          highlightElement(this);
        });

        $('.show-login-button-form').on('click', function (e) {
          e.preventDefault();
          toggleLoginButtonForm();
        });

        //set up zClip copy-to-clipboard functionality
        startListeningForCopyToClipboardClicks();

        var $sideBar = $('.aside-wrapper aside');

        $sideBar.affix({
          offset: {
            top: function () {
              var offsetTop = $sideBar.offset().top;
              var domesticNavHeight = $('.domestic-nav').outerHeight(true);
              var breadcrumbsMargin = parseInt($('.breadcrumbs').css('margin-bottom'), 10);
              return (this.top = offsetTop - domesticNavHeight - breadcrumbsMargin);
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
    }
  };

}(jQuery));
