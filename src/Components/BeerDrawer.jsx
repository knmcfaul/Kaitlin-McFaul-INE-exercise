import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Drawer from 'antd/lib/drawer';
import Avatar from 'antd/lib/avatar';
import Button from 'antd/lib/button';
import Table from 'antd/lib/table';
import Alert from 'antd/lib/alert';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import '../styles/beer-drawer.css';

const { Column } = Table;

export default class BeerDrawer extends Component {
  render() {
    const { beer, onClose, onChildClose, visible, childVisible, showChild } = this.props;

    const beerName = (beer) ? beer.name : '';
    const beerTagLine = (beer) ? beer.tagline : '';
    const beerAuthor = (beer) ? beer.contributed_by : '';

    return (
      <Drawer
        title={<h2>
          {beerName}
          <div className="beer-tagline">{`"${beerTagLine}"`}</div>
          <div className="beer-author">Contributed by {beerAuthor}</div>
        </h2>}
        placement='right'
        closable={false}
        onClose={onClose}
        visible={visible}
        width="50%"
        className='drawer-container'
      >
        {!beer && <p>Error. No beer data found.</p>}
        {beer &&
          <React.Fragment>
            <div className="beer-details">
              <p>{beer.description}</p>
              <p>{beer.boil_volume.value} {beer.boil_volume.unit} boil volume results in {beer.volume.value} {beer.volume.unit} total volume.</p>
              <p>First brewed on {beer.first_brewed}.</p>
              <br />
              <h2>Stats:</h2>
              <div className="inline-pair">
                <h3>Attenuation Level</h3>
                <p>{beer.attenuation_level || 'N/A'}</p>
              </div>
              <br />
              <Row>
                <Col span={8} className="centered-badge">
                  <h3 className="centered-title">ABV</h3>
                  <Avatar size="large" shape="square">{beer.abv}</Avatar>
                </Col>
                <Col span={8} className="centered-badge">
                  <h3 className="centered-title">pH</h3>
                  <Avatar size="large" shape="square">{beer.ph || 'N/A'}</Avatar>
                </Col>
                <Col span={8} className="centered-badge">
                  <h3 className="centered-title">IBU</h3>
                  <Avatar size="large" shape="square">{beer.ibu || 'N/A'}</Avatar>
                </Col>
              </Row>
              <br />
              <br />
              <Row>
                <Col span={11}>
                  <Col span={24}>
                    <Row className="centered-title">
                      <Col span={12} className="shaded-top"><h3>EBC</h3></Col>
                      <Col span={12} className="shaded-border"><h3 className="small-text">{beer.ebc || 'N/A'}</h3></Col>
                    </Row>
                    <Row className="centered-title">
                      <Col span={12} className="shaded-bottom"><h3>SRM</h3></Col>
                      <Col span={12}><h3 className="small-text">{beer.srm || 'N/A'}</h3></Col>
                    </Row>
                  </Col>
                </Col>
                <Col span={11} offset={2}>
                  <Row className="centered-title">
                    <Col span={12} className="shaded-top"><h3>Target OG</h3></Col>
                    <Col span={12} className="shaded-border"><h3 className="small-text">{beer.target_og || 'N/A'}</h3></Col>
                  </Row>
                  <Row className="centered-title">
                    <Col span={12} className="shaded-bottom"><h3>Target FG</h3></Col>
                    <Col span={12}><h3 className="small-text">{beer.target_fg || 'N/A'}</h3></Col>
                  </Row>
                </Col>
              </Row>
              <br />
              <br />
              <h3>Pairs well with:</h3>
              <ul>
                {beer.food_pairing.map((pairing) => <li key={pairing}>{pairing}</li>)}
              </ul>
              <br />
              <Button type="primary" onClick={showChild}>Method & Ingredients!</Button>
            </div>
            <Drawer
              title={<h2>{beerName} <p className="method-subheader">Method & Ingredients</p></h2>}
              closable={false}
              onClose={onChildClose}
              visible={childVisible}
              width="50%"
              className="drawer-container"
            >
              <Alert message={<div><h3>Brewer&apos;s Tips!</h3>{beer.brewers_tips}</div>} type="info" />
              <br />
              <h2>Ingredients</h2>
              <div className="ingredient-container inline-pair">
                <h3>Yeast</h3>
                <p>{beer.ingredients.yeast}</p>
              </div>
              <div className="ingredient-container">
                <h3>Hops</h3>
                <Table
                  dataSource={beer.ingredients.hops}
                  pagination={false}
                  rowKey={(row) => `${row.name}_${row.add}`}
                  size="small"
                >
                  <Column
                    title="Name"
                    dataIndex="name"
                  />
                  <Column
                    title="Timing"
                    dataIndex="add"
                  />
                  <Column
                    title="Amount"
                    dataIndex="amount"
                    render={(amount) => `${amount.value} ${amount.unit}`}
                  />
                  <Column
                    title="Attribute"
                    dataIndex="attribute"
                  />
                </Table>
              </div>
              <div className="ingredient-container">
                <h3>Malt</h3>
                <Table
                  dataSource={beer.ingredients.malt}
                  pagination={false}
                  rowKey="name"
                  size="small"
                >
                  <Column
                    title="Name"
                    dataIndex="name"
                  />
                  <Column
                    title="Amount"
                    dataIndex="amount"
                    render={(amount) => `${amount.value} ${amount.unit}`}
                  />
                </Table>
              </div>
              <br />
              <h2>Method</h2>
              <div className="inline-pair">
                <h3>Fermentation Temp</h3>
                <p>{beer.method.fermentation.temp.value}&deg; {beer.method.fermentation.temp.unit}</p>
              </div>
              <h3>Mash Temp(s)</h3>
              <ol>
                {beer.method.mash_temp.map((mash) =>
                  <li key={`${mash.temp.value}-${mash.duration}`}>
                    {mash.temp.value}&deg; {mash.temp.unit} {mash.duration && `for ${mash.duration} seconds`}
                  </li>)}
              </ol>
              {beer.method.twist && <div><h3>Twist!</h3><p>{beer.method.twist}</p></div>}
            </Drawer>
          </React.Fragment>
        }
      </Drawer>
    );
  }
}

