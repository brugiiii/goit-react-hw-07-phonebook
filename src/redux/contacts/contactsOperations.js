// redux-toolkit
import { createAsyncThunk } from '@reduxjs/toolkit';
// api
import * as contactsAPI from 'services/contacts-api';

// fetchContacts
export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, { rejectWithValue }) => {
    try {
      const contacts = await contactsAPI.fetchContacts();
      return contacts;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// addConatcts
export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (newContact, { rejectWithValue }) => {
    try {
      await contactsAPI.addContact(newContact);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// deleteContacts
export const deleteContact = createAsyncThunk(
  'contact/deleteContact',
  async (contactId, { rejectWithValue }) => {
    try {
      await contactsAPI.deleteContact(contactId);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
