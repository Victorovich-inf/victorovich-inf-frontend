import React, { useMemo } from 'react';
import Page from '../../components/Page';
import { PATH_DASHBOARD } from '../../paths';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { FormProvider, RHFTextField } from '../../components/hook-form';
import { useForm } from 'react-hook-form';
import { Card, Grid, Stack } from '@mui/material';
import { connect, useDispatch } from 'react-redux';
import { getUserData, setUser } from '../../store/reducers/userReducer';
import { UserData } from '../../@types/user';
import { LoadingButton } from '@mui/lab';
import { yupResolver } from '@hookform/resolvers/yup';
import { userPasswordSchema, userProfileSchema } from '../../schemas/userSchema';
import { useUpdatePasswordMutation, useUpdateProfileMutation } from '../../store/api/admin/userApi';

const Settings = ({ user }: { user: UserData }) => {
  const dispatch = useDispatch()
  const [updateProfile] = useUpdateProfileMutation()
  const [updatePassword] = useUpdatePasswordMutation()

  const defaultValues = useMemo(() => ({
    firstName: user.firstName,
    lastName: user.lastName,
  }), []);

  const defaultValuesPassword = useMemo(() => ({
    oldPassword: '',
    newPassword: '',
  }), []);

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(userProfileSchema)
  });

  const methodsPassword = useForm({
    defaultValues: defaultValuesPassword,
    resolver: yupResolver(userPasswordSchema)
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const {
    handleSubmit: handleSubmitPassword,
    formState: { isSubmitting: isSubmittingPassword },
  } = methodsPassword;

  const onSubmit = async (state: any) => {
    const {user} = await updateProfile(state).unwrap();
    dispatch(setUser(user));
  };

  const onSubmitPassword = async (state: any) => {
    console.log(state);
    await updatePassword(state);
  };

  return (
    <Page title={`Настройки профиля`}>
      <CustomBreadcrumbs
        heading='Настройки профиля'
        links={[
          { name: 'Дашбоард', href: PATH_DASHBOARD.root },
          { name: 'Настройки профиля' },
        ]} action={undefined} moreLink={undefined} activeLast={undefined} sx={undefined} />
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={12}>
                    <RHFTextField name='firstName' label='Имя' />
                  </Grid><
                  Grid item xs={12} md={12}>
                  <RHFTextField name='lastName' label='Фамилия' />
                </Grid>
                </Grid>
              </Stack>
            </Card>
          </Grid>
        </Grid>
        <LoadingButton sx={{ marginY: 2, marginLeft: 'auto' }} type='submit' variant='contained' size='large'
                       loading={isSubmitting}>
          Сохранить
        </LoadingButton>
      </FormProvider>
      <FormProvider methods={methodsPassword} onSubmit={handleSubmitPassword(onSubmitPassword)}>
        <Grid container>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={12}>
                    <RHFTextField name='oldPassword' label='Старый пароль' />
                  </Grid><
                  Grid item xs={12} md={12}>
                  <RHFTextField name='newPassword' label='Новый пароль' />
                </Grid>
                </Grid>
              </Stack>
            </Card>
          </Grid>
        </Grid>
        <LoadingButton sx={{ marginY: 2, marginLeft: 'auto' }} type='submit' variant='contained' size='large'
                       loading={isSubmittingPassword}>
          Сменить
        </LoadingButton>
      </FormProvider>
    </Page>
  );
};

export default connect(
  (state) => ({
    user: getUserData(state),
  }),
)(Settings);