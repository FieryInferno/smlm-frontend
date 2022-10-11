import React, {useEffect, useState} from 'react';
import SelectAjax from '../components/Select';
import PropTypes from 'prop-types';
import MemberServices from '../services/member';
import {populateError} from '../helpers';

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

  /* eslint-disable max-len */
  return (
    <SelectAjax
      placeholder={placeholder}
      data={data}
      loading={loading}
      onInputChange={(e) => setParam({
        ...param,
        filter: e,
      })}
      {...props}
    />
  );
};

SelectMember.propTypes = {placeholder: PropTypes.string};

export default SelectMember;
