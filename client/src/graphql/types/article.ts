export interface IArticle {
  id?: string;
  title?: string;
  summary?: string;
  body?: string;
  tags?: string[];
  slug?: string;
  uri?: string;
  publishedAt?: Date;
  author?: string;
}

export interface IArticles {
  articles: IArticle[];
}
