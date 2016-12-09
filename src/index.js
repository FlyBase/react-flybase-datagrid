import React from 'react'

import {Table, Column, Cell} from 'fixed-data-table';
import './dist/fixed-data-table.css';
// var partial = require('./lib/partial')
var SortTypes = {
  ASC: 'ASC',
  DESC: 'DESC',
};

var MovieTable = React.createClass({
  getInitialState() {
    this._download = this._download.bind(this)

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

_download(event){

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
      var fileDownload = require('react-file-download');
    
    if (this.state.sortDir !== null){
      sortDirArrow = this.state.sortDir === SortTypes.DESC ? ' ↓' : ' ↑';
    }
    
    return (
      <div>
       
        <label>Filter by <input onChange={this._onFilterChange} /></label>
        <br/><br/>

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

export default MovieTable;