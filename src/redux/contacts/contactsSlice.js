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
      return { ...state, isLoading: true, error: null };
    },
    [fetchContacts.fulfilled]: (state, action) => {
      return { ...state, items: action.payload, isLoading: false };
    },

    [fetchContacts.rejected]: (state, action) => {
      return { ...state, isLoading: false, error: action.payload };
    },

    // add
    [addContact.pending]: (state, action) => {
      return { ...state, isLoading: true, error: null };
    },
    [addContact.fulfilled]: (state, action) => {
      return {
        ...state,
        items: [...state.items, action.payload],
        isLoading: false,
      };
    },
    [addContact.rejected]: (state, action) => {
      return { ...state, isLoading: false, error: action.payload };
    },

    // delete
    [deleteContact.pending]: (state, action) => {
      return { ...state, isLoading: true, error: null };
    },
    [deleteContact.fulfilled]: (state, action) => {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
        isLoading: false,
      };
    },
    [deleteContact.rejected]: (state, action) => {
      return { ...state, isLoading: false, error: action.payload };
    },
  },
});

export default contactsSlice.reducer;
