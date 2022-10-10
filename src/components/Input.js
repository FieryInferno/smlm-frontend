import React from 'react';
import PropTypes from 'prop-types';

const Input = ({disabled, placeholder = null}) => {
  /* eslint-disable max-len */
  return (
    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" disabled={disabled} placeholder={placeholder} />
  );
};

Input.propTypes = {
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default Input;
