require 'redcarpet'
require 'rouge/plugins/redcarpet'

class RougeCarpetRenderer < Redcarpet::Render::HTML
  include Rouge::Plugins::Redcarpet
  include Redcarpet::Render::SmartyPants

  protected

  def rouge_formatter( options = {} )
    new_options = { line_numbers: true, css_class: 'hll' }
    method = options.respond_to?(:options) ? :options : :merge
    ::Rouge::Formatters::HTML.new( options.send( method, new_options ) )
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
  Redcarpet::Markdown.new(RougeCarpetRenderer, options).render(text)
end

AutoHtml.add_filter(:reyoutube).with({}) do |text, options|
  text.gsub( /(https?:)?(\/\/)?(www\.)?(youtube\.com\/embed\/)([[:alnum:]]+)/ ) do
    youtube_id = $4
    "#{$1}#{$2||'//'}#{$3}youtube.com/watch?v=#{$5}"
  end
end
