import { Card, Checkbox, Divider, Grid, Stack } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import Page from '../../components/Page';
import useLoader from '../../hooks/useLoader';
import { FormProvider, RHFCheckbox, RHFTextField } from '../../components/hook-form';
import { useParams } from 'react-router';
import { oneUserCRUD } from '../../http';
import { PATH_DASHBOARD } from '../../paths';
import { UserCreateData } from '../../@types/user';
import { useRegisterMutation } from '../../store/api/admin/userApi';
import { useStableNavigate } from '../../contexts/StableNavigateContext';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import RHFDateTime from '../../components/hook-form/RHFDateTime';

function CreateOrEdit() {
  const { loading, start, stop, Preloader } = useLoader(false);
  const navigate = useStableNavigate();
  const params = useParams();
  const [isEdit, setEdit] = useState(false);
  const [register] = useRegisterMutation();

  const defaultValues = useMemo(() => ({
    email: '',
    hasSub: false,
    start: new Date(),
    end: new Date(),
  }), []);

  const methods = useForm({
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = methods;

  const hasSub = useWatch({
    control,
    name: "hasSub",
  });

  const onSubmit = async (state: UserCreateData) => {
    await register(state).unwrap();
    navigate(PATH_DASHBOARD.user.root);
  };

  React.useEffect(() => {
    (async function() {
      start();
      if (params?.id) {
        const res = await oneUserCRUD.search({ id: params.id });
        if (res) {
          reset({
            ...res,
          });
          setEdit(true);
        }
      }
      stop();
    }());
  }, []);

  return (
    <Page title={'Добавление пользователя'}>
      {loading ? Preloader() : <>
        <CustomBreadcrumbs
          heading='Добавление пользователя'
          links={[
            { name: 'Дашбоард', href: PATH_DASHBOARD.root },
            { name: 'Пользователи', href: PATH_DASHBOARD.user.root },
            { name: 'Добавление пользователя' },
          ]} action={undefined} moreLink={undefined} activeLast={undefined} sx={undefined} />
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
            <Grid item xs={12} md={12}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                      <RHFTextField name='email' label='Email' />
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 3, borderStyle: 'dashed' }} />
                  <RHFCheckbox name='hasSub' label='Есть подписка' />
                  {hasSub ? <Stack
                    spacing={2}
                    justifyContent='flex-end'
                    direction={{ xs: 'column', md: 'row' }}
                    sx={{ width: 1 }}
                  >
                    <RHFDateTime name='start' label='От какого числа оплата' />
                    <RHFDateTime name='end' label='До какого числа оплата' />
                  </Stack> : null}
                </Stack>
              </Card>
            </Grid>
          </Grid>
          <LoadingButton sx={{ marginTop: 2, marginLeft: 'auto' }} type='submit' variant='contained' size='large'
                         loading={isSubmitting}>
            {isEdit ? 'Изменить' : 'Создать'}
          </LoadingButton>
        </FormProvider>

      </>}
    </Page>
  );
}

export default CreateOrEdit;
