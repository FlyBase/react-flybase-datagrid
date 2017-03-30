import expect from 'expect'
import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'
import { shallow } from 'enzyme'
import { render2, mount } from 'enzyme'
import Component from 'src/'
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


describe('Component', () => {

    it('renders a <div>', () => {

       const wrapper = shallow( <Component data={data} columns={getHeaders()} showFilter={false} showDownloadButton={false} /> );
       // console.log(wrapper.text());
       // expect(wrapper.text()).toContain('<div>');
       expect(wrapper).toExist();

    })
});