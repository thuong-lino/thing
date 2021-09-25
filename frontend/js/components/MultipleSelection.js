import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';
const MultipleSelection = ({ options, placeholder, onChange }) => {
  return (
    <Dropdown
      placeholder={placeholder}
      fluid
      multiple
      search
      selection
      options={options}
      onChange={onChange}
    />
  );
};
MultipleSelection.propTypes = {
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};
export default MultipleSelection;
