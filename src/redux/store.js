import { configureStore } from '@reduxjs/toolkit';

import { filterSlice } from 'redux/filterSlice';
import contactsReducer from './contacts/contactsSlice';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filter: filterSlice.reducer,
  },
});
