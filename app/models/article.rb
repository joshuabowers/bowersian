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

  index( { created_at: 1, slug: 1 }, { unique: true } )

  # Note! This needs to come before the other save callbacks, as #create_summary
  # explicitly queries #body_html.
  auto_html_for :body do
    image
    youtube( width: 640, height: 360, autoplay: false )
    rougecarpet
  end

  before_save :create_slug
  before_save :create_summary

  validates :title, presence: true
  validates :body, presence: true

  def current_synopsis
    synopsis = OTS.parse Nokogiri::HTML( self.body_html ).text
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
      self.summary = synopsis[:summary].first[:sentence]
      self.topics = synopsis[:topics]
    end
  end
end
