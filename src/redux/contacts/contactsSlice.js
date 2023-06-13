// redux-toolkit
import { createSlice } from '@reduxjs/toolkit';

// redux
import { fetchContacts, addContact, deleteContact } from './contactsOperations';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: {
    // fetch
    [fetchContacts.pending]: state => {
      state.isLoading = true;
      state.error = null;
    },
    [fetchContacts.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    },

    [fetchContacts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // add
    [addContact.pending]: state => {
      state.isLoading = true;
      state.error = null;
    },
    [addContact.fulfilled]: (state, action) => {
      state.items.push(action.payload);
      state.isLoading = false;
    },
    [addContact.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // delete
    [deleteContact.pending]: state => {
      state.error = null;
    },
    [deleteContact.fulfilled]: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
    [deleteContact.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default contactsSlice.reducer;
