import { Box, Card, Container, Divider, Grid, Stack, Tab, Tabs } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import Page from '../../components/Page';
import useLoader from '../../hooks/useLoader';
import { FormProvider, RHFTextField } from '../../components/hook-form';
import { useNavigate, useParams } from 'react-router';
import { useSnackbar } from 'notistack';
import Typography from '@mui/material/Typography';
import RHFDate from '../../components/hook-form/RHFDate';
import RHFSelect from '../../components/hook-form/RHFSelect';
import { oneUserCRUD, usersCRUD } from '../../http';
import { PATH_DASHBOARD } from '../../paths';
import { CitySelect } from '../../components/Select/domainSelects';

function View(props) {
  const { loading, start, stop, Preloader } = useLoader(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const params = useParams()
  const [isEdit, setEdit] = React.useState(false);

  const defaultValues = useMemo(() => ({}), []);


  const methods = useForm({
    defaultValues,
  });


  const {
    handleSubmit,
    setValue,
    control,
    reset,
    getValues,
    formState: { isSubmitting },
  } = methods;

  const cityId = useWatch({
    control,
    name: "city_id",
  });

  React.useEffect(() => {
    (async function () {
      start()
      if (params?.id) {
        const res = await oneUserCRUD.search({id: params.id});
        if (res) {
          reset({
            ...res
          })
          setEdit(true);
        }
      }
      stop()
    }())
  }, [])



  return (
    <Page title={`Просмотр пользователя`}>
      <Box sx={{ paddingLeft: '3rem', paddingRight: '3rem' }}>
        {loading ? Preloader() : <>
          <Box sx={{ mb: 5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant='h4' gutterBottom>
                  Просмотр пользователя
                </Typography>
              </Box>
            </Box>
          </Box>
          <FormProvider methods={methods}>
            <Grid container>
              <Grid item xs={12} md={12}>
                <Card sx={{ p: 3 }}>
                  <Stack spacing={3}>
                    <Grid container spacing={3}>
                      <Grid item md={6}>
                        <RHFTextField name='name' label='Логин' />
                      </Grid>
                      <Grid item md={6}>
                        <RHFTextField name='email' label='Email' />
                      </Grid>
                      <Grid item md={6}>
                        <RHFTextField name='firstName' label='Имя' />
                      </Grid>
                      <Grid item md={6}>
                        <RHFTextField name='lastName' label='Фамилия' />
                      </Grid>
                      <Grid item md={6}>
                        <RHFTextField name='address' label='Адрес' />
                      </Grid>
                      <Grid item md={6}>
                        <RHFTextField name='phone' label='Телефон' />
                      </Grid>
                      <Grid item md={6}>
                        <RHFSelect
                          options={['male', 'female']}
                          name={`sex`}
                          label={'Пол'}
                          InputLabelProps={{shrink: true}}
                        />
                      </Grid>
                      <Grid item md={6}>
                        <CitySelect
                          fullWidth
                          value={cityId}
                          onChange={(val) => setValue('city_id', val)}
                        />
                      </Grid>
                      {!isEdit && <Grid item md={6}>
                        <RHFTextField name='password' label='Пароль' />
                      </Grid>}
                      {/*<Grid item md={6}>*/}
                      {/*  <RHFDate name='dateOfBirth' label='Дата рождения' />*/}
                      {/*</Grid>*/}
                    </Grid>
                  </Stack>
                </Card>
              </Grid>
            </Grid>
          </FormProvider>

        </>}
      </Box>
    </Page>
  );
}

export default View;