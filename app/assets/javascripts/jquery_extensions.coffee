# Pulled from https://raw.githubusercontent.com/arasbm/jQuery-Pixel-Em-Converter/master/pxem.jQuery.js

$.fn.toEm = (settings) ->
    settings = jQuery.extend({
        scope: 'body'
    }, settings)
    that = parseInt(this[0],10)
    scopeTest = jQuery('<div style="display: none; font-size: 1em; margin: 0; padding:0; height: auto; line-height: 1; border:0;">&nbsp;</div>').appendTo(settings.scope)
    scopeVal = scopeTest.height()
    scopeTest.remove();
    (that / scopeVal).toFixed(8) + 'em'

$.fn.toPx = (settings) ->
    settings = jQuery.extend({
        scope: 'body'
    }, settings)
    that = parseFloat(this[0])
    scopeTest = jQuery('<div style="display: none; font-size: 1em; margin: 0; padding:0; height: auto; line-height: 1; border:0;">&nbsp;</div>').appendTo(settings.scope)
    scopeVal = scopeTest.height()
    scopeTest.remove()
    Math.round(that * scopeVal) + 'px'

# Originally from http://stackoverflow.com/a/2819568 and http://stackoverflow.com/a/4183448
# Adapted to take into account a sigil for specifying end range.
$.fn.extend
  insertAtCaret: (myValue) ->
    this.each (i) ->
      # For browsers like Internet Explorer
      if document.selection
        this.focus()
        sel = document.selection.createRange()
        sel.text = myValue
        this.focus()
      #  For browsers like Firefox and WebKit based
      else if this.selectionStart || this.selectionStart == '0'
        startPos = this.selectionStart
        endPos = this.selectionEnd
        scrollTop = this.scrollTop
        caretExpression = /([^\^]*)\^([^\^]*)\^([^\^]*)/
        before = ''
        after = ''
        match = caretExpression.exec myValue

        if match
          before = match[1]
          after = match[3]
          myValue = match[2]

        this.value = this.value.substring(0, startPos) + before + myValue + after + this.value.substring(endPos, this.value.length)
        this.focus()

        this.selectionStart = startPos + before.length
        this.selectionEnd = startPos + before.length + myValue.length
        this.scrollTop = scrollTop
      else
        this.value += myValue
        this.focus()
