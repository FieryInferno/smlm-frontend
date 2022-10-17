import React from 'react';
import SelectMember from '../components/SelectMember';
import PropTypes from 'prop-types';
import Button from '../components/Button';
import Input from '../components/Input';

const FormGroup = ({label, form, data, setData, member, ...props}) => {
  /* eslint-disable max-len */
  return (
    <>
      <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
      <div className="flex flex-row gap-4">
        <div className={'basis-1/2'}>
          {form[0] === 'select' ? (
            <SelectMember placeholder={'Select Member ID'} onChange={(e) => setData({
              ...data,
              id: e?.value,
            })} />
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
        {form[1] === 'parent' && (
          <div className="basis-1/4">
            <SelectMember placeholder={'Pilih Parent'} onChange={(e) => setData({
              ...data,
              parent_id: e?.value,
            })} />
          </div>
        )}
        <div className="basis-1/6">
          <Button {...props} />
        </div>
        {label === 'Perhitungan Bonus' && (
          <div className="basis-1/3">
            <Input disabled value={member?.bonus} />
          </div>
        )}
      </div>
    </>
  );
};

FormGroup.propTypes = {
  label: PropTypes.string,
  form: PropTypes.array,
  data: PropTypes.object,
  setData: PropTypes.func,
  member: PropTypes.object,
};

export default FormGroup;
