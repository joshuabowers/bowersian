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
