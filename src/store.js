import {configureStore} from '@reduxjs/toolkit';
import memberSlice from './slices/member';

const reducer = {member: memberSlice};

const store = configureStore({
  reducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
