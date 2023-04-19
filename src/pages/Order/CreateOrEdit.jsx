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
import RHFSelect from '../../components/hook-form/RHFSelect';
import { oneOrderCRUD, ordersCRUD } from '../../http';
import { PATH_DASHBOARD } from '../../paths';
import { CitySelect } from '../../components/Select/domainSelects';
import RHFDate from '../../components/hook-form/RHFDate';
import { paymentStatusArray, stateArray } from '../../utils/data';
import UserField from '../../components/Fields/UserField';
import ServicesField from '../../components/Fields/ServicesField';
import SubServicesField from '../../components/Fields/SubServicesField';
import { orderSchema } from '../../schemas/orderSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import RHFOptions from '../../components/hook-form/RHFOptions';

function CreateOrEdit() {
  const { loading, start, stop, Preloader } = useLoader(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const params = useParams();
  const [isEdit, setEdit] = React.useState(false);

  const defaultValues = useMemo(() => ({
    dateOfOrder: new Date(),
    dateOfVisit: new Date(),
    state: 'new',
    paymentStatus: 'paid',

  }), []);


  const methods = useForm({
    defaultValues, resolver: yupResolver(orderSchema),
  });


  const {
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { isSubmitting, errors },
  } = methods;

  const cityId = useWatch({
    control,
    name: 'city_id',
  });

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
        await ordersCRUD.edit({ ...data, id: params.id });
        await enqueueSnackbar('Заказ обновлен', { variant: 'success' });
      } else {
        await ordersCRUD.create(state);
        await enqueueSnackbar('Заказ оформлен', { variant: 'success' });
        navigate(PATH_DASHBOARD.orders.root);
      }
    } catch (e) {
      await enqueueSnackbar(e, { variant: 'error' });
    }
  };

  React.useEffect(() => {
    (async function() {
      start();
      if (params?.id) {
        const res = await oneOrderCRUD.search({ id: params.id });
        if (res) {
          reset({
            ...res,
            options: res.options.map(el => {
              return { ...el, optionId: el.id };
            }),
          });
          setEdit(true);
        }
      }
      stop();
    }());
  }, [params.id, reset, start, stop]);


  return (
    <Page title={isEdit ? `Редактирование заказа ` : `Оформление заказа`}>
      <Box sx={{ paddingLeft: '3rem', paddingRight: '3rem' }}>
        {loading ? Preloader() : <>
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Stack alignItems='center' direction='row' justifyContent='space-between' sx={{ flexGrow: 1 }}>
                <Typography variant='h4' gutterBottom>
                  {isEdit ? `Редактирование заказа ` : `Оформление заказа`}
                </Typography>
                <Stack direction='row' alignItems='center' spacing={2}>
                  {isEdit && <Button onClick={() => navigate(PATH_DASHBOARD.orders.detail(params.id))} color='info'
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
                        <RHFTextField name='number' label='Номер' />
                      </Grid>
                      <Grid item md={6}>
                        <RHFDate name='dateOfOrder' label='Дата заказа' />
                      </Grid>
                      <Grid item md={6}>
                        <RHFDate name='dateOfVisit' label='Дата посещения' />
                      </Grid>
                      <Grid item md={6}>
                        <RHFSelect
                          options={stateArray}
                          optionValueKey={'value'}
                          optionLabelKey={'label'}
                          name={`state`}
                          label={'Статус'}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item md={6}>
                        <RHFSelect
                          options={paymentStatusArray}
                          optionValueKey={'value'}
                          optionLabelKey={'label'}
                          name={`paymentStatus`}
                          label={'Статус оплаты'}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item md={6}>
                        <CitySelect
                          fullWidth
                          controller="city_id"
                          value={cityId}
                          onChange={(val) => setValue('city_id', val)}
                        />
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
            <RHFOptions label="Опции" subServiceId={subServiceId}/>

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