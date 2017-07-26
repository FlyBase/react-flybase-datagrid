import React from 'react'
import {render} from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css'
import FlybaseDataGrid from '../../src'

import 'react-bootstrap-table/dist/react-bootstrap-table.min.css'
//import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

var columns = [
    {
      id: 'id',
      name: 'ID',
    }, 
    {
      id: 'name',
      name: 'Name',
    }
];

const items = [];
 
   items.push({
      id: 'a',
      name: 'asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf ',
      evidence: 'asdf',
      assoc: 'asdf',
      ref: 'asdf',
    });

    items.push({
      id: 'b',
      name: 'bar',
      evidence: 'zxcv',
      assoc: 'asdf',
      ref: 'asdf',
    });

     items.push({
      id: 'c',
      name: 'baz',
      evidence: 'asdf',
      assoc: 'asdf',
      ref: 'asdf',
    });


let Demo = React.createClass({
  render() {
    return <div>
        <h1>react-flybase-datagrid2</h1>
        <FlybaseDataGrid data={ items } />
      </div>
  }
})

render(<Demo/>, document.querySelector('#demo'))