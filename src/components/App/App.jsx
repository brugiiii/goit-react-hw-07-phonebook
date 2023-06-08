// Components
import { ContactsList } from '../ContactsList';
import { ContactForm } from '../ContactForm';
import { Filter } from '../Filter';
// styles
import { ContactsBook, PhonebookTitle, ContactsTitle } from './App.styled';

export const App = () => {
  return (
    <ContactsBook>
      <PhonebookTitle>Phonebook</PhonebookTitle>
      <ContactForm />

      <ContactsTitle>Contacts</ContactsTitle>
      <Filter />
      <ContactsList />
    </ContactsBook>
  );
};
