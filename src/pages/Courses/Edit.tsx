import {
  Box, Button,
  List,
  ListSubheader,
  Stack,
} from '@mui/material';
import React from 'react';
import Page from '../../components/Page';
import useLoader from '../../hooks/useLoader';
import Typography from '@mui/material/Typography';
import { useGetOneQuery, useSavePageMutation } from '../../store/api/admin/courseApi';
import { useParams } from 'react-router';
import CourseListItem from '../../components/admins/course/CourseListItem';
import CourseLesson from '../../components/admins/course/CourseLesson';
import CourseAdd from '../../components/admins/course/CourseAdd';
import { LessonData } from '../../@types/lesson';
import { TaskData } from '../../@types/task';
import { CourseEditProvider } from '../../utils/context/CourseEditContext';
import { Content, ContentData } from '../../@types/editor';
import { LoadingButton } from '@mui/lab';

function Edit() {
  const { loading, Preloader } = useLoader(false);
  const [content, setContent] = React.useState<Content>({})
  const [savePage] = useSavePageMutation()

  const { id } = useParams()

  const [selected, setSelected] = React.useState<LessonData | TaskData | null>(null)

  const handleSetSelected = (data: LessonData | TaskData) => {
    setSelected(data)
  }

  const handleSave = () => {
    if (id)
    savePage({id: +id, data: content})
  }

  const handleChangeContent = (data: ContentData) => {
    if (selected?.id) {
      if ('courseId' in selected && selected?.courseId) {
        setContent((prev) => {
          let oldArray = prev[`${selected?.id}_lesson`]?.elements
          let idx = oldArray?.findIndex(el => el.id === data.id);

          oldArray[idx] = {...data}

          return {...prev, [`${selected?.id}_lesson`]: {
              public: prev[`${selected?.id}_lesson`].public,
              elements: [...oldArray]
            }}
        })
      } else if ('lessonId' in selected && selected?.lessonId) {
        setContent((prev) => {
          let oldArray = prev[`${selected?.id}_task`]?.elements
          let idx = oldArray?.findIndex(el => el.id === data.id);

          oldArray[idx] = {...data}

          return {...prev, [`${selected?.id}_task`]: {
              public: prev[`${selected?.id}_lesson`].public,
              elements: [...oldArray]
            }}
        })
      }
    }
  }

  const handleSetContent = (data: ContentData) => {
    if (selected?.id) {

      if ('courseId' in selected && selected?.courseId) {
        setContent((prev) => {

          const oldArray = prev[`${selected?.id}_lesson`]?.elements || []

          return {...prev, [`${selected?.id}_lesson`]: {
                public: false,
                elements: [
                  ...oldArray,
                  data
                ]
            }}
        })
      } else if ('lessonId' in selected && selected?.lessonId) {
        setContent((prev) => {

          const oldArray = prev[`${selected?.id}_task`]?.elements || []

          return {...prev, [`${selected?.id}_task`]: {
              public: false,
              elements: [
                ...oldArray,
                data
              ]
            }}
        })
      }
    }
  }

  const {data} = useGetOneQuery(id || '')

  return (
    <Page title={'Добавление курса'}>
      <CourseEditProvider value={{selected, handleSetSelected, content, handleSetContent, handleChangeContent}}>
        {loading ? Preloader() : data ? <>
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant='h4' gutterBottom>
                  Редактирование курса "{data.name}"
                </Typography>
                <Stack sx={{ marginTop: 2, marginLeft: 'auto' }} spacing={2} direction="row">
                  <Button sx={{alignSelf: 'flex-end'}} variant="outlined">Опубликовать</Button>
                  <LoadingButton onClick={handleSave} type='submit' variant='contained'>
                    {'Сохранить'}
                  </LoadingButton>
                </Stack>
              </Box>
            </Box>
          </Box>
          <Stack spacing={2} direction="row" justifyContent="space-between" sx={{flex: 1}} >
            <List
              sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper', alignSelf: 'flex-start', minHeight: 500 }}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  Уроки и задания
                </ListSubheader>
              }
            >
              {data.Lessons.map(lesson => {
                return <CourseListItem key={lesson.id} data={lesson}/>
              })}
              <CourseAdd id={data.id} label="Добавить урок" type="lesson"/>
            </List>
            <CourseLesson/>
          </Stack>

        </> : null}
      </CourseEditProvider>
    </Page>
  );
}

export default Edit;
