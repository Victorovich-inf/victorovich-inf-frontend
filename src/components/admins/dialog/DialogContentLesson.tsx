import React, { useMemo } from 'react';
import { DialogContent, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { FormProvider, RHFTextField } from '../../hook-form';
import { useCourseEditContext } from '../../../utils/context/CourseEditContext';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { editorLessonDialogSchema } from '../../../schemas/editor/dialog/editorDialogSchema';
import RHFSwitch from '../../hook-form/RHFSwitch';
import { useEditLessonMutation } from '../../../store/api/admin/courseApi';
import { LessonEditData } from '../../../@types/lesson';
import RHFDate from '../../hook-form/RHFDate';
import RHFDateTime from '../../hook-form/RHFDateTime';

const DialogContentLesson = () => {

  const { selected } = useCourseEditContext();
  const [editLesson] = useEditLessonMutation()

  const defaultValues = useMemo(() => ({
    name: '',
    public: false,
    start: ''
  }), []);

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(editorLessonDialogSchema)
  });

  const {
    handleSubmit,
    reset,
  } = methods;

  React.useEffect(() => {
    if (selected) {
      if ('public' in selected) {
          // @ts-ignore
        reset({ name: selected?.name, public: selected?.public, start: selected?.start });
      }
    }
  }, [selected])


  const onSubmit = async (state: LessonEditData) => {
    await editLesson({ ...state, id: selected?.id.toString() });
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
            <RHFSwitch name='public' label='Опубликовано' helperText={null} />
          </Grid>
          <Grid item xs={12} md={12}>
            <RHFDateTime name='start' label='Дата начала' />
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