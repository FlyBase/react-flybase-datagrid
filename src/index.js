const React = require('react');
const {Table, Column, Cell} = require('fixed-data-table');

class MyColumnCell extends React.Component {
  render() {
    const {headers, rowIndex, field, data, ...props} = this.props;
    return (
      <Cell {...props}>
      {data[rowIndex][field]}
      </Cell>
      );
    }
  }

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

  class MyLinkCell extends React.Component {
    render() {
      const {rowIndex, field, data, ...props} = this.props;
      const link = data[rowIndex][field];
      return (
      <Cell {...props}>
      <a href={link}>{link}</a>
      </Cell>
      );
    }
  }

  class MyTable extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        myTableData: this.props.data
      };
    }

    render() {

      const columns = this.props.columns.map((column) =>
      <Column
      header={<Cell>{column.name}</Cell>}
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
      <Table
        rowsCount={this.state.myTableData.length}
        rowHeight={50}
        headerHeight={50}
        width={1000}
        height={500}>

        {columns}
        
      </Table>
      );
    }
  }

  export default MyTable;