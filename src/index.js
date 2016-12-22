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

    toCSV(objArray){
      var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
      var str = '';

      for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
          if (line != '') line += ','

            line += array[i][index];
        }

        str += line + '\r\n';
      }
      str = Object.keys(objArray[0]) + '\n' + str;
      return str;
    }


    download(){
      const a = document.createElement('a');
      a.textContent = 'download';
      a.download = 'filename';

      var bomCode = '%EF%BB%BF';  
      
      var array = [];
      array.push({'a':'b'});
      var data = this.toCSV(array);
      // var data = 'a,b,c,d';

      a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(data);
      a.click();
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

        <button onClick={this.download}> Download </button>

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