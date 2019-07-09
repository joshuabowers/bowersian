import React from 'react';
import { shallow } from 'enzyme';
import { GemButton } from './GemButton.component';

describe(GemButton, () => {
  it('renders without crashing', () => {
    shallow(<GemButton icon="settings" />);
  });
});
