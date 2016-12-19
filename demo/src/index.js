import React from 'react'
import {render} from 'react-dom'

import Component from '../../src'
import faker from 'faker';

function generateList(){
  var items = [];

  for (var i=1; i<=5000; i++){
      items.push({ id: i, name: faker.name.findName(), address: faker.address.streetAddress(), state: faker.address.stateAbbr(), zip: faker.address.zipCode()});
    }

    return items;
  };

let Demo = React.createClass({
  render() {
    return <div>
      <h1>Alleles</h1>

      <Component data={generateList()}/>
    </div>
  }
})

render(<Demo/>, document.querySelector('#demo'))
