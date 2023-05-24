import React, { useState } from 'react';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import Page from '../../components/Page';
import CourseCardAdmin from '../../components/admins/cards/CourseCardAdmin';
import { useNavigate } from 'react-router';
import { PATH_DASHBOARD } from '../../paths';
import {
  useCopyCourseMutation,
  useDeleteCourseMutation,
  useGetAllForAdminQuery,
} from '../../store/api/admin/courseApi';
import { confirmDialog } from '../../components/dialogs/DialogDelete';
import Empty from '../../components/Empty';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';

const CoursesPageAdmin = () => {
  const [skip, setSkip] = useState<number>(0);
  const [take, setTake] = useState<number>(30);

  const { data } = useGetAllForAdminQuery({ paging: { skip: skip, take: take } });
  const [deleteCourse] = useDeleteCourseMutation();
  const [copyCourse] = useCopyCourseMutation()

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

  const handleCopy = async (id: number) => {
    await copyCourse(id.toString())
  }

  return (
    <Page title={'Курсы (администрирование) | Victorovich-inf'}>
      <CustomBreadcrumbs
        heading='Курсы (администрирование)'
        links={[
          { name: 'Дашбоард', href: PATH_DASHBOARD.root },
          { name: 'Курсы (администрирование)' },
        ]} action={<Button fullWidth onClick={handleAdd} variant='outlined'>Добавить курс</Button>} moreLink={undefined} activeLast={undefined} sx={undefined}        />
      {(data && data.rows?.length) ?
        <Box
          gap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(3, 1fr)',
            xl: 'repeat(4, 1fr)',
          }}
        >
          {data.rows.map(el => {
            return <CourseCardAdmin key={el.id} onCopy={handleCopy} onDelete={handleDelete} data={el} />;
          })}

        </Box>
       : <Empty />}
    </Page>
  );
};

export default CoursesPageAdmin;
