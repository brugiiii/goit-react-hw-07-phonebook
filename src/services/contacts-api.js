import axios from 'axios';

axios.defaults.baseURL = 'https://6480eadff061e6ec4d4a13e6.mockapi.io';

export async function fetchContacts() {
  const { data } = await axios.get('/contacts');
  return data;
}

export async function addContact(data) {
  await axios.post('/contacts', { ...data });
}

export async function deleteContact(contactId) {
  await axios.delete(`/contacts/${contactId}`);
}
