import React, { Component } from 'react';
import Spin from 'antd/lib/spin';
import Pagination from 'antd/lib/pagination';

import BeersList from '../Components/BeersList';
import BeerDrawer from '../Components/BeerDrawer';

import '../styles/beer-list-container.css';

export default class BeersListContainer extends Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.sortData = this.sortData.bind(this);
    this.changePage = this.changePage.bind(this);
    this.showDrawer = this.showDrawer.bind(this);
    this.showMethodDrawer = this.showMethodDrawer.bind(this);
    this.hideDrawer = this.hideDrawer.bind(this);
    this.hideMethodDrawer = this.hideMethodDrawer.bind(this);
    this.state = {
      beers: null,
      currentBeers: null,
      isLoading: true,
      currentPage: 1,
      drawerVisible: false,
      methodDrawerVisible: false,
      drawerData: null,
      activeSortKey: '',
      activeSortAscending: true
    };
  }

  getData() {
    let tempData = [];
    fetch('https://api.punkapi.com/v2/beers?page=1&per_page=80')
      .then(response => response.json())
      .catch(e => {
        console.log('fetch failed with error: ', e);
        this.setState({ beers: null, isLoading: false });
      })
      .then(data => {
        tempData = tempData.concat(data);
        fetch('https://api.punkapi.com/v2/beers?page=2&per_page=80')
          .then(response => response.json())
          .catch(e => {
            console.log('fetch failed with error: ', e);
            this.setState({ beers: null, isLoading: false });
          })
          .then(data => {
            tempData = tempData.concat(data);
            fetch('https://api.punkapi.com/v2/beers?page=3&per_page=80')
              .then(response => response.json())
              .catch(e => {
                console.log('fetch failed with error: ', e);
                this.setState({ beers: null, isLoading: false });
              })
              .then(data => {
                tempData = tempData.concat(data);
                this.setState({
                  beers: tempData
                });
                this.sortData('name', 'string');
              })
              .catch(e => {
                console.log('json data parse failed with error: ', e);
                this.setState({ beers: null, isLoading: false });
              });
          })
          .catch(e => {
            console.log('json data parse failed with error: ', e);
            this.setState({ beers: null, isLoading: false });
          });
      })
      .catch(e => {
        console.log('json data parse failed with error: ', e);
        this.setState({ beers: null, isLoading: false });
      });
  }

  sortData(key, sortType) {
    if (key === this.state.activeSortKey) {
      this.setState({
        beers: this.state.beers.reverse(),
        activeSortAscending: !this.state.activeSortAscending
      });
    } else if (sortType === 'string') {
      this.setState({
        beers: this.state.beers.sort((a, b) => a[key].localeCompare(b[key])),
        activeSortKey: key,
        activeSortAscending: true
      });
    } else {
      this.setState({
        beers: this.state.beers.sort((a, b) => a[key] - (b[key])),
        activeSortKey: key,
        activeSortAscending: true
      });
    }
    this.changePage(1);
  }

  getPage(page) {
    this.setState({ isLoading: true });
    this.setState({
      currentBeers: this.state.beers.slice((page-1)*10, ((page-1)*10)+10),
      isLoading: false
    });
  }

  componentDidMount() {
    this.getData();
  }

  changePage(page) {
    this.getPage(page);
    this.setState({
      currentPage: page
    });
  }

  showDrawer(data) {
    this.setState({
      drawerData: data,
      drawerVisible: true
    });
  }

  showMethodDrawer() {
    this.setState({
      methodDrawerVisible: true
    });
  }

  hideDrawer() {
    this.setState({
      drawerVisible: false
    });
  }

  hideMethodDrawer() {
    this.setState({
      methodDrawerVisible: false
    });
  }

  render() {
    const {
      beers,
      currentBeers,
      isLoading,
      drawerVisible,
      methodDrawerVisible,
      drawerData,
      currentPage,
      activeSortKey,
      activeSortAscending
    } = this.state;

    return (
      <React.Fragment>
        {isLoading && <div className="loading-spinner"><Spin size="large" /></div>}
        {!isLoading && (!beers || beers.length === 0) &&
        <h3>No beers found. Please check the server status.</h3>}
        {!isLoading && beers &&
          <React.Fragment>
            <BeersList
              beers={currentBeers}
              onRow={(row) => this.showDrawer(row)}
              sortFunc={this.sortData}
              activeSort={activeSortKey}
              activeSortOrder={activeSortAscending}
            />
            <br />
            <Pagination current={currentPage} onChange={this.changePage} total={234}/>
          </React.Fragment>}
        <BeerDrawer
          beer={drawerData}
          visible={drawerVisible}
          childVisible={methodDrawerVisible}
          showChild={this.showMethodDrawer}
          onClose={this.hideDrawer}
          onChildClose={this.hideMethodDrawer}
        />
      </React.Fragment>
    );
  }
}