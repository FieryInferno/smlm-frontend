import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const SelectAjax = ({placeholder, data, loading, ...props}) => {
  const options = useMemo(() => {
    const dataOption = [];

    data?.map((data) => {
      dataOption.push({
        value: data.id,
        label: data.member,
      });
    });

    return dataOption;
  }, [data]);

  /* eslint-disable max-len */
  return (
    <Select
      isLoading={loading}
      isClearable={true}
      isSearchable={true}
      options={options}
      placeholder={placeholder}
      {...props}
    />
  );
};

SelectAjax.propTypes = {
  placeholder: PropTypes.string,
  data: PropTypes.array,
  loading: PropTypes.bool,
};

export default SelectAjax;
