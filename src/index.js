/* eslint max-len: 0 */
import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Download from './Download';
import PropTypes from 'prop-types';

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

let order = 'desc';

class BorderlessTable extends Component {

  constructor(props) {
    super(props);

    this.state = {
      extension: 'csv',
      filename: this.props.filename,
      separator: ',',
      isChecked: false,
      data : this.props.data,
      columns : this.props.columns,
      optionsState : 'A'
    }
    this.getFilename = this.getFilename.bind(this);
    this.getTimeStamp = this.getTimeStamp.bind(this);
    this.updateExportOpts = this.updateExportOpts.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  getTimeStamp() {
    var now = new Date();
    var date = [ now.getMonth() + 1, now.getDate(), now.getFullYear() ];
    var time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];
    var suffix = ( time[0] < 12 ) ? "AM" : "PM";

    time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;
    time[0] = time[0] || 12;

    for ( var i = 1; i < 3; i++ ) {
      if ( time[i] < 10 ) {
        time[i] = "0" + time[i];
      }
    }

    return date.join("/") + " " + time.join(":") + " " + suffix;
  }

  getFilename() {
    const timestamp = Math.floor(Date.now() / 1000);
    return this.state.filename + "_" + this.getTimeStamp() + "." + this.state.extension;
  }

  updateExportOpts(format) {
    if (format === 'tsv') {
      this.setState({extension: 'tsv', separator: '\t'});
    }
    else {
      this.setState({extension: 'csv', separator: ','});
    }
  }

  handleBtnClick = () => {
    if (order === 'desc') {
      this.refs.table.handleSort('asc', 'name');
      order = 'asc';
    } else {
      this.refs.table.handleSort('desc', 'name');
      order = 'desc';
    }
  }

  handleOnChange(e) {

    this.setState( { isChecked: !this.state.isChecked } ); 
    //this.setState( { columns: (columns) => !this.state.columns[2].hidden } );
    //this.setState( { columns[2].hidden: !this.state.columns[2].hidden } );

    this.state.columns[2].hidden= !this.state.columns[2].hidden;

  }

  render() {

    const textFilter = {
      type: 'TextFilter',
      delay: 100,
      placeholder: ' '
    };

    const options = { 
      exportCSVSeparator: '\t',
      exportCSVBtn: (onClick) => <Download onClick={ onClick } onExportChange={ this.updateExportOpts } />,
      exportCSVSeparator: this.state.separator,
      toolbarPosition: 'bottom',
      sizePerPageList: [ {
        text: '1', value: 1
      }, {
        text: '2', value: 2
      }, {
          text: '3', value: 3
      }, {
        text: 'All', value: this.state.data.length
      } ], // you can change the dropdown list for size per page
    };
    
    return (
      <div>
        
        <label style={{ float: 'right' }}> Hide/Show Evidence
          <input 
            type="checkbox" 
            onChange={ this.handleOnChange } 
            value={ this.state.isChecked }
            checked={ this.state.isChecked } >
          </input>
        </label>

        <BootstrapTable 
          exportCSV
          options={ options }
          data={ this.state.data }
          bordered={ false }
          maxHeight={ '250px' }
          csvFileName={ this.getFilename }
          pagination 
        >
          { this.state.columns
            .filter( column => !column.hidden )
            .map((column) =>

            <TableHeaderColumn 
              tdStyle={ { whiteSpace: 'normal' } }
              key={ column.id }
              dataField={ column.id } 
              isKey={ column.isKey } 
              dataSort={ column.dataSort }
              filter={ column.isFilterable ? textFilter : null }
            >

             { column.dataSort ? <a href='#'> {column.name} </a> : column.name } 

            </TableHeaderColumn>
            )
          }

        </BootstrapTable>

      </div>
    );
  }
}

BorderlessTable.PropTypes = {
  filename: PropTypes.string.isRequired,
}

BorderlessTable.defaultProps = {
  filename: 'myFilename',
};

export default BorderlessTable
