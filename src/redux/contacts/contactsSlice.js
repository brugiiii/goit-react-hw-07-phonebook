// redux-toolkit
import { createSlice } from '@reduxjs/toolkit';
// nanoid
import { nanoid } from 'nanoid';
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
  reducers: {
    addContact: {
      reducer: (state, action) => {
        return { ...state, items: [...state.items, action.payload] };
      },
      prepare: text => ({
        payload: {
          ...text,
          id: nanoid(),
        },
      }),
    },
    deleteContact: (state, action) => {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    },
  },
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

export const contactsActions = contactsSlice.actions;
export default contactsSlice.reducer;
