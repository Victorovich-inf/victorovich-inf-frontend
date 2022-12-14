import PropTypes from 'prop-types';
// form
import { FormProvider as Form } from 'react-hook-form';

// ----------------------------------------------------------------------

FormProvider.propTypes = {
  children: PropTypes.node.isRequired,
  methods: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
};

export default function FormProvider({ children, onSubmit, methods, style }) {
  return (
    <Form {...methods} >
      <form style={{display: 'flex', flexDirection: 'column', ...style}} onSubmit={onSubmit}>{children}</form>
    </Form>
  );
}
