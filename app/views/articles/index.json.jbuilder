json.array!(@articles) do |article|
  json.extract! article, :id, :title, :body, :summary, :tags, :topics
  json.url article_url(article, format: :json)
end
