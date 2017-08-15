import React, { Component } from 'react';
import PropTypes from 'prop-types';

function Filter(props) {
  const { value, onChange, placeholder} = props;

  return (
  	<div>
      { <input onChange={onChange} placeholder={placeholder} /> }
    </div>
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