import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import MemberService from '../services/member';
import _ from 'lodash';

export const getAllMember = createAsyncThunk(
    'member/getAll',
    async (param, {rejectWithValue}) => {
      try {
        const res = await MemberService.getAll(param);
        return res.data.data || res.data;
      } catch (error) {
        return rejectWithValue(error.message);
      };
    },
);

export const getAllParent = createAsyncThunk(
    'member/getAllParent',
    async (param, {rejectWithValue}) => {
      try {
        const res = await MemberService.getAllParent(param);
        return res.data.data || res.data;
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
        return res.data.data || res.data;
      } catch (error) {
        return rejectWithValue(
            _.isEmpty(error.response.data.message) ?
              error.message :
              error.response.data.message.errors,
        );
      }
    },
);

export const getById = createAsyncThunk(
    'member/countBonus',
    async (id, {rejectWithValue}) => {
      try {
        const res = await MemberService.get(id);
        return res.data.data || res.data;
      } catch (error) {
        return rejectWithValue(
            _.isEmpty(error.response.data.message) ?
              error.message :
              error.response.data.message.errors,
        );
      }
    },
);

export const migrateMember = createAsyncThunk(
    'member/migrate',
    async (data, {rejectWithValue}) => {
      try {
        const res = await MemberService.migrate(data);
        return res.data.data || res.data;
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
    [getAllParent.pending]: (state, action) => {
      state.loadingGetParent = true;
    },
    [getAllParent.fulfilled]: (state, action) => {
      state.loadingGetParent = false;
      state.dataParent = action.payload;
    },
    [getAllParent.rejected]: (state, action) => {
      state.loadingGetParent = false;
    },
    [register.pending]: (state, action) => {
      state.loadingRegister = true;
      state.loadingGetParent = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loadingRegister = false;
    },
    [register.rejected]: (state, action) => {
      state.loadingRegister = false;
    },
    [getById.pending]: (state, action) => {
      state.loadingGetById = true;
    },
    [getById.fulfilled]: (state, action) => {
      state.loadingGetById = false;
      state.member = action.payload;
    },
    [getById.rejected]: (state, action) => {
      state.loadingGetById = false;
    },
    [migrateMember.pending]: (state, action) => {
      state.migrate = true;
    },
    [migrateMember.fulfilled]: (state, action) => {
      state.migrate = false;
    },
    [migrateMember.rejected]: (state, action) => {
      state.migrate = false;
    },
  },
});

const {reducer} = memberSlice;

export default reducer;
