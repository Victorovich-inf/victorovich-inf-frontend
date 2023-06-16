import React from 'react';
import Page from '../../components/Page';
import { useGetAllForUserQuery } from '../../store/api/admin/courseApi';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { PATH_DASHBOARD } from '../../paths';
import ShopProductList from '../../components/shop/ShopProductList';

const CoursesPage = () => {
  const {data, isLoading} = useGetAllForUserQuery({paging: {skip: 0, take: 100}, filter: {public: true}})

  return (
    <Page title={'Курсы | Victorovich-inf'}>
        <CustomBreadcrumbs
          heading='Курсы'
          links={[
            { name: 'Дашбоард', href: PATH_DASHBOARD.root },
            { name: 'Курсы' },
          ]} action={undefined} moreLink={undefined} activeLast={undefined} sx={undefined}        />

      <ShopProductList loading={isLoading}  courses={data ? data.rows : []}/>
    </Page>
  );
};

export default CoursesPage;
