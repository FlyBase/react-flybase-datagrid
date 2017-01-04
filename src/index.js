import React, { Component, PropTypes } from 'react';
import FixedDataTable, { Table, Column, Cell } from 'fixed-data-table';

import { ASC, DESC, NONE } from './constants';
import Header from './components/Header';

class FlyBaseDataGrid extends Component {
  constructor(props) {
    super(props);

    const sortCols = {};
    this.props.columns.forEach((col) => sortCols[col.id] = NONE);

    this.state = {
      sortDir: sortCols,
    };
    this.handleSort = this.handleSort.bind(this);
  }

  handleSort(column) {
    const current = this.state.sortDir;
    const sortDir = current[column];

    this.props.columns.forEach((col) => current[col.id] = NONE);
    if (sortDir === ASC) {
      current[column] = DESC;
    }
    else {
      current[column] = ASC;
    }
    
    this.setState({sortDir: current});
  }

  render() {
    const { data, columns, ...props } = this.props;
    return (
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
                         {data[props.rowIndex][column.id]}
                       </Cell>
                     )
                     }
                     width={200}
                   />
                  )
      }
      </Table>
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
};

FlyBaseDataGrid.defaultProps = {
  rowHeight: 50,
  headerHeight: 50,
  width: 1000,
  height: 500,
};

export default FlyBaseDataGrid;
