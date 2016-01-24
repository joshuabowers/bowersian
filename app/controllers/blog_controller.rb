class BlogController < ApplicationController
  def search

  end

  def slugged_index
    created_on = ( "%i-%02i-%02i" % [params[:year], params[:month], params[:day]] ).to_date
    slug = Regexp.escape(params[:slug])
    articles = Article.published_on( created_on ).where( slug: /#{slug}/ )
    if articles.count == 1
      redirect_to articles.first
    else
      redirect_to articles_path( on: created_on, title: slug )
    end
  end
end
