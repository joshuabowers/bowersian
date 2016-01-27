module Bowersian
  class CounterFormatter < ::Rouge::Formatters::HTML
    def initialize( options = {} )
      @language = options[:language]
      super
    end

    private
    def content_tag( tag_name, content, attributes = {} )
      attribute_pairs = ' ' + attributes.map {|k, v| "#{ k }='#{ v }'"}.join( ' ' )
      attribute_pairs.strip! if attribute_pairs.blank?
      "<#{ tag_name }#{ attribute_pairs }>#{ content }</#{ tag_name }>"
    end

    def stream_untableized(tokens, &b)
      if @wrap
        if @language
          lang = content_tag( :div, content_tag( :div, @language, class: 'language' ), class: 'language-wrapper')
        end
        yield "<pre#@css_class>#{ lang }<code>"
      end

      # yield "<div class='language-wrapper'><div class='language'>#{@language}</div></div>" if @language

      formatted, last = '', { eol: false, line: 0 }
      line_token = ::Rouge::Token::Tokens::Generic::Lineno
      next_line_whitespace = ''

      tokens.chunk do |pair|
        tok, val = *pair
        last_eol, last[:eol] = last[:eol], val =~ /\n/
        last[:line] += last_eol ? 1 : 0
      end.each do |_, line_pairs|
        line = ''
        line_pairs.each {|tok, val| span( tok, val ) {|str| line << str} }

        begin
          addition = "<span class='#{line_token.shortname}'>#{next_line_whitespace}#{line}"
          addition.match( /(\A[^\n]*\n)(\s*\Z)/ )
          addition, next_line_whitespace = $1, $2
          addition.gsub!( /\n/, " \n" ) if line.blank?
          addition.gsub!( /\n/, "</span>\n" )
          formatted << addition
          line = ''
        end until next_line_whitespace !~ /\n/
      end

      yield formatted
      yield "</code></pre>\n" if @wrap
    end
  end
end
