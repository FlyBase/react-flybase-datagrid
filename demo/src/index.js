import React from 'react'
import {render} from 'react-dom'
import 'fixed-data-table/dist/fixed-data-table.css';
import Component from '../../src'
import faker from 'faker';


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

let Demo = React.createClass({
  render() {
    return <div>
    <h1>datagrid1</h1>

    <Component data={generateList()} columns={getHeaders()}/>
    </div>
  }
})

render(<Demo/>, document.querySelector('#demo'))
