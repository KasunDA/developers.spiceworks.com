(function() {
  (function($) {
    return developers.contact_form = {
      init: function() {
        var $contactForm, $formMessages, formSubmit, getErrorText;
        getErrorText = function(key, errors) {
          var ref;
          if ((ref = errors[key]) != null ? ref.length : void 0) {
            return (_.str.titleize(key)) + " " + (_.first(errors[key]));
          } else {
            return "Something went wrong";
          }
        };
        $contactForm = $('.contact-support form');
        $formMessages = $('.contact-support .contact-support-form-messages');
        formSubmit = Ladda.create($contactForm.find('.btn-primary')[0]);
        return $contactForm.on('submit', function() {
          $contactForm = $(this);
          $contactForm.find('.has-error').removeClass('has-error');
          $formMessages.find('.form-message').removeClass('in');
          return formSubmit.start();
        }).on('ajax:success', function(e, xhr, status) {
          $contactForm = $(this);
          $formMessages.find('.success-message').addClass('in');
          return $contactForm[0].reset();
        }).on('ajax:error', function(e, xhr, status) {
          var errors, firstErrorKey;
          errors = $.parseJSON(xhr.responseText).errors;
          firstErrorKey = _.chain(errors).keys().first().value();
          $contactForm = $(this);
          $contactForm.find(":input[name='" + firstErrorKey + "']").closest('.field').addClass('has-error');
          $formMessages.find('.contact-support-form-error-message').text(getErrorText(firstErrorKey, errors));
          return $formMessages.find('.failure-message').addClass('in');
        }).on('ajax:complete', function(e, xhr, status) {
          return formSubmit.stop();
        });
      }
    };
  })(jQuery);

}).call(this);
