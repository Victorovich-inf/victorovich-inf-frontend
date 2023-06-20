import React, { useMemo } from 'react';
import { Box, Button, Card, DialogContent, Grid, IconButton, Stack, Typography } from '@mui/material';
import { FormProvider, RHFCheckbox, RHFTextField } from '../../hook-form';
import { useForm } from 'react-hook-form';
import { useCourseEditContext } from '../../../utils/context/CourseEditContext';
import AddItem from './AddItem';
import RowElementAdmin from '../editor/RowElementAdmin';
import { useEditTaskMutation } from '../../../store/api/admin/courseApi';
import { yupResolver } from '@hookform/resolvers/yup';
import { editorTaskDialogSchema } from '../../../schemas/editor/dialog/editorDialogSchema';
import RHFSwitch from '../../hook-form/RHFSwitch';
import axios from '../../../utils/axios';
import { TaskEditData } from '../../../@types/task';
import { RHFUpload } from '../../hook-form/RHFUpload';

const CourseLessonAdmin = () => {

  const {selected, content, isTask, handleSave} = useCourseEditContext()

  const elements = useMemo(() => {
    if (selected?.id && Object.keys(content)?.length) {
      let key;

      if ('courseId' in selected) {
        key = `${selected?.id}_lesson`
      } else {
        key = `${selected?.id}_task`
      }

      return content[key]?.elements || []
    }
    return []
  }, [selected, content])

  const [editTask] = useEditTaskMutation();

  const defaultValues = useMemo(() => ({
    name: '',
    prompt: '',
    index: 0,
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
          index: selected?.index || 0,
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
      state.index && formData.append('index', state.index.toString());
      state.taskSolutionText && formData.append('taskSolutionText', state.taskSolutionText);
      formData.append('answerFile', state.answerFile ? '1' : '0');
      formData.append('public', state.public ? '1' : '0');

      if (handleSave) {
        await handleSave()
        await editTask({ id: selected.id.toString(), data: formData as unknown as TaskEditData }).unwrap();
      }
    }
  };

  return (
    <Stack direction="column" spacing={4} flex={1}>
      {selected ? <Stack direction="column" spacing={2} >
        {elements ? elements.map((el, idx) => {
          return <RowElementAdmin key={idx} idx={idx} data={el}/>
        }) : null}
        <AddItem />
      </Stack>: <Box sx={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Урок/задание не выбран</Box>}
      {isTask(selected) ? <Card sx={{p: 2}}>
        <FormProvider
          methods={methods} onSubmit={handleSubmit(onSubmit)}>
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
              <RHFTextField number name='index' label='Позиция (для сортировки, начала с 0)' />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFSwitch name='public' label='Опубликовано' helperText={null} />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFCheckbox name='answerFile' label='Ответ в виде файла' />
            </Grid>
          </Grid>
          <Button sx={{marginLeft: 'auto'}} type='submit'>
            Сохранить
          </Button>
        </FormProvider>
      </Card> : null}
    </Stack>
  );
};

export default CourseLessonAdmin;
