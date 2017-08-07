import React from 'react'
import {render} from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css'
import FlybaseDataGrid from '../../src'

import 'react-bootstrap-table/dist/react-bootstrap-table.min.css'
//import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

const columns  = [
      { id: 'id', name: 'ID', isKey : true, dataSort: true, isFilterable: true, hidden: false },
      { id: 'name', name: 'Disease Name', isKey : false, dataSort: false, isFilterable: true, hidden: false },
      { id: 'evidence', name: 'Evidence', isKey : false, dataSort: true, isFilterable: false, hidden: false },
      { id: 'assoc', name: 'Assoc', isKey : false, dataSort: false, isFilterable: false, hidden: true },
      { id: 'ref', name: 'Ref', isKey : false, dataSort: false, isFilterable: false, hidden: true },
    ];

const data = [];
 
   data.push({
      id: 'a',
      name: 'asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf ',
      evidence: 'asdf',
      assoc: 'asdf',
      ref: 'asdf',
    });

    data.push({
      id: 'b',
      name: 'bar',
      evidence: 'zxcv',
      assoc: 'asdf',
      ref: 'asdf',
    });

     data.push({
      id: 'c',
      name: 'baz',
      evidence: 'asdf',
      assoc: 'asdf',
      ref: 'asdf',
    });


let Demo = React.createClass({
  render() {
    return <div className='container' >
        <h1>react-flybase-datagrid2</h1>
        <FlybaseDataGrid data={ data } columns={ columns }  />
      </div>
  }
})

render(<Demo/>, document.querySelector('#demo'))