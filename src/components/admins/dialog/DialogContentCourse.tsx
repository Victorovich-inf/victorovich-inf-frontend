import React, { useMemo } from 'react';
import { DialogContent, Grid } from '@mui/material';
import { useForm, useWatch } from 'react-hook-form';
import { FormProvider, RHFTextField } from '../../hook-form';
import { useCourseEditContext } from '../../../utils/context/CourseEditContext';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { editorLessonDialogSchema } from '../../../schemas/editor/dialog/editorDialogSchema';
import RHFSwitch from '../../hook-form/RHFSwitch';
import { useEditCourseMutation } from '../../../store/api/admin/courseApi';
import { CourseEditData } from '../../../@types/course';
import RHFDate from '../../hook-form/RHFDate';

const DialogContentCourse = () => {

  const { course } = useCourseEditContext();
  const [editCourse] = useEditCourseMutation()

  const defaultValues = useMemo(() => ({
    name: '',
    public: false,
    description: '',
    dateStart: new Date(),
    cost: 0,
    free: false,
  }), []);

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(editorLessonDialogSchema)
  });

  const {
    handleSubmit,
    reset,
    control
  } = methods;

  const free = useWatch({
    control,
    name: "free",
  });

  React.useEffect(() => {
    if (course) {
      if ('public' in course) {
        reset({ name: course?.name, public: course?.public, description: course?.description, cost: +course?.cost, free: course?.free, dateStart: new Date(course?.dateStart) });
      }
    }
  }, [course])


  const onSubmit = async (state: CourseEditData) => {
    await editCourse({
      ...state, id: course?.id.toString(),
      start: '',
    });
  }

  return (
    <FormProvider
      methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <RHFTextField name='name' label='Название' />
          </Grid>
          <Grid item xs={12} md={6}>
            <RHFSwitch name='public' label='Опубликовано' helperText={null} />
          </Grid>
          <Grid item xs={12} md={6}>
            <RHFSwitch helperText={null} name='free' label='Бесплатно' />
          </Grid>
          <Grid item xs={12} md={12}>
            <RHFTextField name='description' label='Описание' multiline
                          rows={5} />
          </Grid>
          <Grid item xs={12} md={6}>
            <RHFDate name='dateStart' label='Дата начала' />
          </Grid>
          <Grid item xs={12} md={6}>
            <RHFTextField disabled={free} name='cost' type='number' label='Стоимость' />
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

export default DialogContentCourse;