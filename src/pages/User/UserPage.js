import {
  Card,
  Box, Button, Stack, TextField, MenuItem, IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../paths';
import { confirmDialog } from '../../components/dialogs/DialogDelete';
import AdminTable from '../../components/admins/table/AdminTable';
import { userColumns } from '../../components/admins/table/columns/UserColumns';
import { useDeleteUserMutation, useGetAllQuery } from '../../store/api/admin/userApi';
import React, { useMemo, useState } from 'react';
import Page from '../../components/Page';
import XLSXButton from '../../components/admins/XLSXButton';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import useResponsive from '../../hooks/useResponsive';
import Iconify from '../../components/iconify';
import { useForm } from 'react-hook-form';
import { FormProvider, RHFTextField } from '../../components/hook-form';

const ROLE_OPTIONS = [
  { value: null, title: 'Все' },
  { value: 1, title: 'Администратор' },
  { value: 2, title: 'Куратор' },
  { value: 0, title: 'Пользователь' },
];

export default function UserPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [deleteUser] = useDeleteUserMutation();
  const isMobile = useResponsive('down', 'sm');
  const defaultValues = useMemo(() => ({
    name: '',
  }), []);

  const methods = useForm({
    defaultValues,
  });

  const {
    handleSubmit,
  } = methods;

  const handleAdd = () => {
    navigate(PATH_DASHBOARD.user.add);
  };

  const handleFilterRole = (event) => {
    setRole(event.target.value);
  };

  const deleteHandler = async (id) => {
    return confirmDialog('Удаление пользователя', 'Удалить пользователя?', async () => {
      try {
        await deleteUser(id);
      } catch (e) {
        console.log(e);
      }
    });
  };

  const onSubmit = ({ lastName }) => {
    setLastName(lastName);
  };

  return (
    <Page title={'Пользователи | Victorovich-inf'}>
      <CustomBreadcrumbs
        heading='Пользователи'
        links={[
          { name: 'Дашбоард', href: PATH_DASHBOARD.root },
          { name: 'Пользователи' },
        ]} action={undefined} moreLink={undefined} activeLast={undefined} sx={undefined} />

      <Card>
        <AdminTable filter={{
          ...(role !== null && {
            role,
          }),
          ...(lastName && {
            lastName,
          }),
        }} Button={<Stack direction={isMobile ? 'column' : 'row'} spacing={isMobile ? 2 : 0}
                          justifyContent='space-between' alignItems='center' sx={{
          paddingLeft: '20px',
          paddingRight: '20px',
          paddingTop: '24px',
          paddingBottom: '24px',
        }}>
          <Stack direction='row' alignItems="center" spacing={1} flex={1}>
            <TextField
              size='small'
              fullWidth
              value={role}
              select
              onChange={handleFilterRole}
              label='Роль'
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    sx: {
                      maxHeight: 260,
                    },
                  },
                },
              }}
              sx={{
                maxWidth: { sm: 240 },
                textTransform: 'capitalize',
              }}
            >
              {ROLE_OPTIONS.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  sx={{
                    mx: 1,
                    borderRadius: 0.75,
                    typography: 'body2',
                    textTransform: 'capitalize',
                  }}
                >
                  {option.title}
                </MenuItem>
              ))}
            </TextField>
            <FormProvider
              methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Stack direction='row' alignItems='center'>
                <RHFTextField size='small' name='lastName' label='Фамилия'  />
                <IconButton type='submit'>
                  <Iconify icon='material-symbols:check-circle-rounded' />
                </IconButton>
              </Stack>
            </FormProvider>
          </Stack>
          <Box sx={{ display: 'flex', columnGap: '10px', justifyContent: 'flex-end' }}>
            <Button onClick={handleAdd} variant='contained'>Добавить пользователя</Button>
            <XLSXButton />
          </Box>
        </Stack>} onClickDeleteButton={deleteHandler} columns={userColumns} query={useGetAllQuery} />
      </Card>
    </Page>
  );
}
