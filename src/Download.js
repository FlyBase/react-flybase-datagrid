/**
 * Created by jogoodma on 7/13/17.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Button from 'react-bootstrap/lib/Button';
import ToggleButtonGroup from 'react-bootstrap/lib/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/lib/ToggleButton';

class Download extends Component {

  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    this.props.onClick();
  }

  handleOnChange(value) {
    if (this.props.onExportChange) this.props.onExportChange(value);
  }

  render() {
    return(
      <div>
        <ButtonToolbar>
          <ToggleButtonGroup defaultValue="csv" name="export" onChange={this.handleOnChange} type="radio">
            <ToggleButton value="csv">CSV</ToggleButton>
            <ToggleButton value="tsv">TSV</ToggleButton>
          </ToggleButtonGroup>

          <ButtonGroup style={{height:36}} >
            <Button onClick={this.handleOnClick}>Save</Button>
          </ButtonGroup>
        </ButtonToolbar>
      </div>
    );
  }
}

Download.propTypes = {
  onClick: PropTypes.func.isRequired,
  onExportChange: PropTypes.func,
};

export default Download;
