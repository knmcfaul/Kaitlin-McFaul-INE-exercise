/* global jest, describe, it, expect */
import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import App from '../App';
import BeersListContainer from "../Containers/BeersListContainer";

configure({ adapter: new Adapter() });

function givenFetchReturns() {
  BeersListContainer.getData = jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => {}
    })
  );
}

describe('App', function () {
  it('renders successfully', function () {
    const wrapper = shallow(<App/>);
    const welcome = <h2>Beer Explorer</h2>;
    expect(wrapper.contains(welcome)).toEqual(true);
  });
  it('renders beer list at path /', function () {
    givenFetchReturns();
    const wrapper = mount(<App/>);
    expect(wrapper.find(BeersListContainer)).toHaveLength(1);
  });
});
