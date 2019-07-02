import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { Article, ArticleFooter } from './Article.component';
import { ErrorBoundary } from 'components/ErrorBoundary';
import TimeAgo from 'react-timeago';

const titleText = 'In the Upside-Down';
const synopsisText = 'Trapped in a hostile realm inimical to life.';
const contentText = 'The Upside-Down is another dimension, rotted, decaying...';
const publishedAt = new Date();
const author = { name: 'Joshua', url: '/about/joshua' };

describe(ArticleFooter, () => {
  it('renders its publishing date', () => {
    const wrapper = shallow(<ArticleFooter publishedAt={publishedAt} />);
    const published = <TimeAgo date={publishedAt} />;
    expect(wrapper).toContainReact(published);
  });

  it('renders its author name', () => {
    const wrapper = shallow(<ArticleFooter author={author.name} />);
    const byline = (
      <address>
        <a href={author.url}>{author.name}</a>
      </address>
    );
    expect(wrapper).toContainReact(byline);
  });

  it('renders both publishing date and byline', () => {
    const wrapper = shallow(
      <ArticleFooter publishedAt={publishedAt} author={author.name} />
    );
    const published = <TimeAgo date={publishedAt} />;
    const byline = (
      <address>
        <a href={author.url}>{author.name}</a>
      </address>
    );
    expect(wrapper).toContainReact(published);
    expect(wrapper).toContainReact(byline);
  });
});

describe(Article, () => {
  it('renders without crashing', () => {
    shallow(<Article title="In the Upside-Down" content={contentText} />);
  });

  it('renders its title', () => {
    const wrapper = shallow(
      <Article title={titleText} content={contentText} />
    );
    const title = <h2>{titleText}</h2>;
    expect(wrapper).toContainReact(title);
  });

  describe('when in preview mode', () => {
    it('is in preview mode', () => {
      const wrapper = mount(
        <Article preview title={titleText} synopsis={synopsisText} />
      );
      expect(wrapper.prop('preview')).toBeTruthy();
    });

    it('must have a synopsis', () => {
      spyOn(console, 'error');
      const wrapper = mount(
        <ErrorBoundary>
          <Article preview title={titleText} />
        </ErrorBoundary>
      );
      expect(wrapper.state()).toHaveProperty('hasError', true);
    });

    it('renders its synopsis', () => {
      const wrapper = mount(
        <Article preview title={titleText} synopsis={synopsisText} />
      );
      const text = <blockquote>{synopsisText}</blockquote>;
      expect(wrapper).toContainReact(text);
    });

    it('does not render its content', () => {
      const wrapper = mount(
        <Article
          preview
          title={titleText}
          synopsis={synopsisText}
          content={contentText}
        />
      );
      const text = <section>{contentText}</section>;
      expect(wrapper).not.toContainReact(text);
    });
  });

  describe('when in full mode', () => {
    it('is in full mode', () => {
      const wrapper = mount(
        <Article title={titleText} content={contentText} />
      );
      expect(wrapper.prop('preview')).toBeFalsy();
    });

    it('must have content', () => {
      spyOn(console, 'error');
      const wrapper = mount(
        <ErrorBoundary>
          <Article title={titleText} />
        </ErrorBoundary>
      );
      expect(wrapper.state()).toHaveProperty('hasError', true);
    });

    it('renders its content', () => {
      const wrapper = mount(
        <Article title={titleText} content={contentText} />
      );
      const text = <section>{contentText}</section>;
      expect(wrapper).toContainReact(text);
    });

    it('does not render its synopsis', () => {
      const wrapper = mount(
        <Article
          title={titleText}
          synopsis={synopsisText}
          content={contentText}
        />
      );
      const text = <blockquote>{synopsisText}</blockquote>;
      expect(wrapper).not.toContainReact(text);
    });
  });
});
