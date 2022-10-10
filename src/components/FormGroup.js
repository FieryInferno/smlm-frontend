import React from 'react';
import SelectAjax from '../components/Select';
import SelectMember from '../components/SelectMember';
import PropTypes from 'prop-types';
import Button from '../components/Button';
import Input from '../components/Input';

const FormGroup = ({label, form, data, setData, ...props}) => {
  /* eslint-disable max-len */
  return (
    <>
      <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
      <div className="flex flex-row gap-4">
        <div className="basis-1/4">
          {form[0] === 'select' ? (
            <SelectMember placeholder={'Select Member ID'} />
          ) : (
            <Input
              disabled={false}
              placeholder={'Inisial Member baru'}
              value={data.member}
              onChange={(e) => setData({
                ...data,
                member: e.target.value,
              })}
            />
          )}
        </div>
        <div className="basis-1/4">
          {form[1] === 'level' ? (
            <SelectAjax placeholder={'Pilih Level'} />
          ) : (
            <SelectMember placeholder={'Pilih Parent'} onChange={(e) => setData({
              ...data,
              parent_id: e.value,
            })} />
          )}
        </div>
        <div className="basis-1/6">
          <Button {...props} />
        </div>
        <div className="basis-1/3">
          <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" disabled />
        </div>
      </div>
    </>
  );
};

FormGroup.propTypes = {
  label: PropTypes.string,
  form: PropTypes.array,
  data: PropTypes.object,
  setData: PropTypes.func,
};

export default FormGroup;
