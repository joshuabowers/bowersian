require 'redcarpet'
require 'rouge/plugins/redcarpet'

class RougeCarpetRenderer < Redcarpet::Render::HTML
  include Rouge::Plugins::Redcarpet
  include Redcarpet::Render::SmartyPants

  protected

  def rouge_formatter( options = {} )
    new_options = { line_numbers: true }
    method = options.respond_to?(:options) ? :options : :merge
    ::Rouge::Formatters::HTML.new( options.send( method, new_options ) )
  end
end

AutoHtml.add_filter(:rougecarpet).with({}) do |text, options|
  options.merge!( autolink: true, tables: true, fenced_code_blocks: true )
  Redcarpet::Markdown.new(RougeCarpetRenderer, options).render(text)
end
