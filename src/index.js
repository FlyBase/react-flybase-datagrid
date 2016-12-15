import React, { PropTypes, Component } from 'react';

import {Table, Column, Cell} from 'fixed-data-table';
import 'fixed-data-table/dist/fixed-data-table.css';
import csv from './lib/csv.js';

var SortTypes = {
  ASC: 'ASC',
  DESC: 'DESC',
};

var FlybaseTable = React.createClass({
  getInitialState() {
 this._download = this._download.bind(this);

    return {
      rows: [
        {id:1, title: "Citizen Kane", rank: "1", year: "2000"},
        {id:2, title: "The Shawshank Redemption", rank: "2", year: "1995"},
        {id:3, title: "The Godfather", rank: "3", year: "1971"}
      ],
      filteredRows: null,
      filterBy: null,
      sortBy: 'id',
      sortDir: null,
    };
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
      return row.title.toLowerCase().indexOf(filterBy.toLowerCase()) >= 0
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
          width={450}
          maxHeight={450}
          headerHeight={40}>
          
          <Column
            headerRenderer={this._renderHeader}
            label={'Movie Title' + (this.state.sortBy === 'title' ? sortDirArrow : '')}
            width={270}
            dataKey="title"
          />
          
          <Column
            headerRenderer={this._renderHeader}
            label={'Rank' + (this.state.sortBy === 'rank' ? sortDirArrow : '')}
            width={100}
            dataKey="rank"
          />
          
          <Column
            headerRenderer={this._renderHeader}
            label={'Year' + (this.state.sortBy === 'year' ? sortDirArrow : '')}
            width={80}
            dataKey="year"
          />
          
        </Table>
      </div>
    );
  },
});

export default FlybaseTable;
