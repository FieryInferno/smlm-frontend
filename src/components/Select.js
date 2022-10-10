import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const SelectAjax = ({placeholder, data, loading}) => {
  const option = [];

  useEffect(() => {
    data?.map((data) => {
      option.push({
        value: data.id,
        label: data.member,
      });
    });
  }, [data]);

  /* eslint-disable max-len */
  return (
    // <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" defaultValue={placeholder}>
    //   <option disabled>{placeholder}</option>
    //   {data?.map((data, key) => (
    //     <option key={key}>{data.member}</option>
    //   ))}
    // </select>
    <Select
      defaultValue={option[0]}
      isLoading={loading}
      isClearable={true}
      isSearchable={true}
      options={option}
    />
  );
};

SelectAjax.propTypes = {
  placeholder: PropTypes.string,
  data: PropTypes.array,
  loading: PropTypes.bool,
};

export default SelectAjax;
