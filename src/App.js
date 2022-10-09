import React from 'react';
import FormGroup from './components/FormGroup';

const App = () => {
  /* eslint-disable max-len */
  return (
    <>
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-3xl text-center p-4">Simple Multi Level Marketing</h1>
      <div className="mx-64">
        <FormGroup label={'Perhitungan Bonus'} button={'Calculate = '} form={['select', 'level']} />
        <FormGroup label={'Registrasi ID Member Baru'} button={'Register'} form={['input', 'parent']} />
        <FormGroup label={'Migrasi Member/Pindah Parent'} button={'Migrate'} form={['select', 'level']} />
      </div>
    </>
  );
};

export default App;
