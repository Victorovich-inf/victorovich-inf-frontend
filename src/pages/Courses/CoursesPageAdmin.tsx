import React from 'react';
import { Button, Stack, Typography } from '@mui/material';
import Page from '../../components/Page';
import CourseCard from '../../components/admins/cards/CourseCard';
import { useNavigate } from 'react-router';
import { PATH_DASHBOARD } from '../../paths';

const CoursesPageAdmin = () => {

  const navigate = useNavigate()

  const handleAdd = () => {
    navigate(PATH_DASHBOARD.courses.add)
  }

  return (
    <Page title={'Курсы (администрирование) | Victorovich-inf'}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Курсы (администрирование)
        </Typography>
        <Button onClick={handleAdd} variant="outlined">Добавить курс</Button>
      </Stack>
      <Stack direction="row" alignItems="center" gap="20px" flexWrap="wrap">
        <CourseCard/>
        <CourseCard/>
        <CourseCard/>
      </Stack>
    </Page>
  );
};

export default CoursesPageAdmin;