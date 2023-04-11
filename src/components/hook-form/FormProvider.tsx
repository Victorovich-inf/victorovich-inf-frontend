import { FormProvider as Form } from 'react-hook-form';
import { ReactNode } from 'react';

interface FormProviderProps {
  children: ReactNode;
  onSubmit: any;
  methods: any;
  style?: any;
}

export default function FormProvider({ children, onSubmit, methods, style = {} }: FormProviderProps) {
  return (
    <Form {...methods} >
      <form style={{display: 'flex', flexDirection: 'column', ...style}} onSubmit={onSubmit}>{children}</form>
    </Form>
  );
}
