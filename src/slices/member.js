import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import MemberService from '../services/member';

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
        return res.data;
      } catch (error) {
        return rejectWithValue(error.message);
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
    [register.pending]: (state, action) => {
      state.loadingRegister = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loadingRegister = false;
      state.resultRegister = action.payload;
    },
  },
});

const {reducer} = memberSlice;

export default reducer;
