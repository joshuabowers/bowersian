require 'redcarpet'

module Extensions
  module AutoHtml
    ::AutoHtml::add_filter(:rougecarpet).with({}) do |text, options|
      options.merge!(
        no_intra_emphasis: true,
        autolink: true,
        tables: true,
        fenced_code_blocks: true,
        disable_indented_code_blocks: true
      )
      Redcarpet::Markdown.new(Bowersian::RougeCarpetRenderer, options).render(text)
    end

    ::AutoHtml::add_filter(:reyoutube).with({}) do |text, options|
      text.gsub( /(https?:)?(\/\/)?(www\.)?(youtube\.com\/embed\/)([[:alnum:]]+)/ ) do
        youtube_id = $4
        "#{$1}#{$2||'//'}#{$3}youtube.com/watch?v=#{$5}"
      end
    end
  end
end
