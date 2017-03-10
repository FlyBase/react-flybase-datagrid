import React from 'react'
import {render} from 'react-dom'

import Component from '../../src'
import faker from 'faker'
import {StyleSheet, css} from 'aphrodite'

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

const styles = StyleSheet.create({
 column: {
  backgroundColor: '#000',
 },
 field_label: {
  backgroundColor: '#000',
  borderColor: '#000000',
  borderRight: '1px',
  borderBottom: '1px',
  borderTop: '0px',
  fontWeight: 'bold',
  wordWrap: 'break-word',

  height: '100%',
  width: '100%',
 },
 wrapperStyles: {
    // marginTop: '1rem',
    // marginLeft: '1rem',
    // marginRight: '3rem',
    // border: 'none',
    // overflow:'hidden',
    // height: '100%',
    // borderBottom: "1px solid #000000"
  },
  newTableHeader: {
    // color: '#000',
    // fontSize: '12px',
    // lineHeight: '1',
    // background: '#FFFFFF',
    // border: 'none',

  },
  newCellBorder: {
    // borderBottomStyle: 'solid',
    // borderBottomWidth: '1px',
    // borderBottom: '1px solid #000000',
    backgroundColor: '#ffffff',
    border: '1px',
  }
});

let Demo = React.createClass({
  render() {
    return <div>
    
    <Component data={data} columns={getHeaders()} showFilter={false} showDownloadButton={false} style={styles} />
    </div>
  }
});

render(<Demo/>, document.querySelector('#demo'))
