atom_feed do |feed|
  feed.title 'Bowersian'
  feed.updated( @articles.first.created_at ) if @articles.length > 0

  @articles.each do |article|
    feed.entry(article) do |entry|
      entry.title article.title
      entry.content( article.body_html, type: 'html' )
      entry.summary article.summary

      entry.author do |author|
        author.name 'Joshua'
      end
    end
  end
end
