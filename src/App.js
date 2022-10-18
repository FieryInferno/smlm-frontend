import React, {useEffect, useState} from 'react';
import FormGroup from './components/FormGroup';
import {register, getAllParent, getById, migrateMember} from './slices/member';
import {useDispatch, useSelector} from 'react-redux';
import TreeView from './components/TreeView';
import {populateError, populateSuccess} from './helpers';

const App = () => {
  const dispatch = useDispatch();
  const {
    loadingGetParent, dataParent, loadingGetById, member, loadingMigrate,
  } = useSelector((state) => state.member);
  const [getParent, setGetParent] = useState();

  const [data, setData] = useState({
    member: '',
    parent_id: null,
    id: null,
  });

  const {loadingRegister} = useSelector((state) => state.member);

  const registerMember = () => {
    dispatch(register(data))
        .unwrap()
        .then((data) => {
          setGetParent(Math.random());
          setData({
            member: '',
            parent_id: null,
          });
          populateSuccess(data);
        })
        .catch((error) => {
          populateError(error);
        });
  };

  useEffect(() => {
    dispatch(getAllParent());
  }, [getParent]);

  const countBonus = () => {
    dispatch(getById(data.id));
  };

  const migrate = () => {
    dispatch(migrateMember(data))
        .unwrap()
        .then((data) => {
          setGetParent(Math.random());
          setData({
            member: '',
            parent_id: null,
          });
          populateSuccess(data);
        })
        .catch((error) => {
          populateError(error);
        });
  };

  /* eslint-disable max-len */
  return (
    <>
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-3xl text-center p-4">Simple Multi Level Marketing</h1>
      <div className="mx-64">
        <FormGroup
          label={'Perhitungan Bonus'}
          button={'Calculate = '}
          form={['select']}
          onSubmit={countBonus}
          loading={loadingGetById}
          member={member}
          data={data}
          setData={setData}
        />
        <FormGroup
          label={'Registrasi ID Member Baru'}
          button={'Register'}
          form={['input', 'parent']}
          onSubmit={registerMember}
          setData={setData}
          loading={loadingRegister}
          data={data}
        />
        <FormGroup
          label={'Migrasi Member/Pindah Parent'}
          button={'Migrate'}
          form={['select', 'parent']}
          loading={loadingMigrate}
          onSubmit={migrate}
          data={data}
          setData={setData}
        />
      </div>
      <TreeView loading={loadingGetParent} member={dataParent} />
    </>
  );
};

export default App;
