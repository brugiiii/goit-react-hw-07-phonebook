// redux-toolkit
import { createSlice } from '@reduxjs/toolkit';
// redux
import { fetchContacts } from './contactsOperations';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: {
    [fetchContacts.pending]: state => {
      return { ...state, isLoading: true, error: null };
    },
    [fetchContacts.fulfilled]: (state, action) => {
      return { ...state, items: action.payload, isLoading: false };
    },

    [fetchContacts.rejected]: (state, action) => {
      return { ...state, isLoading: false, error: action.payload };
    },
  },
});

export default contactsSlice.reducer;
