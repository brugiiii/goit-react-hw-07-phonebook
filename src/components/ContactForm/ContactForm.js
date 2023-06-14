// formik
import { Formik } from 'formik';
import { object, string, number } from 'yup';

// redux
import {
  useAddContactMutation,
  useGetContactsQuery,
} from 'services/contactsAPI';

// notification
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

// styles
import {
  FormEl,
  Label,
  Input,
  Button,
  ErrorMessageEl,
} from './ContactForm.styled';

import { TailSpin } from 'react-loader-spinner';

const schema = object({
  name: string().required(),
  number: number('please write a number').required(),
});

const initialValues = {
  name: '',
  number: '',
};

export const ContactForm = () => {
  const { data: contacts } = useGetContactsQuery();
  const [addContact, { isLoading }] = useAddContactMutation();

  const onFormSubmit = (values, { resetForm }) => {
    const loweredName = values.name.toLowerCase();

    contacts.find(contact => contact.name.toLowerCase() === loweredName)
      ? NotificationManager.error(
          `${values.name} is already in contacts`,
          'Error'
        )
      : addContact(values) && resetForm();
  };

  return (
    <>
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
          <Button type="submit" disabled={isLoading}>
            add contact
            {isLoading && (
              <TailSpin
                height="20"
                width="20"
                color="#3b5998"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{
                  position: 'absolute',
                  top: '50%',
                  marginTop: -10,
                  right: 6,
                }}
                wrapperClass=""
                visible={true}
              />
            )}
          </Button>
        </FormEl>
      </Formik>

      <NotificationContainer />
    </>
  );
};
