import React, {useEffect, useState} from 'react';
import SelectAjax from '../components/Select';
import {useSelector, useDispatch} from 'react-redux';
import {getAllMember} from '../slices/member';
import PropTypes from 'prop-types';

const SelectMember = ({placeholder, ...props}) => {
  const {loadingGetMember, rows} = useSelector((state) => state.member);
  const dispatch = useDispatch();
  const [param, setParam] = useState({limit: 7});

  useEffect(() => {
    dispatch(getAllMember(param))
        .catch((error) => console.log(error));
  }, [param]);

  /* eslint-disable max-len */
  return (
    <SelectAjax
      placeholder={placeholder}
      data={rows}
      loading={loadingGetMember}
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
