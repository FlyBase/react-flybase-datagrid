"use strict";

var FixedDataTable = require('fixed-data-table');

const React = require('react');
const {Table, Column, Cell} = FixedDataTable;

var SortTypes = {
  ASC: 'ASC',
  DESC: 'DESC',
};

function reverseSortDirection(sortDir) {
  return sortDir === SortTypes.DESC ? SortTypes.ASC : SortTypes.DESC;
}

class SortHeaderCell extends React.Component {
  constructor(props) {
    super(props);

    this._onSortChange = this._onSortChange.bind(this);
  }

  render() {
    var {sortDir, children, ...props} = this.props;
    return (
      <Cell {...props}>
        <a onClick={this._onSortChange}>
          {children} {sortDir ? (sortDir === SortTypes.DESC ? '↓' : '↑') : ''}
        </a>
      </Cell>
    );
  }

  _onSortChange(e) {
    e.preventDefault();

    if (this.props.onSortChange) {
      this.props.onSortChange(
        this.props.columnKey,
        this.props.sortDir ?
          reverseSortDirection(this.props.sortDir) :
          SortTypes.DESC
      );
    }
  }
}

class DataListWrapper {
  constructor(indexMap, data) {
    this._indexMap = indexMap;
    this._data = data;
  }

  getSize() {
    return this._indexMap.length;
  }

  getObjectAt(index) {
    return this._data.getObjectAt(
      this._indexMap[index],
    );
  }
}

const TextCell = ({rowIndex, data, field, ...props}) => (
  <Cell {...props}>
    {data[rowIndex][field]}
  </Cell>
);

class MyTable extends React.Component {
  constructor(props) {
    super(props);

    this._defaultSortIndexes = [];
    this._dataList = new DataListWrapper(this._defaultSortIndexes, this.props.data);

    var size = this._dataList.getSize();
    for (var index = 0; index < size; index++) {
      this._defaultSortIndexes.push(index);
    }

    this.state = {
      myTableData: this.props.data,
      sortedDataList: this._dataList,
      colSortDirs: {},
    };

    this._onSortChange = this._onSortChange.bind(this);
    this.download = this.download.bind(this);
  }

  _onSortChange(columnKey, sortDir) {
    var sortIndexes = this._defaultSortIndexes.slice();

    sortIndexes.sort((indexA, indexB) => {
      var valueA = this._dataList.getObjectAt(indexA)[columnKey];
      var valueB = this._dataList.getObjectAt(indexB)[columnKey];
      var sortVal = 0;
      if (valueA > valueB) {
        sortVal = 1;
      }
      if (valueA < valueB) {
        sortVal = -1;
      }
      if (sortVal !== 0 && sortDir === SortTypes.ASC) {
        sortVal = sortVal * -1;
      }

      return sortVal;
    });

    this.setState({
      sortedDataList: null,
      colSortDirs: {
        [columnKey]: sortDir,
      },
    });
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
    var data = this.toCSV(this.state.myTableData);
    a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(data);
    a.click();
  }

  render() {
    var {sortedDataList, colSortDirs} = this.state;

    const columns = this.props.columns.map((column) =>
      <Column
        key={column.id}
        columnKey={column.id} 
        header={
          <SortHeaderCell
            onSortChange={this._onSortChange}
            sortDir={column.id}>
            {column.name}
          </SortHeaderCell>
        }
        cell={
          <TextCell
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
          height={500}
          {...this.props}>

            {columns}

        </Table>
      </div>
    );
  }
}

module.exports = MyTable;