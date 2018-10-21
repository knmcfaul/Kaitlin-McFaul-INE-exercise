import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Table from 'antd/lib/table';
import Icon from 'antd/lib/icon';

const { Column } = Table;

export default class BeersList extends Component {
  render() {
    const { beers, onRow, sortFunc, activeSort, activeSortOrder } = this.props;

    return (
      <Table
        dataSource={beers}
        pagination={false}
        rowKey="id"
        onRow={(row) => {
          return {
            onClick: () => onRow(row)
          };
        }}
      >
        <Column
          title={<div>Name {(activeSort === 'name') ?
            ((activeSortOrder) ?
              <Icon type="caret-up" theme="outlined" />
              : <Icon type="caret-down" theme="outlined" /> )
            : ''}</div>}
          dataIndex="name"
          width={200}
          onHeaderCell={(cell) => {
            return {
              onClick: () => sortFunc(cell.key, 'string')
            };
          }}
        />
        <Column
          title={<div>ABV {(activeSort === 'abv') ?
            ((activeSortOrder) ?
              <Icon type="caret-up" theme="outlined" />
              : <Icon type="caret-down" theme="outlined" /> )
            : ''}</div>}
          dataIndex="abv"
          onHeaderCell={(cell) => {
            return {
              onClick: () => sortFunc(cell.key, 'num')
            };
          }}
        />
        <Column
          title={<div>Attenuation Level {(activeSort === 'attenuation_level') ?
            ((activeSortOrder) ?
              <Icon type="caret-up" theme="outlined" />
              : <Icon type="caret-down" theme="outlined" /> )
            : ''}</div>}
          dataIndex="attenuation_level"
          onHeaderCell={(cell) => {
            return {
              onClick: () => sortFunc(cell.key, 'num')
            };
          }}
        />
        <Column
          title={<div>pH {(activeSort === 'ph') ?
            ((activeSortOrder) ?
              <Icon type="caret-up" theme="outlined" />
              : <Icon type="caret-down" theme="outlined" /> )
            : ''}</div>}
          dataIndex="ph"
          onHeaderCell={(cell) => {
            return {
              onClick: () => sortFunc(cell.key, 'num')
            };
          }}
        />
        <Column
          title={<div>IBU {(activeSort === 'ibu') ?
            ((activeSortOrder) ?
              <Icon type="caret-up" theme="outlined" />
              : <Icon type="caret-down" theme="outlined" /> )
            : ''}</div>}
          dataIndex="ibu"
          onHeaderCell={(cell) => {
            return {
              onClick: () => sortFunc(cell.key, 'num')
            };
          }}
        />
        <Column
          title={<div>EBC {(activeSort === 'ebc') ?
            ((activeSortOrder) ?
              <Icon type="caret-up" theme="outlined" />
              : <Icon type="caret-down" theme="outlined" /> )
            : ''}</div>}
          dataIndex="ebc"
          onHeaderCell={(cell) => {
            return {
              onClick: () => sortFunc(cell.key, 'num')
            };
          }}
        />
        <Column
          title={<div>SRM {(activeSort === 'srm') ?
            ((activeSortOrder) ?
              <Icon type="caret-up" theme="outlined" />
              : <Icon type="caret-down" theme="outlined" /> )
            : ''}</div>}
          dataIndex="srm"
          onHeaderCell={(cell) => {
            return {
              onClick: () => sortFunc(cell.key, 'num')
            };
          }}
        />
        <Column
          title={<div>Target OG {(activeSort === 'target_og') ?
            ((activeSortOrder) ?
              <Icon type="caret-up" theme="outlined" />
              : <Icon type="caret-down" theme="outlined" /> )
            : ''}</div>}
          dataIndex="target_og"
          onHeaderCell={(cell) => {
            return {
              onClick: () => sortFunc(cell.key, 'num')
            };
          }}
        />
        <Column
          title={<div>Target FG {(activeSort === 'target_fg') ?
            ((activeSortOrder) ?
              <Icon type="caret-up" theme="outlined" />
              : <Icon type="caret-down" theme="outlined" /> )
            : ''}</div>}
          dataIndex="target_fg"
          onHeaderCell={(cell) => {
            return {
              onClick: () => sortFunc(cell.key, 'num')
            };
          }}
        />
        <Column
          title={<div>Contributor {(activeSort === 'contributed_by') ?
            ((activeSortOrder) ?
              <Icon type="caret-up" theme="outlined" />
              : <Icon type="caret-down" theme="outlined" /> )
            : ''}</div>}
          dataIndex="contributed_by"
          onHeaderCell={(cell) => {
            return {
              onClick: () => sortFunc(cell.key, 'string')
            };
          }}
        />
      </Table>
    );
  }
}

BeersList.propTypes = {
  beers: PropTypes.arrayOf(PropTypes.any),
  onRow: PropTypes.func,
  sortFunc: PropTypes.func,
  activeSort: PropTypes.string,
  activeSortOrder: PropTypes.bool
};
