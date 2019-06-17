import React from 'react';
import { shallow } from 'enzyme';
import { Header } from './Header.component';

describe(Header, () => {
  it('renders without crashing', () => {
    shallow(<Header title="Articles" />);
  });

  it('renders the title', () => {
    const title = 'Articles';
    const wrapper = shallow(<Header title={title} />);
    const header = <h1>{title}</h1>;

    expect(wrapper).toContainReact(header);
  });
});
