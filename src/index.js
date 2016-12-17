import React, { PropTypes, Component } from 'react';
import {Table, Column, Cell} from 'fixed-data-table';
import 'fixed-data-table/dist/fixed-data-table.css';
import faker from 'faker';

var SortTypes = {
  ASC: 'ASC',
  DESC: 'DESC',
};

var FlybaseTable = React.createClass({
  getInitialState() {
   this._download = this._download.bind(this);

   var list = this.generateList();

   return {
    rows: list,
    filteredRows: null,
    filterBy: null,
    sortBy: 'id',
    sortDir: null,
  };
},

generateList(){
  var items = [];

  for (var i=1; i<=5000; i++){
      
      items.push({ id: i, name: faker.name.findName(), address: faker.address.streetAddress(), state: faker.address.stateAbbr(), zip: faker.address.zipCode()});
    }

    return items;
  },


  getHeader(objArray){
   return Object.keys(objArray[0]);
 },

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
  return str;
},

_download(e){

  console.debug(this.state.rows);

  const a = document.createElement('a');
  a.textContent = 'download';
  a.download = 'filename';

  var bomCode = '%EF%BB%BF';  

  var header = this.getHeader(this.state.rows);
  var data = this.toCSV(this.state.rows);
  var datas = header + '\n' + data;
  a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(datas);
  a.click();

},

componentWillMount() {
  this._filterRowsBy(this.state.filterBy);
},

_rowGetter(rowIndex) {
  return this.state.filteredRows[rowIndex];
},

_filterRowsBy(filterBy) {
  var rows = this.state.rows.slice();        
  var filteredRows = filterBy ? rows.filter(function(row){
    return row.name.toLowerCase().indexOf(filterBy.toLowerCase()) >= 0
  }) : rows;

  this.setState({
    filteredRows,
    filterBy,
  });
},

_onFilterChange(e) {
  this._filterRowsBy(e.target.value);
},

_sortRowsBy(cellDataKey) {
  var sortDir = this.state.sortDir;
  var sortBy = cellDataKey;
  if (sortBy === this.state.sortBy) {
    sortDir = this.state.sortDir === SortTypes.ASC ? SortTypes.DESC : SortTypes.ASC;
  } else {
    sortDir = SortTypes.DESC;
  }

  var rows = this.state.filteredRows.slice();
  rows.sort(function(a, b){
    var sortVal = 0;
    if (a[sortBy] > b[sortBy]) {
      sortVal = 1;
    }
    if (a[sortBy] < b[sortBy]) {
      sortVal = -1;
    }

    if (sortDir === SortTypes.DESC) {
      sortVal = sortVal * -1;
    }

    return sortVal;
  });

  this.setState({
    filteredRows: rows,
    sortBy,
    sortDir,
  });
},

_renderHeader(label, cellDataKey) {
  return (
    <a href="#" onClick={this._sortRowsBy.bind(null, cellDataKey)}>{label}</a>

    );
  },
  
  render() {   
    var sortDirArrow = "";
    
    if (this.state.sortDir !== null){
      sortDirArrow = this.state.sortDir === SortTypes.DESC ? ' ↓' : ' ↑';
    }
    
    return (
    <div>

    <label>Filter by <input onChange={this._onFilterChange} /></label>

    <button onClick={this._download}> Download </button>

    <Table
    rowHeight={30}
    rowGetter={this._rowGetter}
    rowsCount={this.state.filteredRows.length}
    width={700}
    maxHeight={1000}
    headerHeight={40}>

    <Column
    headerRenderer={this._renderHeader}
    label={'id' + (this.state.sortBy === 'id' ? sortDirArrow : '')}
    width={100}
    dataKey="id"
    />

    <Column
    headerRenderer={this._renderHeader}
    label={'Name' + (this.state.sortBy === 'name' ? sortDirArrow : '')}
    width={200}
    dataKey="name"
    />

    <Column
    headerRenderer={this._renderHeader}
    label={'Address' + (this.state.sortBy === 'address' ? sortDirArrow : '')}
    width={200}
    dataKey="address"
    />

    <Column
    headerRenderer={this._renderHeader}
    label={'State' + (this.state.sortBy === 'state' ? sortDirArrow : '')}
    width={100}
    dataKey="state"
    />

    <Column
    headerRenderer={this._renderHeader}
    label={'Zip' + (this.state.sortBy === 'zip' ? sortDirArrow : '')}
    width={100}
    dataKey="zip"
    />

    </Table>
    </div>
    );
  },
});

export default FlybaseTable;
