import React from 'react'
import {render} from 'react-dom'

import Component from '../../src'
import faker from 'faker'

function getHeaders(){

 var columns = [
	 {id:'id', name:'ID'},
	 {id:'name', name:'Name'},
	 {id:'address', name:'Street Address'},
	 {id:'state', name:'State'},
	 {id:'zip', name:'Zip Code'}
 ];

 return columns;

}

function generateList(){
  var items = [];

  for (var i=1; i<=5000; i++){
   items.push({ id: i, name: faker.name.findName(), address: faker.address.streetAddress(), state: faker.address.stateAbbr(), zip: faker.address.zipCode()});
 }

 return items;
};

const data = generateList();

let Demo = React.createClass({
  render() {
    return <div>
    
    <Component data={data} columns={getHeaders()} showFilter={false} showDownloadButton={false} />
    </div>
  }
})

render(<Demo/>, document.querySelector('#demo'))
