import React from 'react';
import PropTypes from 'prop-types';

const Input = ({disabled, placeholder = null, ...props}) => {
  /* eslint-disable max-len */
  return (
    <input
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      disabled={disabled}
      placeholder={placeholder}
      {...props}
    />
  );
};

Input.propTypes = {
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default Input;
