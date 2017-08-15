import React, {Component} from 'react';

class CheckboxFilter extends React.Component {
  constructor(props) {
    super(props);
    this.filter = this.filter.bind(this);
    this.isFiltered = this.isFiltered.bind(this);
  }

  filter(event) {
    if (this.refs.nokCheckbox.checked && this.refs.okCheckbox.checked) {
      // all checkboxes are checked means we want to remove the filter for this column
      this.props.filterHandler();
    } else {
      this.props.filterHandler({ callback: this.isFiltered });
    }
  }

  isFiltered(targetValue) {
    if (targetValue === 'no') {
      return (this.refs.nokCheckbox.checked);
    } else {
      return (this.refs.okCheckbox.checked);
    }
  }

  render() {
    
    return (
      <div>
        <input 
          ref='okCheckbox' 
          type='checkbox' 
          className='filter' 
          onChange={ this.filter } 
          defaultChecked={ true } /><label>{ this.props.textOK }
        </label>
        
        <input 
          ref='nokCheckbox' 
          type='checkbox' 
          className='filter' 
          onChange={ this.filter } 
          defaultChecked={ true } 
          style={ { marginLeft: 30 + 'px' } } /><label>{ this.props.textNOK }
        </label>
      </div>
    );
  }
}

CheckboxFilter.propTypes = {
  filterHandler: React.PropTypes.func.isRequired,
  textOK: React.PropTypes.string,
  textNOK: React.PropTypes.string
};

CheckboxFilter.defaultProps = {
  textOK: 'OK',
  textNOK: 'Not OK'
};

export default CheckboxFilter;
