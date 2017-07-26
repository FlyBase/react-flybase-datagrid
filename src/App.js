import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Download from './Download';

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'

class App extends Component {
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

  render() {
    const products =
      [{
        id: 1,
        name: "Product1",
        price: 120
      },
        {
          id: 2,
          name: "Product2",
          price: 80
        }];

    const options = {
      exportCSVBtn: (onClick) => <Download onClick={onClick} onExportChange={this.updateExportOpts} />,
      exportCSVSeparator: this.state.separator,
    };

    return (
      <div>
        <BootstrapTable data={products} options={options} csvFileName={this.getFilename} exportCSV={true}>
          <TableHeaderColumn isKey dataField='id'>Product ID</TableHeaderColumn>
          <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
          <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default App;
