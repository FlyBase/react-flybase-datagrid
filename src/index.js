/* eslint max-len: 0 */
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Download from './Download';

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

let order = 'desc';

export default class BorderlessTable extends React.Component {

constructor(props) {
    super(props);

    this.state = {
      extension: 'csv',
      filename: 'myfile',
      separator: ',',
    }
    this.getFilename = this.getFilename.bind(this);
    this.updateExportOpts = this.updateExportOpts.bind(this);
  }

  getFilename() {
    const timestamp = Math.floor(Date.now() / 1000);
    return this.state.filename + "_" + timestamp + "." + this.state.extension;
  }

  updateExportOpts(format) {
    console.log('updateExport called');
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

  render() {

    const options = { 
      exportCSVSeparator: '\t', 
      exportCSVText: 'Export TSV',
      exportCSVBtn: (onClick) => <Download onClick={onClick} onExportChange={this.updateExportOpts} />,
      exportCSVSeparator: this.state.separator,
    };

    const { data} = this.props;
    const columns  = [
      { id: 'id', name: 'ID', isKey : true, dataSort: true, isFilterable: false },
      { id: 'name', name: 'Disease Name', isKey : false, dataSort: false, isFilterable: true },
      { id: 'evidence', name: 'Evidence', isKey : false, dataSort: true, isFilterable: false },
      { id: 'assoc', name: 'Assoc', isKey : false, dataSort: false, isFilterable: false },
      { id: 'ref', name: 'Ref', isKey : false, dataSort: false, isFilterable: false },
    ];

      var returnString = (<div>

         <BootstrapTable exportCSV options={ options } data={ data } bordered={ false } maxHeight={'250px'} csvFileName={this.getFilename} >
          { columns.map((column) =>

            <TableHeaderColumn 
              tdStyle={ { whiteSpace: 'normal' } }
              key={ column.id }
              dataField={ column.id } 
              isKey={ column.isKey } 
              dataSort={ column.dataSort }

             // ref='{column.id}' filter={ { placeholder:'Filter this column', type: 'RegexFilter', delay: 1000 } } 
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