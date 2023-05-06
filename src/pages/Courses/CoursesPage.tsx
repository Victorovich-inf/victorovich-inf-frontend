import React, { useState } from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import Page from '../../components/Page';
import { useGetAllForUserQuery } from '../../store/api/admin/courseApi';
import Empty from '../../components/Empty';
import CourseCard from '../../components/admins/cards/CourseCard';


const CoursesPage = () => {


  const [skip, setSkip] = useState<number>(0);
  const [take, setTake] = useState<number>(30);

  const {data} = useGetAllForUserQuery({paging: {skip: skip, take: take}, filter: {public: true}})

  return (
    <Page title={'Курсы | Victorovich-inf'}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Курсы
        </Typography>
      </Stack>
      {(data && data.rows?.length) ? <Stack direction='row' alignItems='center' flexWrap='wrap'>
        <Grid container spacing={1}>
          {data.rows.map(el => {
            return <Grid sx={{display: 'flex', flex: 1, flexDirection: 'column'}} item xs={12}  sm={6} md={4}><CourseCard data={el} /></Grid>;
          })}
        </Grid>
      </Stack> : <Empty />}
    </Page>
  );
};

export default CoursesPage;
