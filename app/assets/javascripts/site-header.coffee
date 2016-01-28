$(document).on 'page:change', (args) ->
  site_header_extra_padding = parseInt $(0.5).toPx()
  site_header_h1_position_initial = $('#site-header h1').offset()
  site_header_h1_top_initial = site_header_h1_position_initial.top - site_header_extra_padding
  # The h1 should have a bit of extra padding when stuck

  $(window).scroll (e) ->
    if $(this).scrollTop() > site_header_h1_top_initial
      $('#site-header').addClass 'stuck'
    else
      $('#site-header').removeClass 'stuck'
    null
