import React, { useState } from 'react';
import { Box, Grid, Stack, Tab, Tabs, Typography } from '@mui/material';
import Page from '../../components/Page';
import { useNavigate } from 'react-router';
import { useGetAllQuery } from '../../store/api/admin/courseApi';
import Empty from '../../components/Empty';
import useTabs from '../../hooks/useTabs';
import CourseCard from '../../components/admins/cards/CourseCard';

const TABS = [
  {value: 'course', label: 'Курсы'},
  {value: 'homework', label: 'Проверка заданий'},
]

const CoursesPage = () => {


  const [skip, setSkip] = useState<number>(0);
  const [take, setTake] = useState<number>(10);
  const { currentTab, onChangeTab } = useTabs('course');

  const {data} = useGetAllQuery({paging: {skip: skip, take: take}, filter: {public: true}})

  return (
    <Page title={'Курсы | Victorovich-inf'}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Курсы
        </Typography>
      </Stack>
      <Tabs
        allowScrollButtonsMobile
        variant="scrollable"
        scrollButtons="auto"
        value={currentTab}
        onChange={onChangeTab}
        sx={{ px: 2 }}
      >
        {TABS.map((tab) => (
          <Tab
            disableRipple
            key={tab.value}
            value={tab.value}
            label={
              <Stack spacing={1} direction="row" alignItems="center">
                <div>{tab.label}</div>
              </Stack>
            }
          />
        ))}
      </Tabs>
      {currentTab === 'course' ? <Box sx={{pt: 3}}>
        {(data && data.rows?.length) ? <Stack direction='row' alignItems='center' flexWrap='wrap'>
          <Grid container spacing={2}>
            {data.rows.map(el => {
              return <Grid sx={{display: 'flex', flex: 1, flexDirection: 'column'}} item xs={12} sm={6} md={4}><CourseCard data={el} /></Grid>;
            })}
          </Grid>
        </Stack> : <Empty />}
      </Box> : null}

    </Page>
  );
};

export default CoursesPage;
