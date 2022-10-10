import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import MemberService from '../services/member';

export const getAllMember = createAsyncThunk(
    'member/getAll',
    async (param, {rejectWithValue}) => {
      try {
        const res = await MemberService.getAll(param);
        return res.data.data;
      } catch (error) {
        console.log(error.message);
        return rejectWithValue(error.message);
      };
    },
);

const initialState = {};

const memberSlice = createSlice({
  name: 'member',
  initialState,
  extraReducers: {
    [getAllMember.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllMember.fulfilled]: (state, action) => {
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    },
  },
});

const {reducer} = memberSlice;

export default reducer;
