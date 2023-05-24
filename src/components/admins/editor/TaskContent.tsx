import React, { useMemo } from 'react';
import { useCourseEditContext } from '../../../utils/context/CourseEditContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { editorTaskSchema } from '../../../schemas/editor/editorSchema';
import { FormProvider, RHFTextField } from '../../hook-form';
import { Button, Grid, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../iconify';

const TaskContent = () => {
  const { selected, answerData, updateProgressLesson, isCurator } = useCourseEditContext();

  const [showPrompt, setShowPrompt] = React.useState(false);

  const defaultValues = useMemo(() => ({
    answer: '',
  }), []);

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(editorTaskSchema),
  });

  const {
    handleSubmit,
    reset
  } = methods;

  const onSubmit = (state: { answer: string }) => {
    if (selected && 'Lesson' in selected) {
      const lessonId = `${selected.Lesson.id}_lesson`;

      if (updateProgressLesson) {
        updateProgressLesson(lessonId, `${selected.id}_task`, state.answer);
        reset({answer: ''})
      }
    }
  };

  const correctly = useMemo(() => {
    if (selected && answerData && 'Lesson' in selected) {
      const hasKey = Object.keys(answerData).includes(`${selected.Lesson.id}_lesson`);

      if (hasKey) {
        let answer = answerData[`${selected.Lesson.id}_lesson`]?.Tasks?.find(el => el.id === selected.id.toString())?.correctly;
        return !!answer;
      } else {
        return false;
      }

    }
  }, [answerData, selected]);

  return (
    <>
      {correctly ? <>
        <Grid container spacing={3}>
          {selected ? <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography onClick={() => setShowPrompt(false)} variant='body2'>
              Правильный ответ: {'answer' in selected ? selected.answer : ''}
            </Typography>
          </Grid> : null}
        </Grid>
        <LoadingButton startIcon={<Iconify icon='material-symbols:check-circle' />}
                       sx={{ marginTop: 2, alignSelf: 'flex-start' }} variant='contained'>
          Решено
        </LoadingButton>
      </> : <FormProvider
        methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <RHFTextField disabled={isCurator} multiline name='answer' label='Ваш ответ' />
          </Grid>
          {selected ? <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
            {showPrompt ? <Stack spacing={1}>
              <Typography onClick={() => setShowPrompt(false)} variant='body2'>
                {'prompt' in selected ? selected?.prompt : ''}
              </Typography>
              <Typography onClick={() => setShowPrompt(false)} variant='body2'
                          sx={{ cursor: 'pointer', color: '#2065D1' }}>
                Скрыть подсказку
              </Typography>
            </Stack> : 'prompt' in selected && selected?.prompt ?
              <Typography onClick={() => setShowPrompt(true)} variant='body2'
                          sx={{ cursor: 'pointer', color: '#2065D1' }}>
                Показать подсказку
              </Typography> : null}
          </Grid> : null}
        </Grid>
        <Stack sx={{ marginTop: 2, alignSelf: 'flex-start' }} direction="row" spacing={2}>
          {!isCurator ? <LoadingButton  type='submit' variant='contained'>
            Проверить
          </LoadingButton> : null}
          {isCurator &&  selected &&  'answer' in selected ? <>
            <Stack spacing={1} direction="column">
              <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                Решение
              </Typography>
              {selected.taskSolutionText ? <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                Текстовое решение: {selected.taskSolutionText}
              </Typography> : null}
              <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                Ответ: {selected.answer}
              </Typography>
              {selected.prompt ? <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                Подсказка: {selected.prompt}
              </Typography> : null}
            </Stack>
          </> : null}
        </Stack>
      </FormProvider>}
    </>
  );
};

export default TaskContent;