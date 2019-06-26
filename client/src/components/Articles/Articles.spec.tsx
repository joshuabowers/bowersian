import React from 'react';
import { shallow } from 'enzyme';
import { Articles } from './Articles.component';

describe(Articles, () => {
  it('renders without crashing', () => {
    shallow(<Articles>Test</Articles>);
  });
});
