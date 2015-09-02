require 'rails_helper'

RSpec.describe "articles/new", type: :view do
  before(:each) do
    assign(:article, Article.new(
      :title => "MyString",
      :body => "MyString",
      :summary => "MyString",
      :tags => "",
      :topics => ""
    ))
  end

  it "renders new article form" do
    render

    assert_select "form[action=?][method=?]", articles_path, "post" do

      assert_select "input#article_title[name=?]", "article[title]"

      assert_select "input#article_body[name=?]", "article[body]"

      assert_select "input#article_summary[name=?]", "article[summary]"

      assert_select "input#article_tags[name=?]", "article[tags]"

      assert_select "input#article_topics[name=?]", "article[topics]"
    end
  end
end
