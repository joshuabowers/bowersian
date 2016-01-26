require 'rouge/plugins/redcarpet'

module Bowersian
  class RougeCarpetRenderer < Redcarpet::Render::HTML
    include Rouge::Plugins::Redcarpet
    include Redcarpet::Render::SmartyPants

    protected

    def rouge_formatter( lexer )
      options = { line_numbers: false, css_class: "hll #{lexer.tag}", language: lexer.tag }
      CounterFormatter.new( options )
    end
  end
end
