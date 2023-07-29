import { Form, Formik } from 'formik';
import MyTextInput from '../../app/common/form/MyTextInput';
import { Button } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';
// Make sure to wrap in observer, not observable
export default observer(function LoginForm() {
  const { userStore } = useStore();
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={values => userStore.login(values)}
    >
      {({ handleSubmit, isSubmitting }) => (
        <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
          <MyTextInput placeholder='Email' name='email' />
          <MyTextInput placeholder='Password' name='password' type='password' />
          <Button loading={isSubmitting} positive content='Login' type='submit' />
        </Form>
      )}
    </Formik>
  );
});