BeerDrawer.propTypes = {
  beer: PropTypes.shape({
    abv: PropTypes.number,
    attenuation_level: PropTypes.number,
    boil_volume: PropTypes.shape({
      value: PropTypes.number,
      unit: PropTypes.string
    }),
    brewers_tips: PropTypes.string,
    contributed_by: PropTypes.string,
    description: PropTypes.string,
    ebc: PropTypes.number,
    first_brewed: PropTypes.string,
    food_pairing: PropTypes.arrayOf(PropTypes.string),
    ibu: PropTypes.number,
    id: PropTypes.number,
    image_url: PropTypes.string,
    ingredients: PropTypes.shape({
      malt: PropTypes.arrayOf(PropTypes.shape({
        amount: PropTypes.shape({
          value: PropTypes.number,
          unit: PropTypes.string
        }),
        name: PropTypes.string
      })),
      hops: PropTypes.arrayOf(PropTypes.shape({
        add: PropTypes.string,
        amount: PropTypes.shape({
          value: PropTypes.number,
          unit: PropTypes.string
        }),
        attribute: PropTypes.string,
        name: PropTypes.string
      })),
      yeast: PropTypes.string
    }),
    method: PropTypes.shape({
      fermentation: PropTypes.shape({
        temp: PropTypes.shape({
          value: PropTypes.number,
          unit: PropTypes.string
        })
      }),
      mash_temp: PropTypes.arrayOf(PropTypes.shape({
        temp: PropTypes.shape({
          value: PropTypes.number,
          unit: PropTypes.string
        }),
        duration: PropTypes.number
      })),
      twist: PropTypes.string
    }),
    name: PropTypes.string,
    ph: PropTypes.number,
    srm: PropTypes.number,
    tagline: PropTypes.string,
    target_fg: PropTypes.number,
    target_og: PropTypes.number,
    volume: PropTypes.shape({
      value: PropTypes.number,
      unit: PropTypes.string
    })
  }),
  onClose: PropTypes.func,
  onChildClose: PropTypes.func,
  visible: PropTypes.bool,
  childVisible: PropTypes.bool,
  showChild: PropTypes.func
};
