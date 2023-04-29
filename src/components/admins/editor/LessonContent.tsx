import React, { useMemo } from 'react';
import { useCourseEditContext } from '../../../utils/context/CourseEditContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { editorTaskSchema } from '../../../schemas/editor/editorSchema';
import { FormProvider, RHFTextField } from '../../hook-form';
import { Grid, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

const LessonContent = () => {
  const { selected } = useCourseEditContext();

  const [showPrompt, setShowPrompt] = React.useState(false)

  const defaultValues = useMemo(() => ({
    answer: '',
  }), []);

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(editorTaskSchema),
  });

  const {
    handleSubmit,
    setValue,
    reset,
  } = methods;

  const onSubmit = (state: {answer: string}) => {

  }

  return (
    <FormProvider
      methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <LoadingButton sx={{ marginTop: 2, alignSelf: 'flex-start' }} type='submit' variant='contained'>
        Просмотрено
      </LoadingButton>
    </FormProvider>
  );
};

export default LessonContent;