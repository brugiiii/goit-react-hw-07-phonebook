// redux
import { useGetContactsQuery } from 'services/contactsAPI';
import { useSelector } from 'react-redux';
import { selectFilter } from 'redux/selectors';

// components
import { TailSpin } from 'react-loader-spinner';
import { ContactsListItem } from '../ContactsListItem';

// styles
import { ContactsListEl } from './ContactsList.styled';

export const ContactsList = () => {
  const { data, isLoading } = useGetContactsQuery();

  const loweredFilter = useSelector(selectFilter).toLowerCase();

  const contacts =
    !isLoading &&
    data.filter(contact => contact.name.toLowerCase().includes(loweredFilter));

  return (
    <ContactsListEl>
      {isLoading ? (
        <TailSpin
          height="80"
          width="80"
          color="#fff"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{ marginLeft: 'auto', marginRight: 'auto' }}
          visible={true}
        />
      ) : (
        contacts.map(({ name, number, id }) => (
          <ContactsListItem key={id} name={name} number={number} id={id} />
        ))
      )}
    </ContactsListEl>
  );
};
