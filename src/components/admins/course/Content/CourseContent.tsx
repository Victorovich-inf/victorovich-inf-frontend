import React from 'react';
import {  List, ListSubheader, Stack } from '@mui/material';
import CourseListItem from '../CourseListItem';
import CourseAdd from '../CourseAdd';
import CourseLessonAdmin from '../CourseLessonAdmin';
import { CourseData } from '../../../../@types/course';
import useResponsive from '../../../../hooks/useResponsive';

interface CourseContentProps {
  data: CourseData
}

const CourseContent = ({data}: CourseContentProps) => {
  const isMobile = useResponsive('down', 'sm');

  return (
    <>
      <Stack spacing={2} direction={isMobile ? 'column' : 'row'} justifyContent='space-between' sx={{ flex: 1 }}>
        <List
          sx={{
            width: '100%',
            maxWidth: {
              xs: '100%',
              sm: 380
            },
            bgcolor: 'background.paper',
            alignSelf: 'flex-start',
            minHeight: {
              xs: 250,
              sm: 500
            },
          }}
          component='nav'
          aria-labelledby='nested-list-subheader'
          subheader={
            <ListSubheader component='div' id='nested-list-subheader'>
              Уроки и задания
            </ListSubheader>
          }
        >
          {data.Lessons.map(lesson => {
            return <CourseListItem key={lesson.id} data={lesson} />;
          })}
          <CourseAdd id={data.id} label='Добавить урок' type='lesson' />
        </List>
        <CourseLessonAdmin />
      </Stack>
    </>
  );
};

export default CourseContent;