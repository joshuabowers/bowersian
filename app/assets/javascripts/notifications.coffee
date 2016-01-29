$(document).on 'page:change', (args) ->
  $('#notifications > *').fadeIn().delay( 3000 ).fadeOut()

$(document).on 'page:before-unload', (args) ->
  $('#notifications > *').fadeOut()
  true
