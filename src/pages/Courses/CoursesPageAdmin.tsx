import React, { useState } from 'react';
import { Button, Grid, Stack, Typography } from '@mui/material';
import Page from '../../components/Page';
import CourseCardAdmin from '../../components/admins/cards/CourseCardAdmin';
import { useNavigate } from 'react-router';
import { PATH_DASHBOARD } from '../../paths';
import { useDeleteCourseMutation, useGetAllForAdminQuery } from '../../store/api/admin/courseApi';
import { confirmDialog } from '../../components/dialogs/DialogDelete';
import Empty from '../../components/Empty';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';

const CoursesPageAdmin = () => {
  const [skip, setSkip] = useState<number>(0);
  const [take, setTake] = useState<number>(30);

  const { data } = useGetAllForAdminQuery({ paging: { skip: skip, take: take } });
  const [deleteCourse] = useDeleteCourseMutation();

  const navigate = useNavigate();

  const handleAdd = () => {
    navigate(PATH_DASHBOARD.courses.add);
  };

  const handleDelete = async (id: number) => {
    return confirmDialog('Удаление курса', 'Удалить курс?', async () => {
      try {
        await deleteCourse(id);
      } catch (e) {
        console.log(e);
      }
    });
  };

  return (
    <Page title={'Курсы (администрирование) | Victorovich-inf'}>
      <CustomBreadcrumbs
        heading='Курсы (администрирование)'
        links={[
          { name: 'Дашбоард', href: PATH_DASHBOARD.root },
          { name: 'Курсы (администрирование)' },
        ]} action={<Button fullWidth onClick={handleAdd} variant='outlined'>Добавить курс</Button>} moreLink={undefined} activeLast={undefined} sx={undefined}        />
      {(data && data.rows?.length) ? <Stack direction='row' alignItems='center' flexWrap='wrap'>
        <Grid container spacing={1}>
          {data.rows.map(el => {
            return <Grid key={el.id} sx={{display: 'flex', flex: 1, flexDirection: 'column'}} item xs={12} sm={6} md={4} lg={4} xl={3}><CourseCardAdmin onDelete={handleDelete} data={el} /></Grid>;
          })}
        </Grid>
      </Stack> : <Empty />}
    </Page>
  );
};

export default CoursesPageAdmin;
