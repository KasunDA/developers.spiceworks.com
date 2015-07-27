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
    if (swoosh.checked) {
      var button = "follow";
    } else if (swooshFollow.checked) {
        button = "spicebutton-follow";
    }
    $('.follow-button-code')
      .val('<a href="http://community.spiceworks.com/pages/' + vendorName +
          '/follow"><img src="http://static.spiceworks.com/share/' + button + '.png"' +
          'title="Follow us on Spiceworks" alt="Follow us on Spiceworks" /></a>');
  },

  startListeningForCopyToClipboardClicks = function(){
    var $copyButton = $('.copy-to-clipboard-btn');
    var client = new ZeroClipboard( $copyButton );

    $copyButton.on('click', function(e){ e.preventDefault(); })
    client.on( 'ready', function(event) {
      client.on( 'aftercopy', function(event) {
        console.log('Copied text to clipboard: ' + event.data['text/plain']);
        highlightElement($('.copy-success'));
      } );
    } );

    client.on( 'error', function(event) {
      // console.log( 'ZeroClipboard error of type "' + event.name + '": ' + event.message );
      ZeroClipboard.destroy();
    } );
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
