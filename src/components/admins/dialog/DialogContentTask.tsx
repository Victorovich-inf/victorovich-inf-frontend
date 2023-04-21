import React, { useMemo } from 'react';
import { DialogContent, Grid, Typography } from '@mui/material';
import { RHFUpload } from '../../hook-form/RHFUpload';
import { useForm } from 'react-hook-form';
import { FormProvider, RHFCheckbox, RHFTextField } from '../../hook-form';
import { useCourseEditContext } from '../../../utils/context/CourseEditContext';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import { DialogTask } from '../../../@types/editor';
import { yupResolver } from '@hookform/resolvers/yup';
import { editorTaskDialogSchema } from '../../../schemas/editor/dialog/editorDialogSchema';

const DialogContentTask = () => {

  const { selected } = useCourseEditContext();


  const defaultValues = useMemo(() => ({
    name: selected?.name || '',
    prompt: '',
    answer: '',
    taskSolutionText: '',
    file: null,
    public: false,
    answerFile: false

  }), []);

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(editorTaskDialogSchema)
  });

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = methods;

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

  const onSubmit = (state: DialogTask) => {
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
          <Grid item xs={12} md={6}>
            <RHFTextField multiline name='answer' label='Правильный ответ' />
          </Grid>
          <Grid item xs={12} md={6}>
            <RHFTextField multiline name='prompt' label='Подсказка к ответу' />
          </Grid>
          <Grid item xs={12} md={6}>
            <RHFTextField multiline rows={6} name='taskSolutionText' label='Решение задания (текст)' />
          </Grid>
          <Grid item xs={12} md={6}>
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
                Решение задания (картинка)
              </Typography>} multiple={false} />
          </Grid>
          <Grid item xs={12} md={6}>
            <RHFCheckbox name='public' label='Опубликовано' />
          </Grid>
          <Grid item xs={12} md={6}>
            <RHFCheckbox name='answerFile' label='Ответ в виде файла' />
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

export default DialogContentTask;