import React, { useState } from 'react';
import Page from '../../components/Page';
import { useGetAllForUserQuery } from '../../store/api/admin/courseApi';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { PATH_DASHBOARD } from '../../paths';
import ShopProductList from '../../components/shop/ShopProductList';
import { Stack } from '@mui/material';
import ShopCourseSearch from '../../components/shop/filter/ShopCourseSearch';

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

const CoursesPage = () => {

  const [sortBy, setSortBy] = useState('latest');
  const [skip, setSkip] = useState<number>(0);
  const [take, setTake] = useState<number>(30);

  const handleChangeSortBy = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSortBy(event.target.value);
  };

  const {data, isLoading} = useGetAllForUserQuery({paging: {skip: skip, take: take}, filter: {public: true}})

  return (
    <Page title={'Курсы | Victorovich-inf'}>
        <CustomBreadcrumbs
          heading='Курсы'
          links={[
            { name: 'Дашбоард', href: PATH_DASHBOARD.root },
            { name: 'Курсы' },
          ]} action={undefined} moreLink={undefined} activeLast={undefined} sx={undefined}        />

      <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
        <ShopCourseSearch />
        {/*<ShopCourseSort sortBy={sortBy} sortOptions={SORT_OPTIONS} onSort={handleChangeSortBy} />*/}
      </Stack>

      <ShopProductList loading={isLoading}  courses={data ? data.rows : []}/>
    </Page>
  );
};

export default CoursesPage;
