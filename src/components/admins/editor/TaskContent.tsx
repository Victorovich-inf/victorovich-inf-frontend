import React, { useMemo } from 'react';
import { useCourseEditContext } from '../../../utils/context/CourseEditContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { editorTaskSchema } from '../../../schemas/editor/editorSchema';
import { FormProvider, RHFTextField } from '../../hook-form';
import { Grid, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

const TaskContent = () => {
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
      <Grid container spacing={3}>
        <Grid item xs={6} md={6}>
          <RHFTextField multiline name='answer' label='Ваш ответ' />
        </Grid>
        {selected ? <Grid item xs={6} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
          {showPrompt ? <Stack spacing={1}>
            <Typography onClick={() => setShowPrompt(false)} variant='body2'>
              {'prompt' in selected ? selected?.prompt : ''}
            </Typography>
            <Typography onClick={() => setShowPrompt(false)} variant='body2'
                        sx={{ cursor: 'pointer', color: '#2065D1' }}>
              Скрыть подсказку
            </Typography>
          </Stack> : 'prompt' in selected && selected?.prompt ? <Typography onClick={() => setShowPrompt(true)} variant='body2'
                                 sx={{ cursor: 'pointer', color: '#2065D1' }}>
            Показать подсказку
          </Typography> : null}
        </Grid> : null }
      </Grid>
      <LoadingButton sx={{ marginTop: 2, alignSelf: 'flex-start' }} type='submit' variant='contained'>
        Проверить
      </LoadingButton>
    </FormProvider>
  );
};

export default TaskContent;