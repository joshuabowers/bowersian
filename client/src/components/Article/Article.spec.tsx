import React from 'react';
import { mount, shallow } from 'enzyme';
import { Article } from './Article.component';
import { ErrorBoundary } from 'components/ErrorBoundary';

const titleText = 'In the Upside-Down';
const synopsisText = 'Trapped in a hostile realm inimical to life.';
const contentText =
  'The Upside-Down is another dimension, rotted, decarying...';

describe(Article, () => {
  it('renders without crashing', () => {
    shallow(<Article title="In the Upside-Down" />);
  });

  describe('when in preview mode', () => {
    it('is in preview mode', () => {
      const wrapper = mount(
        <Article preview title={titleText} synopsis={synopsisText} />
      );
      expect(wrapper.prop('preview')).toBeTruthy();
    });

    it('must have a synopsis', () => {
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
      const synopsis = <>{synopsisText}</>;
      expect(wrapper).toContainReact(synopsis);
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
      const content = <>{contentText}</>;
      expect(wrapper).not.toContainReact(content);
    });
  });

  describe('when in full mode', () => {
    it('must have content', () => {
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
      const content = <p>{contentText}</p>;
      expect(wrapper).toContainReact(content);
    });

    it('does not render its synopsis', () => {
      const wrapper = mount(
        <Article
          preview
          title={titleText}
          synopsis={synopsisText}
          content={contentText}
        />
      );
      const synopsis = <p>{synopsisText}</p>;
      expect(wrapper).toContainReact(synopsis);
    });
  });
});
