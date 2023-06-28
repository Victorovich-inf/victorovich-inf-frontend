// @ts-nocheck
import React, { useEffect, useMemo } from 'react';
import { useCourseEditContext } from '../../../utils/context/CourseEditContext';
import { useForm, useWatch } from 'react-hook-form';
import { FormProvider, RHFTextField } from '../../hook-form';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../iconify';
import { useDropzone } from 'react-dropzone';
import { UploadData } from '../../../@types/course';
import { useUploadImageMutation } from '../../../store/api/admin/courseApi';
import {
  useAnswerFileAgainMutation,
  useAnswerFileMutation,
  useCheckCuratorMutation,
} from '../../../store/api/admin/paidCourseApi';
import { connect } from 'react-redux';
import { getUserData } from '../../../store/reducers/userReducer';
import { UserData } from '../../../@types/user';
import { convertToDate } from '../../../utils/time';
import { TaskAnswerFiles } from '../../../@types/task';
import { downloadFile } from '../../../utils/info';

const TaskContent = ({user}: {user: UserData}) => {
  const { selected, course, answerData, updateProgressLesson, isCurator } = useCourseEditContext();
  const [uploadImage] = useUploadImageMutation()
  const [answerFile] = useAnswerFileMutation()
  const [answerFileAgain] = useAnswerFileAgainMutation()
  const [checkCurator] = useCheckCuratorMutation()
  const [showPrompt, setShowPrompt] = React.useState(false);

  const defaultValues = useMemo(() => ({
    answer: '',
  }), []);

  const methods = useForm({
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    control
  } = methods;

  const answer = useWatch({
    control,
    name: "answer",
  });

  useEffect(() => {
    reset({answer: ''})
  }, [selected])

  const {getRootProps, getInputProps} = useDropzone({
    maxFiles: 1, multiple: false,
    onDrop: async (acceptedFiles1: File[]) => {
      if (acceptedFiles1[0]) {
        let formData = new FormData()
        formData.append('file', acceptedFiles1[0])
        const { filePath } = await uploadImage(formData as unknown as UploadData).unwrap();

        const link = `${process.env.REACT_APP_API_URL}/${filePath}`

        await answerFile({link, taskId: selected?.id.toString() || ''})

      }
    },
  });

  const {getRootProps: getRootProps2, getInputProps: getInputProps2} = useDropzone({
    maxFiles: 1, multiple: false,
    onDrop: async (acceptedFiles1: File[]) => {
      if (acceptedFiles1[0]) {
        let formData = new FormData()
        formData.append('file', acceptedFiles1[0])
        const { filePath } = await uploadImage(formData as unknown as UploadData).unwrap();

        const link = `${process.env.REACT_APP_API_URL}/${filePath}`

        await answerFileAgain({link, taskId: selected?.id.toString() || ''})
      }
    },
  });


  const onSubmit = (state: { answer: string }) => {
    if (selected && 'Lesson' in selected) {
      const lessonId = `${selected.Lesson.id}_lesson`;

      if (updateProgressLesson) {
        updateProgressLesson(lessonId, `${selected.id}_task`, state.answer);
        reset({ answer: '' });
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

  const renderAnswer = () => {
    if (selected && 'answerFile' && selected) {

      if ('answerFile' in selected && !selected?.answerFile) {
        return <LoadingButton disabled={!answer} type='submit' variant='contained'>
          Проверить
        </LoadingButton>
      }

      if ('TaskAnswerFiles' in selected) {
        const answerFile = selected.TaskAnswerFiles.find(el => el.taskId === selected.id && el.userId === user.id);

        if (answerFile) {
          if (answerFile.wrong) {
            return <Stack direction="column" spacing={2}>
              <Typography>Неправильный ответ</Typography>
              <Button variant="outlined" {...getRootProps2()}>
                <input {...getInputProps2()} />
                Загрузить заново
              </Button>
            </Stack>
          } else {
            return <Stack direction="column" spacing={2}>
              <Typography>На проверке у куратора</Typography>
            </Stack>
          }
        }
      }

      return <Stack direction="column" spacing={2}>
          <Typography>Файл на проверку</Typography>
          <Button variant="outlined" {...getRootProps()}>
            <input {...getInputProps()} />
            Загрузить
          </Button>
        </Stack>
    }

    return null
  }

  const renderCurator = () => {
    if (selected) {
      return <Stack width="100%" spacing={1} direction='column'>
        <Typography variant='h6' sx={{ color: 'text.secondary' }}>
          Решение
        </Typography>
        {selected.taskSolutionText ? <Typography variant='subtitle1' sx={{ color: 'text.secondary' }}>
          Текстовое решение: {selected.taskSolutionText}
        </Typography> : null}
        <Typography variant='subtitle1' sx={{ color: 'text.secondary' }}>
          Ответ: {selected.answer}
        </Typography>
        {selected.prompt ? <Typography variant='subtitle1' sx={{ color: 'text.secondary' }}>
          Подсказка: {selected.prompt}
        </Typography> : null}
        {selected?.answerFile && selected.TaskAnswerFiles?.length ? <Stack direction="column" spacing={2}>
          <Typography marginTop={2} variant='h6' sx={{ color: 'text.secondary' }}>
            Ответы учеников
          </Typography>
          <Stack direction="column" spacing={2}>
            {
              selected.TaskAnswerFiles.map((el: TaskAnswerFiles) => {
                return <Stack marginTop={2} flex={1} justifyContent="space-between" key={el.id} direction="row" alignItems="center" spacing={1}>
                  <Typography mr={5} variant="subtitle1">{`${el.User.firstName} ${el.User.lastName}`}</Typography>

                  <div className='file-details'>
                    <div className='file-details-content'>
                      <div className='file-details-info'>
                        <div className='file-details-top'>Ответ</div>
                      </div>
                      <Iconify onClick={() => downloadFile(el.link, `Файл`)} sx={{ cursor: 'pointer' }} icon='material-symbols:download' />
                    </div>
                  </div>

                  <Stack direction="row" spacing={1}>
                    {el.wrong ? <Typography variant='subtitle1' sx={{ color: 'text.secondary' }}>
                      Отклонён
                    </Typography> : <>
                      <Button onClick={() => {
                        checkCurator({ courseId: selected.Lesson.courseId, lessonId: selected.Lesson.id, userId: el.User.id, taskId: selected.id, correctly: false })
                      }} color="error" size="small" startIcon={<Iconify icon="eva:trash-2-outline" />}>
                        Отклонить
                      </Button>
                      <Button onClick={() => {
                        checkCurator({ courseId: selected.Lesson.courseId, lessonId: selected.Lesson.id, userId: el.User.id, taskId: selected.id, correctly: true })
                      }} color="success" size="small" startIcon={<Iconify icon="material-symbols:check-circle-rounded" />}>
                        Принять
                      </Button>
                    </>}
                  </Stack>
                </Stack>
              })
            }
          </Stack>
        </Stack> : null
        }
      </Stack>
    }
    return null
  }

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
          {selected && 'answer' in selected && !selected?.answerFile ? <Grid item xs={12} md={6}>
            <RHFTextField disabled={isCurator} multiline name='answer' label='Ваш ответ' />
          </Grid> : null}
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
        <Stack sx={{ marginTop: 2, alignSelf: 'flex-start', width: '100%' }} direction='row' spacing={2}>
          {!isCurator ? <>
          {renderAnswer()}
          </> : null}
          {isCurator && selected && 'answer' in selected ? renderCurator() : null}
        </Stack>
      </FormProvider>}
    </>
  );
};

export default connect(
  (state) => ({
    user: getUserData(state),
  }),
)(TaskContent);