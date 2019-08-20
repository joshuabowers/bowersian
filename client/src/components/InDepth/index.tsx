import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import { ByLine } from 'components/ByLine';
import styles from './InDepth.module.css';
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

export const InDepth = (props: IArticle) => {
  console.log(props);
  const publishedAt = props.publishedAt && new Date(props.publishedAt);
  const date = publishedAt && {
    year: publishedAt.getFullYear(),
    month: publishedAt.getMonth() + 1
  };
  console.log(date);
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
  if (!data || !data.article) {
    return <p>No content</p>;
  }

  return (
    <article className={styles.InDepth}>
      <header>
        <h2>{data.article.title}</h2>
      </header>
      <section>
        <ReactMarkdown source={data.article.body} />
      </section>
      <ByLine {...data.article} />
    </article>
  );
};
