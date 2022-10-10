import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import MemberService from '../services/member';
import _ from 'lodash';

export const getAllMember = createAsyncThunk(
    'member/getAll',
    async (param, {rejectWithValue}) => {
      try {
        const res = await MemberService.getAll(param);
        return res.data.data;
      } catch (error) {
        return rejectWithValue(error.message);
      };
    },
);

export const register = createAsyncThunk(
    'member/register',
    async (data, {rejectWithValue}) => {
      try {
        const res = await MemberService.register(data);
        return res.data.data;
      } catch (error) {
        return rejectWithValue(
            _.isEmpty(error.response.data.message) ?
              error.message :
              error.response.data.message.errors,
        );
      }
    },
);

const initialState = {};

const memberSlice = createSlice({
  name: 'member',
  initialState,
  extraReducers: {
    [getAllMember.pending]: (state, action) => {
      state.loadingGetMember = true;
    },
    [getAllMember.fulfilled]: (state, action) => {
      return {
        ...state,
        ...action.payload,
        loadingGetMember: false,
      };
    },
    [getAllMember.rejected]: (state, action) => {
      state.loadingGetMember = false;
    },
    [register.pending]: (state, action) => {
      state.loadingRegister = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loadingRegister = false;
      state.resultRegister = action.payload;
    },
    [register.rejected]: (state, action) => {
      state.loadingRegister = false;
    },
  },
});

const {reducer} = memberSlice;

export default reducer;
