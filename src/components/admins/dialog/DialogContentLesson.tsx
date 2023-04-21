import React, { useMemo } from 'react';
import { DialogContent, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { FormProvider, RHFCheckbox, RHFTextField } from '../../hook-form';
import { useCourseEditContext } from '../../../utils/context/CourseEditContext';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { DialogLesson } from '../../../@types/editor';
import { yupResolver } from '@hookform/resolvers/yup';
import { editorLessonDialogSchema } from '../../../schemas/editor/dialog/editorDialogSchema';

const DialogContentLesson = () => {

  const { selected } = useCourseEditContext();


  const defaultValues = useMemo(() => ({
    name: selected?.name || '',
    public: false
  }), []);

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(editorLessonDialogSchema)
  });

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;


  const onSubmit = (state: DialogLesson) => {
    console.log(state);

  }

  return (
    <FormProvider
      methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <RHFTextField name='name' label='Название' />
          </Grid>
          <Grid item xs={12} md={12}>
            <RHFCheckbox name='public' label='Опубликовано' />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button type="submit">
          Сохранить
        </Button>
      </DialogActions>
    </FormProvider>
  );
};

export default DialogContentLesson;