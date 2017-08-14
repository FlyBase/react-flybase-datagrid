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
    }
    this.getFilename = this.getFilename.bind(this);
    this.getTimeStamp = this.getTimeStamp.bind(this);
    this.updateExportOpts = this.updateExportOpts.bind(this);
    this.handleChkBoxClick = this.handleChkBoxClick(this);
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

  handleChkBoxClick(event) {
  } 


  render() {

    const options = { 
      exportCSVSeparator: '\t', 
      exportCSVText: 'Export TSV',
      exportCSVBtn: (onClick) => <Download onClick={onClick} onExportChange={this.updateExportOpts} />,
      exportCSVSeparator: this.state.separator,
      toolbarPosition: 'bottom'
    };

    const { data, columns } = this.props;
    
    var style = {
      float: 'right',
    };

      var returnString = (<div>

         <input name="show columns" type="checkbox" onChange={ this.handleChkBoxClick } style={ style } ></input>
       
         <BootstrapTable 
          exportCSV
          options={ options }
          data={ data }
          bordered={ false }
          maxHeight={ '250px' }
          csvFileName={ this.getFilename }
          //removes scroll bar
          pagination >
          { columns
            .filter(column => !column.hidden)
            .map((column) =>

            <TableHeaderColumn 
              tdStyle={ { whiteSpace: 'normal' } }
              key={ column.id }
              dataField={ column.id } 
              isKey={ column.isKey } 
              dataSort={ column.dataSort }
              filter={{ placeholder: 'Filter this column', type: 'RegexFilter', delay: 1000 } }
              
            >
          
            { column.dataSort ? <a href='#'> {column.name} </a> : column.name } 

            </TableHeaderColumn>
             )

         }

         </BootstrapTable>


      </div>);

    return (
        <div>{returnString}</div>
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