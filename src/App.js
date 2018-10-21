import React, { Component } from 'react';
import Layout from 'antd/lib/layout';

import BeersListContainer from './Containers/BeersListContainer';

import './styles/app.css';

const { Header, Footer, Content } = Layout;

class App extends Component {
  render() {
    return (
      <div className="app">
        <Layout>
          <Header>
            <div className="header">
              <h2>Beer Explorer</h2>
            </div>
          </Header>
          <Content>
            <BeersListContainer/>
          </Content>
          <Footer>by Kaitlin McFaul, 2018</Footer>
        </Layout>
      </div>
    );
  }
}

export default App;
