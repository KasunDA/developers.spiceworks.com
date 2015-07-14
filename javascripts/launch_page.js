(function() {
  (function($) {
    var getErrorText;
    getErrorText = function(key, errors) {
      var ref;
      if ((ref = errors[key]) != null ? ref.length : void 0) {
        return (_.str.titleize(key)) + " " + (_.first(errors.email));
      } else {
        return "Something went wrong";
      }
    };
    return developers.home = {
      init: function() {
        $('.email-form').on('submit', function() {
          var $emailForm, $messagesId;
          $emailForm = $(this);
          $messagesId = $emailForm.data('messages-id');
          $emailForm.find('.inputs-wrap').removeClass('has-error').end().siblings('.email-form-messages').find('.form-message').removeClass('in');
          return Ladda.create($emailForm.find('.btn-primary')[0]).start();
        }).on('ajax:success', function(e, xhr, status) {
          var $emailForm;
          $emailForm = $(this);
          return $emailForm.hide().siblings('.email-form-messages').find('.success-message').addClass('in');
        }).on('ajax:error', function(e, xhr, status) {
          var $emailForm, errors;
          errors = $.parseJSON(xhr.responseText).errors;
          $emailForm = $(this);
          return $emailForm.find('.inputs-wrap').addClass('has-error').end().siblings('.email-form-messages').find('.email-error-message').text(getErrorText("email", errors)).end().find('.failure-message').addClass('in');
        }).on('ajax:complete', function(e, xhr, status) {
          return Ladda.create($(this).find('.btn-primary')[0]).stop();
        });
        return $('.sign-up-link').on('click', function(e) {
          e.preventDefault();
          return $(this).hide().parent().siblings(".form-wrapper").show().find('input[type="email"]').focus();
        });
      }
    };
  })(jQuery);

}).call(this);
