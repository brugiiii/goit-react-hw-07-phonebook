// react
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// redux
import { selectVisibleContacts } from 'redux/selectors';
import * as contactsOperations from 'redux/contacts/contactsOperations';
// styles
import { ContactsListEl, ListItem, Button } from './ContactsList.styled';

export const ContactsList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectVisibleContacts);

  useEffect(() => {
    dispatch(contactsOperations.fetchContacts());
  }, [dispatch]);

  return (
    <ContactsListEl>
      {contacts.map(({ name, number, id }) => (
        <ListItem key={id}>
          {name}: {number}
          <Button
            onClick={() => {
              dispatch(contactsOperations.deleteContact(id));
            }}
          >
            Delete
          </Button>
        </ListItem>
      ))}
    </ContactsListEl>
  );
};
