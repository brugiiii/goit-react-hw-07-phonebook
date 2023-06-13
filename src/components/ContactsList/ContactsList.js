// react
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// redux
import { selectVisibleContacts } from 'redux/selectors';
import * as contactsOperations from 'redux/contacts/contactsOperations';
import { selectIsLoading } from 'redux/selectors';
// styles
import { ContactsListEl, ListItem, Button } from './ContactsList.styled';
import { TailSpin } from 'react-loader-spinner';

export const ContactsList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectVisibleContacts);
  const { fetchAll } = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(contactsOperations.fetchContacts());
  }, [dispatch]);

  return (
    <ContactsListEl>
      {fetchAll ? (
        <TailSpin
          height="80"
          width="80"
          color="#fff"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{ marginLeft: 'auto', marginRight: 'auto' }}
          wrapperClass=""
          visible={true}
        />
      ) : (
        contacts.map(({ name, number, id }) => (
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
        ))
      )}
    </ContactsListEl>
  );
};
