import React, { Component, PropTypes } from 'react';
import { Table, Column, Cell } from 'fixed-data-table-2';
import _ from 'underscore';

// import '../dist/fixed-data-table.css';
// import '../dist/agr.css';

import { ASC, DESC, NONE } from './constants';
import Header from './components/Header';
import Download from './components/Download';
import Filter from './components/ColumnFilter';
import Dimensions from 'react-dimensions';
import debug from 'debug';

class FlyBaseDataGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortDir: this.initSortCols(),
      items: props.data,
      filter: '',
    };
    this.handleSort   = this.handleSort.bind(this);
    this.handleColumnFilter = this.handleColumnFilter.bind(this);
  }

  initSortCols() {
    const sortCols = {};
    this.props.columns.forEach((col) => sortCols[col.id] = NONE);
    return sortCols;
  }
  
  getColumnText(columnId) {
    const columnDef = _.find(this.props.columns, c => c.id === columnId);
    return (columnDef && columnDef.getText) || (v => v);
  }

  handleColumnFilter(e, column){
    const getText = this.getColumnText(column);
    //  reset all column filter boxes to "" on focus change
    //  reset grid to default items
    const filterText = e.target.value.toLowerCase(); 
    const temp = this.props.data;
    const isMatch = (item) => {
      const value = item[column];
      return (getText(value).toString().toLowerCase().indexOf(filterText) != -1);
    }

    const filteredItems = temp.filter(item => isMatch(item));
    if (!filteredItems.length) {
      filteredItems.push({ id: "", name: "", address: "", state: "", zip: ""});
    }

    this.setState({
      items: filteredItems,
      filter: filterText
    });
  }

  handleSort(column) {
    let current = this.state.sortDir;
    const sortDir = current[column];
    const getText = this.getColumnText(column);

    let sortedItems = _.sortBy(this.state.items, row => getText(row[column]));
    if (sortDir === ASC) {
      sortedItems.reverse();
    }

    // Reset all column sorts before we set the new sort direction below.
    current = this.initSortCols();

    // Reverse sort
    if (sortDir === ASC) {
      current[column] = DESC;
    } else {
      current[column] = ASC;
    }

    // Set state with new sorted order.
    this.setState({
      sortDir: current,
      items: sortedItems,
    });
 }

  render() {
    const { columns, data, showColumnFilter, downloadButton, maxHeight, ...props } = this.props;
    const { items } = this.state;

    return (
      <div>

          <Table maxHeight={maxHeight} rowsCount={items.length} {...props}>
            { columns
              .filter(column => !column.hidden)
              .map((column) =>
                     <Column
                       width={200}
                       allowCellsRecycling={false}
                       key={column.id}
                       flexGrow={1}
                       columnKey={column.id}

                       header={
                         <Header
                           filterText={this.state.filter}
                           displayFilter={showColumnFilter}
                           onChange={this.handleColumnFilter}
                           onClick={this.handleSort}
                           sortDir={this.state.sortDir[column.id]}
                          >

                           {column.name}

                         </Header>
                       }

                       cell={
                         (props) => {
                           const row = items[props.rowIndex];
                           let text = row[column.id];
                           if (column.render) {
                             text = column.render(text, row, column.id);
                           }
                           return (
                             <Cell {...props}>
                               {text}
                             </Cell>
                           )
                         }
                       }
                     />
                    )
            }
          </Table>

        { 
          downloadButton.map((type) => <Download columns={columns} className={'btn btn-default'} key={type} type={type} items={items} /> ) 
        }

      </div>
    );
  }
}

// See https://facebook.github.io/react/docs/typechecking-with-proptypes.html
FlyBaseDataGrid.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      getText: PropTypes.func,
      hidden: PropTypes.bool,
      id: PropTypes.string,
      name: PropTypes.string,
      render: PropTypes.func,
  }),
  ).isRequired,
  rowHeight: PropTypes.number,
  headerHeight: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  maxHeight: PropTypes.number,
  showFilter: PropTypes.bool,
};

FlyBaseDataGrid.defaultProps = {
  rowHeight: 50,
  headerHeight: 50,
  width: 1000,
  showFilter: false,
};

export default FlyBaseDataGrid;
