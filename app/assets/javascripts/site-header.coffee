$(document).on 'page:change', (args) ->
  site_header_h1_position_initial = $('#site-header h1').offset()

  $(window).scroll (e) ->
    if $(this).scrollTop() > site_header_h1_position_initial.top
      $('#site-header').addClass 'stuck'
    else
      $('#site-header').removeClass 'stuck'
    null
