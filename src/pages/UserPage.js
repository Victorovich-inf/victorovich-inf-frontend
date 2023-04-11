import { Helmet } from 'react-helmet-async';
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
import useReload from '../hooks/useReload';
import Page from '../components/Page';

export default function UserPage() {
  const navigate = useNavigate()
  const [deleteUser] = useDeleteUserMutation()
  const { reload, reloadValue } = useReload();

  const handleAdd = () => {
    navigate(PATH_DASHBOARD.user.add)
  }

  const handleEdit = (id) => {
    navigate(PATH_DASHBOARD.user.edit(id))
  }

  const viewPage = (id) => {
    navigate(PATH_DASHBOARD.user.detail(id))
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
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Пользователи
          </Typography>
        </Stack>

        <Card>
          <AdminTable Button={<>
            <Box sx={{display: 'flex', columnGap: '20px', justifyContent: 'flex-end', padding: 2}}>
              <Button onClick={handleAdd} variant="contained">Добавить пользователя</Button>
              <Button variant="outlined">Импортировать csv</Button>
            </Box>
          </>} onClickDeleteButton={deleteHandler} columns={userColumns} query={useGetAllQuery}/>
        </Card>
      </Page>
  );
}
