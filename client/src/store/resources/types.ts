export interface Article {
  id: string;
  title: string;
  body: string;
  summary: string;
  tags: string[];
  topics: string[];
  slug: string;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  uri: string;
}
