do($ = jQuery) ->
  developers.support =
    faq:
      init: ->
        $(window.location.hash).closest('li').toggleClass('on')
        $('.faq').children('li').click ->
          $(@).toggleClass('on')
