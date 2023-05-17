import {
  Card,
  Stack,
  Typography,
  Box, Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from '../paths';
import { confirmDialog } from '../components/dialogs/DialogDelete';
import AdminTable from '../components/admins/table/AdminTable';
import { userColumns } from '../components/admins/table/columns/UserColumns';
import { useDeleteUserMutation, useGetAllQuery } from '../store/api/admin/userApi';
import React from 'react';
import Page from '../components/Page';
import XLSXButton from '../components/admins/XLSXButton';
import CustomBreadcrumbs from '../components/custom-breadcrumbs';

export default function UserPage() {
  const navigate = useNavigate()
  const [deleteUser] = useDeleteUserMutation()

  const handleAdd = () => {
    navigate(PATH_DASHBOARD.user.add)
  }

  const deleteHandler = async (id) => {
    return confirmDialog('Удаление пользователя', 'Удалить пользователя?', async () => {
      try {
        await deleteUser(id);
      } catch (e) {
        console.log(e);
      }
    })
  }

  return (
      <Page title={'Пользователи | Victorovich-inf'}>
        <CustomBreadcrumbs
          heading='Пользователи'
          links={[
            { name: 'Дашбоард', href: PATH_DASHBOARD.root },
            { name: 'Пользователи' },
          ]} action={undefined} moreLink={undefined} activeLast={undefined} sx={undefined}        />

        <Card>
          <AdminTable Button={<>
            <Box sx={{display: 'flex', columnGap: '20px', justifyContent: 'flex-end', padding: 2}}>
              <Button onClick={handleAdd} variant="contained">Добавить пользователя</Button>
              <XLSXButton/>
            </Box>
          </>} onClickDeleteButton={deleteHandler} columns={userColumns} query={useGetAllQuery}/>
        </Card>
      </Page>
  );
}
