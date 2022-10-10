import React, {useState} from 'react';
import FormGroup from './components/FormGroup';
import {register} from './slices/member';
import {useDispatch, useSelector} from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  const [dataRegister, setDataRegister] = useState({
    member: '',
    parent_id: '',
  });

  const {
    loadingRegister,
    resultRegister,
  } = useSelector((state) => state.member);

  const registerMember = () => {
    dispatch(register(dataRegister));
  };

  /* eslint-disable max-len */
  return (
    <>
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-3xl text-center p-4">Simple Multi Level Marketing</h1>
      <div className="mx-64">
        <FormGroup label={'Perhitungan Bonus'} button={'Calculate = '} form={['select', 'level']} />
        <FormGroup
          label={'Registrasi ID Member Baru'}
          button={'Register'}
          form={['input', 'parent']}
          onSubmit={registerMember}
          setData={setDataRegister}
          loading={loadingRegister}
          resultRegister={resultRegister}
          data={dataRegister}
        />
        <FormGroup label={'Migrasi Member/Pindah Parent'} button={'Migrate'} form={['select', 'parent']} />
      </div>
    </>
  );
};

export default App;
