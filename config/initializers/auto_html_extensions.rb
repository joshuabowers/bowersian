require 'redcarpet'
require 'rouge/plugins/redcarpet'

module Bowersian
  class Formatter < ::Rouge::Formatters::HTML
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

  class RougeCarpetRenderer < Redcarpet::Render::HTML
    include Rouge::Plugins::Redcarpet
    include Redcarpet::Render::SmartyPants

    protected

    def rouge_formatter( options = {} )
      new_options = { line_numbers: false, css_class: 'hll' }
      method = options.respond_to?(:options) ? :options : :merge
      Formatter.new( options.send( method, new_options ) )
    end
  end
end

AutoHtml.add_filter(:rougecarpet).with({}) do |text, options|
  options.merge!(
    no_intra_emphasis: true,
    autolink: true,
    tables: true,
    fenced_code_blocks: true,
    disable_indented_code_blocks: true
  )
  Redcarpet::Markdown.new(Bowersian::RougeCarpetRenderer, options).render(text)
end

AutoHtml.add_filter(:reyoutube).with({}) do |text, options|
  text.gsub( /(https?:)?(\/\/)?(www\.)?(youtube\.com\/embed\/)([[:alnum:]]+)/ ) do
    youtube_id = $4
    "#{$1}#{$2||'//'}#{$3}youtube.com/watch?v=#{$5}"
  end
end
