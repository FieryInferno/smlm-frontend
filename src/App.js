import React, {useEffect, useState} from 'react';
import FormGroup from './components/FormGroup';
import {register, getAllParent} from './slices/member';
import {useDispatch, useSelector} from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import TreeView from './components/TreeView';

const MySwal = withReactContent(Swal);

const App = () => {
  const dispatch = useDispatch();
  const {loadingGetParent, dataParent} = useSelector((state) => state.member);

  const [dataRegister, setDataRegister] = useState({
    member: '',
    parent_id: null,
  });

  const {
    loadingRegister,
    resultRegister,
  } = useSelector((state) => state.member);

  const registerMember = () => {
    dispatch(register(dataRegister))
        .unwrap()
        .then((data) => {
          setDataRegister({
            member: '',
            parent_id: null,
          });

          MySwal.fire({
            title: 'Success',
            html: data.message,
            icon: 'success',
          });
        })
        .catch((error) => {
          let errorText;

          if (Array.isArray(error)) {
            // eslint-disable-next-line max-len
            errorText = `<ul class="space-y-1 max-w-md list-disc list-inside text-red-600">`;

            error.map((err) => {
              errorText += `<li>${err.msg}</li>`;
            });

            errorText += '</ul>';
          } else {
            errorText = error;
          }

          MySwal.fire({
            title: 'Failed',
            html: errorText,
            icon: 'error',
          });
        });
  };

  useEffect(() => {
    dispatch(getAllParent());
  }, []);

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
      <TreeView loading={loadingGetParent} member={dataParent} />
    </>
  );
};

export default App;
