import { ListItem, Button } from './ContactsListItem.styled';
import { useDeleteContactMutation } from 'services/contactsAPI';

export const ContactsListItem = ({ id, name, number }) => {
  const [deleteContact, { isLoading }] = useDeleteContactMutation();

  return (
    <ListItem>
      {name}: {number}
      <Button
        onClick={() => {
          deleteContact(id);
        }}
        disabled={isLoading}
      >
        {isLoading ? 'Loading' : 'Delete'}
      </Button>
    </ListItem>
  );
};
