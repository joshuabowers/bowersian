require 'rails_helper'

RSpec.describe "articles/edit", type: :view do
  before(:each) do
    @article = assign(:article, Article.create!(
      :title => "MyString",
      :body => "MyString",
      :summary => "MyString",
      :tags => "",
      :topics => ""
    ))
  end

  it "renders the edit article form" do
    render

    assert_select "form[action=?][method=?]", article_path(@article), "post" do

      assert_select "input#article_title[name=?]", "article[title]"

      assert_select "input#article_body[name=?]", "article[body]"

      assert_select "input#article_summary[name=?]", "article[summary]"

      assert_select "input#article_tags[name=?]", "article[tags]"

      assert_select "input#article_topics[name=?]", "article[topics]"
    end
  end
end
