import React, { Component, PropTypes } from 'react';
import { Cell } from 'fixed-data-table';

function Filter(props) {
  const { value, onChange } = props;

  return (
    <input onChange={onChange} placeholder="Filter by First Name" />
  );
}

// See https://facebook.github.io/react/docs/typechecking-with-proptypes.html

// Filter.propTypes = {
//   onClick: PropTypes.func,
// };

// Header.defaultProps = {
//   sortDir: NONE,
// };

export default Filter;
