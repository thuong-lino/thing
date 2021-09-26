import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';
const MultipleSelection = ({ options, placeholder, onChange, fluid, style }) => {
  return (
    <Dropdown
      placeholder={placeholder}
      fluid={fluid}
      multiple
      search
      selection
      style={style}
      options={options}
      onChange={onChange}
    />
  );
};
MultipleSelection.propTypes = {
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  fluid: PropTypes.bool,
  style: PropTypes.object,
};
export default MultipleSelection;
