import React from 'react';
import { shallow } from 'enzyme';
import { Article } from './Article.component';

describe(Article, () => {
  it('renders without crashing', () => {
    shallow(<Article />);
  });
});
