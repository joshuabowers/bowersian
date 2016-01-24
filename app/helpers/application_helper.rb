module ApplicationHelper
  def blog_slugged_article_path( article )
    blog_slugged_index_path(
      year: article.created_at.year,
      month: article.created_at.month,
      day: article.created_at.day,
      slug: article.slug
    )
  end
end
