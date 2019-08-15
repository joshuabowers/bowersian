import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import { ByLine } from 'components/ByLine';
import styles from './Article.module.css';
import { IArticle } from 'graphql/types/article';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const findArticle = gql`
  query FindArticle($slug: ISlug!) {
    article(search: $slug) {
      id
      title
      body
      tags
      publishedAt
    }
  }
`;

interface ArticlePayload {
  article: IArticle;
}

export const Article = (props: IArticle) => {
  const date = props.publishedAt && {
    year: props.publishedAt.getFullYear(),
    month: props.publishedAt.getMonth()
  };
  const { loading, error, data } = useQuery<ArticlePayload>(findArticle, {
    variables: {
      slug: {
        date: date,
        slug: props.slug
      }
    }
  });
  if (loading) {
    return <p>Loading</p>;
  }
  if (error) {
    console.error(error);
    return <p>Error</p>;
  }
  if (!data) {
    return <p>No content</p>;
  }

  return (
    <main>
      <article className={styles.Article}>
        <header>
          <h2>{data.article.title}</h2>
        </header>
        <section>
          <ReactMarkdown source={data.article.body} />
        </section>
        <ByLine {...data.article} />
      </article>
    </main>
  );
};
