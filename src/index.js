import React, { Component, PropTypes } from 'react';
import FixedDataTable, { Table, Column, Cell } from 'fixed-data-table';
import _ from 'underscore';

import { ASC, DESC, NONE } from './constants';
import Header from './components/Header';
import Download from './components/Download';
import Filter from './components/Filter';

class FlyBaseDataGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortDir: this.initSortCols(),
      items: props.data,
      filter: '',
    };
    this.handleSort   = this.handleSort.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  initSortCols() {
    const sortCols = {};
    this.props.columns.forEach((col) => sortCols[col.id] = NONE);
    return sortCols;
  }

  handleFilter(e) {
    
    const filterText = e.target.value.toLowerCase();
    const temp = this.props.data;
  
    // Implement filter logic here by expanding the callback inside the filter.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
 
    function isRowMatch(item){

      for(var key in item){
        var value = item[key];

        if (value.toString().toLowerCase().indexOf(filterText)!=-1){
          return true;
        }
      }
        return false;
    }

    const filteredItems = temp.filter((item) => { return isRowMatch(item); });

    if (!filteredItems.length){
       filteredItems.push({ id: "", name: "", address: "", state: "", zip: ""});
    }

    // console.debug(filterText);
    // console.debug(filteredItems);

    this.setState({ 
      items: filteredItems,
      filter: filterText
    });
  }

  handleSort(column) {
    let current = this.state.sortDir;
    const sortDir = current[column];

    let sortedItems = _.sortBy(this.state.items, column);
    if ( sortDir === ASC) {
      sortedItems.reverse();
    }

    // Reset all column sorts before we set the new sort direction below.
    current = this.initSortCols();

    // Reverse sort
    if (sortDir === ASC) {
      current[column] = DESC;
    }
    else {
      current[column] = ASC;
    }
    
    // Set state with new sorted order.
    this.setState({
      sortDir: current,
      items: sortedItems,
    });
  }

  render() {
    const { data, columns, showFilter, ...props } = this.props;
    const { items } = this.state;

    return (
      <div>
      {/*
         Add filter box here.  Start with one input box that filters all columns.
         The filter box should be a custom component.
         e.g.
         { showFilter && <Filter value={this.state.filter} onChange={this.handleFilter} /> }
      */}

        <Download items={items} type={"csv"}></Download>

        <Filter value={this.state.filter} onChange={this.handleFilter} />

     
          <Table {...props}>
            {columns.map((column) => 
                     <Column
                       key={column.id}
                       columnKey={column.id} 
                       header={
                         <Header
                           onClick={this.handleSort}
                           sortDir={this.state.sortDir[column.id]}>

                           {column.name}
                         
                         </Header>
                       }
                     
                       cell={props => (
                         <Cell {...props}>
                           {items[props.rowIndex][column.id]}
                         </Cell>
                       )
                       }
                       
                       width={200}
                     />
                    )
            }
          </Table> 
      
      </div>
    );
  }
}

// See https://facebook.github.io/react/docs/typechecking-with-proptypes.html
FlyBaseDataGrid.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
  }),
  ).isRequired,
  rowsCount: PropTypes.number.isRequired,
  rowHeight: PropTypes.number,
  headerHeight: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  showFilter: PropTypes.bool,
};

FlyBaseDataGrid.defaultProps = {
  rowHeight: 50,
  headerHeight: 50,
  width: 1000,
  height: 500,
  showFilter: false,
};

export default FlyBaseDataGrid;
