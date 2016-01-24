class Article
  include Mongoid::Document
  include Mongoid::Timestamps
  include AutoHtmlFor
  field :title, type: String
  field :body, type: String
  field :summary, type: String
  field :tags, type: Array
  field :topics, type: Array
  field :slug, type: String
  field :media, type: Array, default: []

  index( { created_at: 1, slug: 1 }, { unique: true } )

  # Note! This needs to come before the other save callbacks, as #create_summary
  # explicitly queries #body_html.
  auto_html_for :body do
    image
    reyoutube
    youtube( width: 640, height: 360, autoplay: false )
    rougecarpet
  end

  before_save :create_slug
  before_save :create_summary
  before_save :create_media

  validates :title, presence: true
  validates :body, presence: true

  scope :published, -> { lte( created_at: Time.now ) }

  scope :published_on, -> (created_on) {
    between( created_at: created_on.at_beginning_of_day..created_on.at_end_of_day )
  }

  def current_synopsis
    html = remove_non_summarizable_content Nokogiri::HTML( self.body_html )
    text = html.text.gsub( /\s+/, ' ' )
    synopsis = OTS.parse text
    { summary: synopsis.summarize( sentences: 1 ), topics: synopsis.topics }
  end

  private

  def create_slug
    if title_changed? || !slug?
      self.slug = self.title.parameterize
    end
  end

  def create_summary
    if body_changed?
      synopsis = current_synopsis
      self.summary = synopsis[:summary].first[:sentence].strip
      self.topics = synopsis[:topics]
    end
  end

  def create_media
    if body_changed? || !media?
      html = Nokogiri::HTML( self.body_html )
      # self.media.concat html.xpath( '//@src[parent::iframe|parent::img]' ).map &:text
      self.media = html.xpath( '//img|//*[@class="video youtube"]' ).map &:to_s
      self.media.uniq!
    end
  end

  def remove_non_summarizable_content( html )
    html.search( 'pre' ).remove && html
  end
end
