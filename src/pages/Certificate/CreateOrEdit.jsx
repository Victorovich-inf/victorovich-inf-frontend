import {
  Box,
  Button,
  Card,
  Grid,
  Stack,
} from '@mui/material';
import React, { useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import Page from '../../components/Page';
import useLoader from '../../hooks/useLoader';
import { FormProvider, RHFTextField } from '../../components/hook-form';
import { useNavigate, useParams } from 'react-router';
import { useSnackbar } from 'notistack';
import Typography from '@mui/material/Typography';
import { certificatesCRUD, oneCertificateCRUD } from '../../http';
import { PATH_DASHBOARD } from '../../paths';
import RHFDate from '../../components/hook-form/RHFDate';
import UserField from '../../components/Fields/UserField';
import ServicesField from '../../components/Fields/ServicesField';
import SubServicesField from '../../components/Fields/SubServicesField';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { certificateSchema } from '../../schemas/certificateSchema';
import RHFOptions from '../../components/hook-form/RHFOptions';

function CreateOrEdit() {
  const { loading, start, stop, Preloader } = useLoader(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const params = useParams();
  const [isEdit, setIsEdit] = React.useState(false);

  const defaultValues = useMemo(() => ({
    dateEnd: new Date(),
  }), []);


  const methods = useForm({
    defaultValues, resolver: yupResolver(certificateSchema),
  });


  const {
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { isSubmitting },
  } = methods;

  const user = useWatch({
    control,
    name: 'users',
  });

  const userId = useWatch({
    control,
    name: 'user_id',
  });

  const serviceId = useWatch({
    control,
    name: 'service_id',
  });

  const subServiceId = useWatch({
    control,
    name: 'sub_service_id',
  });

  const onSubmit = async (state) => {
    try {
      if (isEdit) {
        let data = { ...state };
        delete data['users'];
        await certificatesCRUD.edit({ ...data, id: params.id });
        await enqueueSnackbar('Сертификат обновлен', { variant: 'success' });
      } else {
        await certificatesCRUD.create({ ...state, used: false });
        await enqueueSnackbar('Сертификат оформлен', { variant: 'success' });
        navigate(PATH_DASHBOARD.certificates.root);
      }
    } catch (e) {
      await enqueueSnackbar(e, { variant: 'error' });
    }
  };

  React.useEffect(() => {
    (async function() {
      start();
      if (params?.id) {
        const res = await oneCertificateCRUD.search({ id: params.id });
        if (res) {
          reset({
            ...res,
          });
          setIsEdit(true);
        }
      }
      stop();
    }());
  }, []);


  return (
    <Page title={isEdit ? `Редактирование сертификата ` : `Оформление сертификата`}>
      <Box sx={{ paddingLeft: '3rem', paddingRight: '3rem' }}>
        {loading ? Preloader() : <>
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Stack alignItems='center' direction='row' justifyContent='space-between' sx={{ flexGrow: 1 }}>
                <Typography variant='h4' gutterBottom>
                  {isEdit ? `Редактирование сертификата ` : `Оформление сертификата`}
                </Typography>
                <Stack direction='row' alignItems='center' spacing={2}>
                  {isEdit &&
                    <Button onClick={() => navigate(PATH_DASHBOARD.certificates.detail(params.id))} color='info'
                            variant='contained'>
                      Просмотр
                    </Button>}
                  <Button onClick={() => navigate(-1)} variant='outlined'>
                    Назад
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Box>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container>
              <Grid item xs={12} md={12}>
                <Card sx={{ p: 3 }}>
                  <Stack spacing={3}>
                    <Grid container spacing={3}>
                      <Grid item md={6}>
                        <RHFTextField name='number' label='Номер сертификата' />
                      </Grid>
                      <Grid item md={6}>
                        <RHFTextField name='code' label='Код сертификата' />
                      </Grid>
                      <Grid item md={6}>
                        <RHFTextField name='confirmationCode' label='Код подтверждения сертификата' />
                      </Grid>
                      <Grid item md={6}>
                        <RHFTextField name='balance' label='Баланс (номинал)' />
                      </Grid>
                      <Grid item md={6}>
                        <RHFDate name='dateEnd' label='Дата окончания' />
                      </Grid>
                      <Grid item xs={6}>
                        <UserField
                          fullWidth
                          value={userId}
                          object={user}
                          label='Пользователь'
                          onChange={val => {
                            setValue('user_id', val);
                          }
                          }
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <ServicesField
                          fullWidth
                          value={serviceId}
                          onChange={val => {
                            setValue('service_id', val);
                            setValue('sub_service_id', null);
                          }
                          }
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <SubServicesField
                          disabled={!serviceId}
                          fullWidth
                          value={subServiceId}
                          extraFilter={{
                            service: serviceId,
                          }}
                          onChange={val => {
                            setValue('sub_service_id', val);
                          }
                          }
                        />
                      </Grid>
                    </Grid>
                  </Stack>
                </Card>
              </Grid>
            </Grid>
            <RHFOptions label='Опции' subServiceId={subServiceId} />
            <LoadingButton sx={{ marginTop: 2, marginLeft: 'auto' }} type='submit' variant='contained' size='large'
                           loading={isSubmitting}>
              {isEdit ? 'Изменить' : 'Оформить'}
            </LoadingButton>
          </FormProvider>

        </>}
      </Box>
    </Page>
  );
}

export default CreateOrEdit;