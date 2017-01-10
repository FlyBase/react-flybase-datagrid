import React, { Component, PropTypes } from 'react';
import { Cell } from 'fixed-data-table';
import { ASC, DESC, NONE } from '../../constants';

function renderArrow(direction) {
  switch(direction) {
    case ASC:
      return '↑';
    case DESC:
      return '↓';
    default:
      return '';
  }
}

function Header(props) {
  const { columnKey, height, width, children, onClick, sortDir } = props;

  function handleOnClick() {
    onClick(columnKey);
  }

  return (
    <Cell onClick={handleOnClick}>
      {children} {renderArrow(sortDir)}
    </Cell>
  );
}


// See https://facebook.github.io/react/docs/typechecking-with-proptypes.html
Header.propTypes = {
  children: PropTypes.any.isRequired,
  columnKey: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  sortDir: PropTypes.oneOf([ASC, DESC, NONE]),
  onClick: PropTypes.func,
};

Header.defaultProps = {
  sortDir: NONE,
};

export default Header;
