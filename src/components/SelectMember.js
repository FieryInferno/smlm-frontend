import React, {useEffect, useState, useMemo} from 'react';
import PropTypes from 'prop-types';
import MemberServices from '../services/member';
import {populateError} from '../helpers';
import Select from 'react-select';

const SelectMember = ({placeholder, ...props}) => {
  const [param, setParam] = useState({limit: 7});
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const loadOption = async () => {
    try {
      setLoading(true);
      const res = await MemberServices.getAll(param);
      setData(res.data.data.rows);
    } catch (error) {
      populateError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOption();
  }, [param]);

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
      placeholder={placeholder}
      data={data}
      onInputChange={(e) => setParam({
        ...param,
        filter: e,
      })}
      isLoading={loading}
      isClearable={true}
      isSearchable={true}
      options={options}
      {...props}
    />
  );
};

SelectMember.propTypes = {placeholder: PropTypes.string};

export default SelectMember;
