const React = require('react');
const {Table, Column, Cell} = require('fixed-data-table');

var SortTypes = {
  ASC: 'ASC',
  DESC: 'DESC',
};

class MyTextCell extends React.Component {
  render() {
    const {rowIndex, field, data, ...props} = this.props;
    return (
      <Cell {...props}>
      {data[rowIndex][field]}
      </Cell>
      );
  }
}

class MyTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      myTableData: this.props.data,
      };
    }

    render() {

      const columns = this.props.columns.map((column) =>
        <Column
        key={column.id} 
        header={column.name}
        cell={
          <MyTextCell
          data={this.state.myTableData}
          field={column.id}
          />
        }
        width={200}
        />
        );

      return (
        <div>
       

        <Table
        rowsCount={this.state.myTableData.length}
        rowHeight={50}
        headerHeight={50}
        width={1000}
        height={500}>

        {columns}
        
        </Table>
        </div>
        );
    }
  }

  export default MyTable;