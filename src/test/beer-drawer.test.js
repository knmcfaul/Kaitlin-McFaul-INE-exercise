/* global jest, describe, it, beforeEach, expect */
import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import BeerDrawer from '../Components/BeerDrawer';

import * as MOCKDATA from './mockdata';

configure({ adapter: new Adapter() });

beforeEach(() => {
  jest.clearAllMocks();
});

describe('BeersListContainer', function() {
  it('renders successfully', function() {
    const wrapper = shallow(<BeerDrawer visible={true} beer={MOCKDATA[0]} childVisible={false}/>);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders child successfully', function() {
    const wrapper = shallow(<BeerDrawer visible={true} beer={MOCKDATA[0]} childVisible={true}/>);
    expect(wrapper).toMatchSnapshot();
  });
});