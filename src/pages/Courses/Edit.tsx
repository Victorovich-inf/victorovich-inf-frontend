import {
  Box,
  List,
  ListSubheader,
  Stack,
} from '@mui/material';
import React from 'react';
import Page from '../../components/Page';
import useLoader from '../../hooks/useLoader';
import Typography from '@mui/material/Typography';
import { useGetOneQuery } from '../../store/api/admin/courseApi';
import { useParams } from 'react-router';
import CourseListItem from '../../components/admins/course/CourseListItem';
import CourseLesson from '../../components/admins/course/CourseLesson';
import CourseAdd from '../../components/admins/course/CourseAdd';
import { LessonData } from '../../@types/lesson';
import { TaskData } from '../../@types/task';
import { CourseEditProvider, useCourseEditContext } from '../../utils/context/CourseEditContext';

function Edit() {
  const { loading, Preloader } = useLoader(false);
  const { id } = useParams()

  const [selected, setSelected] = React.useState<LessonData | TaskData | null>(null)

  const handleSetSelected = (data: LessonData | TaskData) => {
    setSelected(data)
  }

  const {data} = useGetOneQuery(id || '')

  return (
    <Page title={'Добавление курса'}>
      <CourseEditProvider value={{selected, handleSetSelected}}>
        {loading ? Preloader() : data ? <>
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant='h4' gutterBottom>
                  Редактирование курса "{data.name}"
                </Typography>
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
