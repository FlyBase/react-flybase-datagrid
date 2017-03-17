import React, { Component, PropTypes } from 'react';
import { Cell } from 'fixed-data-table-2';

function Filter(props) {
  const { value, onChange } = props;

  return (
    <input onChange={onChange} placeholder={''} />
  );
}

// See https://facebook.github.io/react/docs/typechecking-with-proptypes.html

 Filter.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
 };

export default Filter;
