import React, { Component, PropTypes } from 'react';
import { Table, Column, Cell } from 'fixed-data-table-2';
import _ from 'underscore';

// import '../dist/fixed-data-table.css';
// import '../dist/agr.css';

import { ASC, DESC, NONE } from './constants';
import Header from './components/Header';
import Download from './components/Download';
import Filter from './components/ColumnFilter';
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
    this.helper = this.helper.bind(this);
  }

  initSortCols() {
    const sortCols = {};
    this.props.columns.forEach((col) => sortCols[col.id] = NONE);
    return sortCols;
  }

   // *************************************************************

  handleColumnFilter(e, column){

      //  reset all column filter boxes to "" on focus change
      //  reset grid to default items
     const filterText = e.target.value.toLowerCase(); 

      const temp = this.props.data;

      var value;
      function isMatch(item){

         value = item[column];

        return (value.toString().toLowerCase().indexOf(filterText)!=-1);

      }

      const filteredItems = temp.filter((item) => { return isMatch(item); });

      if (!filteredItems.length){
         filteredItems.push({ id: "", name: "", address: "", state: "", zip: ""});
      }

     this.setState({
       items: filteredItems,
       filter: filterText
      });
  }

  // *************************************************************


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

  // show the filter for the column?
  helper(){
    if(column.id=='name'){
      return true;
    }
    else{
      return false;
    }   
 }

  render() {
    const { columns, data, showDownloadButton, showFilter, ...props } = this.props;
    const { items } = this.state;


    return (
      <div>

        {
          showDownloadButton && <Download items={items} />
        } 

          <Table height={1000} rowsCount={items.length} {...props}>

            {columns.map((column) =>
                     <Column
                      
                       width={200}
                       allowCellsRecycling={false}
                       key={column.id}

                       columnKey={column.id}

                       header={
                         <Header
                           filterText={this.state.filter}
                           displayFilter={this.helper}
                           onChange={this.handleColumnFilter}
                           onClick={this.handleSort}
                           sortDir={this.state.sortDir[column.id]}
                          >

                           {column.name}

                         </Header>
                       }

                       cell={props => (
                         <Cell {...props}>
                           {items[props.rowIndex][column.id]}
                         </Cell>
                       )
                       }
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
  rowHeight: PropTypes.number,
  headerHeight: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  showFilter: PropTypes.bool,
  showDownloadButton: PropTypes.bool,
};

FlyBaseDataGrid.defaultProps = {
  rowHeight: 50,
  headerHeight: 50,
  width: 1000,
  height: 500,
  showFilter: false,
  showDownloadButton: false,
};

export default FlyBaseDataGrid;
