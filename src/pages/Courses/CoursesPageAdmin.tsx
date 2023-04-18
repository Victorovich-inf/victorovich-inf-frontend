import React, { useState } from 'react';
import { Button, Grid, Stack, Typography } from '@mui/material';
import Page from '../../components/Page';
import CourseCard from '../../components/admins/cards/CourseCard';
import { useNavigate } from 'react-router';
import { PATH_DASHBOARD } from '../../paths';
import { useDeleteCourseMutation, useGetAllQuery } from '../../store/api/admin/courseApi';
import { confirmDialog } from '../../components/dialogs/DialogDelete';
import Empty from '../../components/Empty';

const CoursesPageAdmin = () => {
  const [skip, setSkip] = useState<number>(0);
  const [take, setTake] = useState<number>(10);

  const {data} = useGetAllQuery({paging: {skip: skip, take: take}})
  const [deleteCourse] = useDeleteCourseMutation()

  const navigate = useNavigate()

  const handleAdd = () => {
    navigate(PATH_DASHBOARD.courses.add)
  }

  const handleDelete = async (id: number) => {
    return confirmDialog('Удаление курса', 'Удалить курс?', async () => {
      try {
        await deleteCourse(id)
      } catch (e) {
        console.log(e);
      }
    })
  }

  return (
    <Page title={'Курсы (администрирование) | Victorovich-inf'}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Курсы (админ.)
        </Typography>
        <Button onClick={handleAdd} variant="outlined">Добавить курс</Button>
      </Stack>
      {(data && data.rows?.length) ? <Stack direction="row" alignItems="center" flexWrap="wrap">
        <Grid container spacing={3}>
          {data.rows.map(el => {
            return <Grid item xs={12} sm={6} md={4}><CourseCard onDelete={handleDelete} data={el}/></Grid>
          })}
        </Grid>
      </Stack> : <Empty/>}
    </Page>
  );
};

export default CoursesPageAdmin;
