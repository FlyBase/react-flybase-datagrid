import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContainerDimensions from 'react-container-dimensions'

function Filter(props) {
  const { value, onChange, placeholder} = props;

  return (
  	<ContainerDimensions>
      { <input onChange={onChange} placeholder={placeholder} style={{width:width-10}} /> }
    </ContainerDimensions>
  );
}

 Filter.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
 };

 Filter.defaultProps = {
  placeholder: '',
 };

export default Filter;