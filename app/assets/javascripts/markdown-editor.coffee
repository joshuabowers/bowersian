$(document).on 'page:change', ->
  markdown_editor_attached_preview_hidden = (editor) ->
    $(editor).closest('.markdown').find('.preview').hasClass('hidden')

  # When a toolbar button is activated, copy its value into the editor's current
  # caret position.
  $('.toolbar-button').on 'click', ->
    return unless $(this).data('value')
    value = $(this).data('value')
    $(this).closest('.editor').find('textarea').insertAtCaret( value )

  # When the toggle-preview button is activated, add or remove the hidden class on preview
  $('.toolbar-toggle-preview').on 'click', ->
    $(this).closest('.markdown').find('.preview').toggleClass('hidden')
    $(this).closest('.toolbar').toggleClass('expanded')

  $('.markdown .editor textarea').on 'paste', (e) ->
    e.preventDefault()

    clipboardData = (e.originalEvent || e).clipboardData

    text = clipboardData.getData('text/html') || clipboardData.getData('text/plain')

    converted = toMarkdown text,
      gfm: true
      converters: [
        {
          filter: (node) ->
            node.nodeName == 'SPAN' && node.className == 'Apple-converted-space'
          replacement: (content) ->
            content
        }
        {
          filter: (node) ->
            node.nodeName == 'PRE' &&
            node.firstChild &&
            node.firstChild.nodeName == 'DIV' &&
            node.firstChild.className == 'language-wrapper'
          replacement: (content, node) ->
            language = node.firstChild.textContent
            '\n\n```' + language + '\n' + node.lastChild.textContent + '\n```\n\n'
        }
        {
          filter: (node) ->
            node.nodeName == 'DIV' || node.nodeName == 'ARTICLE' || node.nodeName =='HEADER'
          replacement: (content) ->
            content
        }
      ]

    window.document.execCommand('insertText', false, converted)

  # When the editor is altered in some fashion, update the preview pane
  $('.markdown .editor textarea').on 'change keyup paste', ->
    $(this).closest('.markdown').find('.preview .content').html markdown.toHTML( $(this).val() )

  if $('.markdown .toolbar').length > 0
    toolbar_top_initial = $('.markdown .toolbar').offset().top
    site_header_padding = parseInt $(1).toPx()

    # When the window is scrolling, attempt to affix the toolbar below the site header.
    $(window).scroll (e) ->
      stickied_top = toolbar_top_initial - $('#site-header').height() - site_header_padding
      if $(this).scrollTop() > stickied_top
        $('.markdown .toolbar').addClass 'stuck'
        $('.markdown .toolbar').css
          top: $('#site-header').height() + site_header_padding
      else
        $('.markdown .toolbar').removeClass 'stuck'
        $('.markdown .toolbar').css
          top: 'auto'
      null

    # Ensure that the preview pane is populated on load.
    $('.markdown .editor textarea').change()
