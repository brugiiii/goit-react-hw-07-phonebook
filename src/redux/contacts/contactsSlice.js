// redux-toolkit
import { createSlice } from '@reduxjs/toolkit';

// redux
import { fetchContacts, addContact, deleteContact } from './contactsOperations';

const initialState = {
  items: [],
  isLoading: {
    fetchAll: false,
    add: false,
    delete: false,
  },
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: {
    // fetch
    [fetchContacts.pending]: state => {
      state.isLoading.fetchAll = true;
      state.error = null;
    },
    [fetchContacts.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.isLoading.fetchAll = false;
    },

    [fetchContacts.rejected]: (state, action) => {
      state.isLoading.fetchAll = false;
      state.error = action.payload;
    },

    // add
    [addContact.pending]: state => {
      state.isLoading.add = true;
      state.error = null;
    },
    [addContact.fulfilled]: (state, action) => {
      state.items.push(action.payload);
      state.isLoading.add = false;
    },
    [addContact.rejected]: (state, action) => {
      state.isLoading.add = false;
      state.error = action.payload;
    },

    // delete
    [deleteContact.pending]: state => {
      state.error = null;
      state.isLoading.delete = true;
    },
    [deleteContact.fulfilled]: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
      state.isLoading.delete = false;
    },
    [deleteContact.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading.delete = false;
    },
  },
});

export default contactsSlice.reducer;
