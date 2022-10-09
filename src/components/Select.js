import React from 'react';
import PropTypes from 'prop-types';

const Select = ({placeholder}) => {
  /* eslint-disable max-len */
  return (
    <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
      <option disabled selected>{placeholder}</option>
      <option>Canada</option>
      <option>France</option>
      <option>Germany</option>
    </select>
  );
};

Select.propTypes = {placeholder: PropTypes.string};

export default Select;
