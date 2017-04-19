import React, { Component, PropTypes } from 'react';
import { Cell } from 'fixed-data-table-2';
import { ASC, DESC, NONE } from '../../constants';
import ColumnFilter from '../ColumnFilter';

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

  const { columnKey, height, width, children, onClick, sortDir, value, onChange, filter, displayFilter, filterText } = props;

  function handleOnClick() {
    onClick(columnKey);
  }

  function handleOnChange(e) {
      onChange(e, columnKey);
  }

  return (
    <div>
      <Cell onClick={handleOnClick}>
        {children} {renderArrow(sortDir)}
      </Cell>

      {
        displayFilter && <ColumnFilter value={filter} onChange={handleOnChange} />
      }

    </div>
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
  displayFilter: PropTypes.any.isRequired,
};

Header.defaultProps = {
  sortDir: NONE,
};

export default Header;
