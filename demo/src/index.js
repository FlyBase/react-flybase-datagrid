import React from 'react'
import {render} from 'react-dom'
import PropTypes from 'prop-types';
import FlybaseDataGrid from '../../src'
import faker from 'faker'
import '../../dist/fixed-data-table.css';

function getHeaders() {

  var columns = [
    {
      id: 'id',
      name: 'ID',
      maxWidth: 50,
      flexGrow: false
    }, 
    {
      id: 'name',
      name: 'Name',
      render: (name, row) => (
        <a href={`https://duckduckgo.com/?q=${name} ${row['zip']}`} target='_blank'>{name}</a> 
      ),
      flexGrow: true,
    }, 
    {
      id: 'address',
      name: 'Street Address',
      flexGrow: true
    }, 
    {
      id: 'state',
      name: 'State',
      maxWidth: 15,
      flexGrow: true
    }, 
    {
      id: 'zip',
      name: 'Code, Zip',
      flexGrow: true,
    }
  ];

  return columns;

}

function generateList() {
  var items = [];

  for (var i = 1; i <= 50; i++) {
    items.push({id: i, name: faker.name.findName(), address: faker.address.streetAddress(), state: faker.address.stateAbbr(), zip: faker.address.zipCode()});
  }

  return items;
};

const data = generateList();
const style = {
  width: 800,
};


class Demo extends FlybaseDataGrid {

  render() {
    return (
        <div style={{width:600}} >
          <FlybaseDataGrid  
          columns={getHeaders()} 
          data={data}
          showColumnFilter
          downloadButton={['tsv','csv']}
          maxHeight={1000000000}
          filename={'MyDownload'}
          />
        </div>
    );      
  }
}

render(
  <Demo/>, document.querySelector('#demo'))
