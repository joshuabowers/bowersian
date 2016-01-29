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

    ::AutoHtml::add_filter(:flickr_modern).with(:maxwidth => nil, :maxheight => nil, :link_options => {}) do |text, options|
      require 'uri'
      require 'net/http'
      require 'rexml/document'

      regex = Regexp.union(
        %r{https?://flic\.kr/p/([^\s<]*)},
        %r{https?://(www\.)?flickr\.com/photos/[^\s<]*}
      )

      text.gsub( regex ) do |match|
        params = { :url => match, :format => "json" }
        [:maxwidth, :maxheight].each { |p| params[p] = options[p] unless options[p].nil? or not options[p] > 0 }

        uri = URI("https://www.flickr.com/services/oembed")
        uri.query = URI.encode_www_form(params)

        response = JSON.parse(Net::HTTP.get(uri))

        link_options = Array(options[:link_options]).reject { |k,v| v.nil? }.map { |k, v| %{#{k}="#{REXML::Text::normalize(v)}"} }.join(' ')
        %{<a href="#{match}"#{ ' ' + link_options unless link_options.empty? }><img src="#{response["url"]}" alt="#{response["title"]}" title="#{response["title"]}" /></a>}
      end
    end

    ::AutoHtml::add_filter(:youtube_extensions).with({}) do |text, options|
      text.gsub( /(https?:)?(\/\/)?(www\.)?(youtube\.com\/embed\/)([[:alnum:]]+)/ ) do
        youtube_id = $4
        "#{$1}#{$2||'//'}#{$3}youtube.com/watch?v=#{$5}"
      end
    end
  end
end
