import React, { useMemo } from 'react';
import { DialogContent, Grid, Typography } from '@mui/material';
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
import axios from '../../../utils/axios';
import { RHFUpload } from '../../hook-form/RHFUpload';

const DialogContentCourse = () => {

  const { course } = useCourseEditContext();
  const [editCourse] = useEditCourseMutation()

  const defaultValues = useMemo(() => ({
    name: '',
    public: false,
    description: '',
    dateStart: new Date(),
    file: null,
    cost: 0,
    oldPrice: 0,
    free: false,
  }), []);

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(editorLessonDialogSchema)
  });

  const {
    handleSubmit,
    reset,
    control,
    setValue
  } = methods;

  const free = useWatch({
    control,
    name: "free",
  });

  React.useEffect(() => {
    if (course) {
      if ('public' in course) {
        reset({ name: course?.name, public: course?.public, description: course?.description, cost: +course?.cost, oldPrice: +course?.oldPrice, free: course?.free, dateStart: new Date(course?.dateStart) });
      }
      if ('logo' in course) {
        const link = `${process.env.REACT_APP_API_URL}/${course.logo}`
        axios.get(link, {responseType: 'blob'}).then(response => {
          setValue('file', {... response.data, preview: link }, { shouldValidate: true });
        })
      }
    }
  }, [course])

  const handleDrop = React.useCallback(
    (acceptedFiles: any[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (newFile) {
        setValue('file', newFile, { shouldValidate: true });
      }
    },
    [],
  );

  const onSubmit = async (state: CourseEditData) => {
    let formData: any = new FormData();

    if (course) {
      state.file && formData.append('file', state.file);
      state.id && formData.append('id', state.id);
      state.name && formData.append('name', state.name);
      state.description && formData.append('description', state.description);
      state.dateStart && formData.append('dateStart', state.dateStart);
      state.cost && formData.append('cost', state.cost);
      state.public && formData.append('public', state.public);
      state.free && formData.append('free', state.free);
      formData.append('start', '');

      console.log({data: formData, id: course?.id.toString() || ''});

      await editCourse({data: formData, id: course?.id.toString() || ''});
    }
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
            <RHFUpload
              name='file'
              maxSize={3145728}
              onDrop={handleDrop}
              onDelete={() => setValue('file', null, { shouldValidate: true })}
              helperText={<Typography
                variant='caption'
                sx={{
                  mt: 2,
                  mx: 'auto',
                  display: 'block',
                  textAlign: 'center',
                  color: 'text.secondary',
                }}
              >
                Логотип курса
              </Typography>} multiple={false} />
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
          <Grid item xs={12} md={6}>
            <RHFTextField disabled={free} name='oldPrice' type='number' label='Старая цена' />
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