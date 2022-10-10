import React, {useEffect} from 'react';
import SelectAjax from '../components/Select';
import {useSelector, useDispatch} from 'react-redux';
import {getAllMember} from '../slices/member';
import PropTypes from 'prop-types';

const SelectMember = ({placeholder}) => {
  const {loading, rows} = useSelector((state) => state.member);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMember())
        .catch((error) => console.log(error));
  }, []);

  return (
    <SelectAjax placeholder={placeholder} data={rows} loading={loading} />
  );
};

SelectMember.propTypes = {placeholder: PropTypes.string};

export default SelectMember;
