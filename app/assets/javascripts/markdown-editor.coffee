$(document).on 'page:change', ->
  $('.toolbar-button').on 'click', ->
    value = $(this).data('value')
    $(this).closest('.editor').find('textarea').insertAtCaret( value )
