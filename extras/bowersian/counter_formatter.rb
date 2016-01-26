module Bowersian
  class CounterFormatter < ::Rouge::Formatters::HTML
    private
    def stream_untableized(tokens, &b)
      yield "<pre#@css_class><code>" if @wrap

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
