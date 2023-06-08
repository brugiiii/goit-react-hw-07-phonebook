// formik
import { Formik } from 'formik';
import { object, string, number } from 'yup';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'redux/selectors';
import { addContact } from 'redux/contacts/contactsOperations';
import { contactsActions } from 'redux/contacts/contactsSlice';

// styles
import {
  FormEl,
  Label,
  Input,
  Button,
  ErrorMessageEl,
} from './ContactForm.styled';

const schema = object({
  name: string().required(),
  number: number('please write a number').required(),
});

const initialValues = {
  name: '',
  number: '',
};

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const onFormSubmit = (values, { resetForm }) => {
    const loweredName = values.name.toLowerCase();

    contacts.find(contact => contact.name.toLowerCase() === loweredName)
      ? alert(`${values.name} is already in contacts`)
      : dispatch(addContact(values)) &&
        dispatch(contactsActions.addContact(values)) &&
        resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={onFormSubmit}
    >
      <FormEl>
        <Label>
          Name
          <Input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <ErrorMessageEl name="name" component="div" />
        </Label>
        <Label>
          Number
          <Input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
          <ErrorMessageEl name="number" component="div" />
        </Label>
        <Button type="submit">add contact</Button>
      </FormEl>
    </Formik>
  );
};
