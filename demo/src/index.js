import React from 'react'
import {render} from 'react-dom'

import FlybaseDataGrid from '../../src'
import faker from 'faker'
import '../../dist/fixed-data-table.css';

function getHeaders() {

  var columns = [
    {
      id: 'id',
      name: 'ID'
    }, 
    {
      id: 'name',
      name: 'Name',
      render: (name, row) => (
        <a href={`https://duckduckgo.com/?q=${name} ${row['zip']}`} target='_blank'>{name}</a> 
      )
    }, 
    {
      id: 'address',
      name: 'Street Address'
    }, 
    {
      id: 'state',
      name: 'State'
    }, 
    {
      id: 'zip',
      name: 'Code, Zip'
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

class Demo extends FlybaseDataGrid {

  render() {
    return (
        <FlybaseDataGrid  
        columns={getHeaders()} 
        data={data}
        showColumnFilter
        downloadButton={['tsv','csv']}
        maxHeight={1000000000}
        filename={'MyDownload'}
        />
    );      
  }
}

render(
  <Demo/>, document.querySelector('#demo'))
