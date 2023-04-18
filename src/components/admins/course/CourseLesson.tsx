import React, { useMemo } from 'react';
import { Box, Button, Card, Grid, IconButton, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormProvider, RHFTextField } from '../../hook-form';
import { useForm } from 'react-hook-form';
import { useCourseEditContext } from '../../../utils/context/CourseEditContext';
import Iconify from '../../iconify';
import AddItem from './AddItem';

const CourseLesson = () => {

  const {selected} = useCourseEditContext()

  const defaultValues = useMemo(() => ({
    name: '',
  }), []);

  const methods = useForm({
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  React.useEffect(() => {
    if (selected) {
      reset({
        name: selected.name
      })
    }
  }, [selected])

  const onSubmit = async (state: { name: string }) => {

  }

  return (
    <FormProvider style={{flex: 1}}
                  methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {selected ? <Stack direction="column" spacing={2} sx={{flex: 1}}>
        <AddItem/>
      </Stack>: <Box sx={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Урок/задание не выбран</Box>}
      {selected ? <Stack sx={{ marginTop: 2, marginLeft: 'auto' }} spacing={2} direction="row">
        <Button sx={{alignSelf: 'flex-end'}} variant="outlined">Опубликовать</Button>
        <LoadingButton type='submit' variant='contained'
                       loading={isSubmitting}>
          {'Сохранить'}
        </LoadingButton>
      </Stack> : null}
    </FormProvider>
  );
};

export default CourseLesson;
