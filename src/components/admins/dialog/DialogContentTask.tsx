import React, { useMemo } from 'react';
import { DialogContent, Grid, Typography } from '@mui/material';
import { RHFUpload } from '../../hook-form/RHFUpload';
import { useForm } from 'react-hook-form';
import { FormProvider, RHFCheckbox, RHFTextField } from '../../hook-form';
import { useCourseEditContext } from '../../../utils/context/CourseEditContext';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import { yupResolver } from '@hookform/resolvers/yup';
import { editorTaskDialogSchema } from '../../../schemas/editor/dialog/editorDialogSchema';
import RHFSwitch from '../../hook-form/RHFSwitch';
import { TaskEditData } from '../../../@types/task';
import { useEditTaskMutation } from '../../../store/api/admin/courseApi';
import axios from '../../../utils/axios';

const DialogContentTask = () => {

  const { selected } = useCourseEditContext();

  const [editTask] = useEditTaskMutation();

  const defaultValues = useMemo(() => ({
    name: '',
    prompt: '',
    answer: '',
    taskSolutionText: '',
    file: null,
    public: false,
    answerFile: false,

  }), []);

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(editorTaskDialogSchema),
  });

  const {
    handleSubmit,
    setValue,
    reset,
  } = methods;

  React.useEffect(() => {
    if (selected) {
      if ('prompt' in selected) {
        reset({
          prompt: selected?.prompt || '',
          name: selected?.name || '',
          answer: selected?.answer || '',
          taskSolutionText: selected?.taskSolutionText || '',
          public: selected?.public || false,
          answerFile: selected?.answerFile || false,
        });
      }

      if ('taskSolutionFile' in selected && selected.taskSolutionFile) {
        const link = `${process.env.REACT_APP_API_URL}/${selected.taskSolutionFile}`
        axios.get(link, {responseType: 'blob'}).then(response => {
          setValue('file', {... response.data, preview: link }, { shouldValidate: true });
        })
      }
    }
  }, [selected])

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

  const onSubmit = async (state: TaskEditData) => {
    let formData = new FormData();
    if (selected) {
      state.file && state.file.size && formData.append('file', state.file);
      state.name && formData.append('name', state.name);
      state.answer && formData.append('answer', state.answer);
      state.prompt && formData.append('prompt', state.prompt);
      state.taskSolutionText && formData.append('taskSolutionText', state.taskSolutionText);
      state.answerFile && formData.append('answerFile', state.answerFile ? '1' : '0');
      state.public && formData.append('public', state.public ? '1' : '0');

      await editTask({ id: selected.id.toString(), data: formData as unknown as TaskEditData }).unwrap();
    }
  };

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
            <RHFSwitch name='public' label='Опубликовано' helperText={null} />
          </Grid>
          <Grid item xs={12} md={6}>
            <RHFCheckbox name='answerFile' label='Ответ в виде файла' />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button type='submit'>
          Сохранить
        </Button>
      </DialogActions>
    </FormProvider>
  );
};

export default DialogContentTask;