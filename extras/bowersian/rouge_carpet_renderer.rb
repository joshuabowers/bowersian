require 'rouge/plugins/redcarpet'

module Bowersian
  class RougeCarpetRenderer < Redcarpet::Render::HTML
    include Rouge::Plugins::Redcarpet
    include Redcarpet::Render::SmartyPants

    protected

    def rouge_formatter( options = {} )
      new_options = { line_numbers: false, css_class: 'hll' }
      method = options.respond_to?(:options) ? :options : :merge
      CounterFormatter.new( options.send( method, new_options ) )
    end
  end
end
