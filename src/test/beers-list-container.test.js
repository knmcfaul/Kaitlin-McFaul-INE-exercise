/* global jest, describe, it, beforeEach, expect */
import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Spin from 'antd/lib/spin';

import BeersListContainer from '../Containers/BeersListContainer';
import BeersList from "../Components/BeersList";

import * as MOCKDATA from './mockdata';

configure({ adapter: new Adapter() });

beforeEach(() => {
  jest.clearAllMocks();
});

describe('BeersListContainer', function() {
  it('renders successfully', function() {
    const wrapper = shallow(<BeersListContainer/>);
    wrapper.setState({
      beers: MOCKDATA,
      isLoading: false
    });
    setImmediate(() => {
      expect(wrapper.find(BeersList)).toHaveLength(1);
    });
  });
  it('shows spinner when state is loading', function () {
    const wrapper = shallow(<BeersListContainer/>);
    wrapper.setState({ isLoading: true });
    expect(wrapper.find(BeersList)).toHaveLength(0);
    expect(wrapper.find(Spin)).toHaveLength(1);
  });
  it('renders empty state when fetch does not return', function () {
    const wrapper = shallow(<BeersListContainer/>);
    wrapper.setState({
      beers: null,
      isLoading: false
    });
    setImmediate(() => {
      expect(wrapper.find(BeersList)).toHaveLength(0);
      expect(wrapper.contains(<h3>No beers found. Please check the server status.</h3>)).toEqual(true);
    });
  });
});