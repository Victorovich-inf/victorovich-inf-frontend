import {
  Box,
  Button,
  Card,
  Divider,
  Grid, IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { useMemo } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import Page from '../../components/Page';
import useLoader from '../../hooks/useLoader';
import { FormProvider, RHFTextField } from '../../components/hook-form';
import { useNavigate, useParams } from 'react-router';
import { useSnackbar } from 'notistack';
import Typography from '@mui/material/Typography';
import RHFSelect from '../../components/hook-form/RHFSelect';
import { oneOrderCRUD, oneUserCRUD, ordersCRUD, usersCRUD } from '../../http';
import { PATH_DASHBOARD } from '../../paths';
import { CitySelect } from '../../components/Select/domainSelects';
import RHFDate from '../../components/hook-form/RHFDate';
import { paymentStatusArray, stateArray } from '../../utils/data';
import UserField from '../../components/Fields/UserField';
import ServicesField from '../../components/Fields/ServicesField';
import SubServicesField from '../../components/Fields/SubServicesField';
import Iconify from '../../components/iconify';
import OptionsField from '../../components/Fields/OptionsField';

function CreateOrEdit(props) {
  const { loading, start, stop, Preloader } = useLoader(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const params = useParams();
  const [isEdit, setEdit] = React.useState(false);

  const defaultValues = useMemo(() => ({
    dateOfOrder: new Date(),
    dateOfVisit: new Date(),
    state: 'new',
    paymentStatus: 'paid'

  }), []);


  const methods = useForm({
    defaultValues,
  });


  const {
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { isSubmitting },
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
  });

  const onSubmit = async (state) => {
    try {
      if (isEdit) {
        let data = {...state}
        delete data['users']
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
          });
          setEdit(true);
        }
      }
      stop();
    }());
  }, []);

  const deleteColumnStyles = {
      position: "sticky",
      right: 0,
    },
    cellHeadStyles = {fontWeight: "bold"};

  const onClickDeleteButton = (item) => {
    const index = fields.findIndex(el => el.optionId === item.optionId)
    remove(index);
  }

  return (
    <Page title={isEdit ? `Редактирование заказа ` : `Оформление заказа`}>
      <Box sx={{ paddingLeft: '3rem', paddingRight: '3rem' }}>
        {loading ? Preloader() : <>
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant='h4' gutterBottom>
                  {isEdit ? `Редактирование заказа ` : `Оформление заказа`}
                </Typography>
              </Box>
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
            <Grid container sx={{ mt: 2 }}>
              <Grid item xs={12} md={12}>
                <Card sx={{ p: 3 }}>
                  <Stack justifyContent="space-between" direction='row'>
                    <Typography variant='h4' gutterBottom>
                      Опции
                    </Typography>
                    <OptionsField
                      extraFilter={{
                        service: subServiceId,
                      }}
                      onChange={val => {
                        append({...val, optionId: val.id});
                      }
                      }
                    />
                  </Stack>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell variant={"head"} style={cellHeadStyles}>
                          № n/n
                        </TableCell>
                        <TableCell variant={"head"} style={cellHeadStyles}>
                          Название
                        </TableCell>
                        <TableCell variant={"head"} style={cellHeadStyles}>
                          Кол-во чел. от
                        </TableCell>
                        <TableCell variant={"head"} style={cellHeadStyles}>
                          Кол-во чел. до
                        </TableCell>
                        <TableCell variant={"head"} style={cellHeadStyles}>
                          Длительность
                        </TableCell>
                        <TableCell variant={"head"} style={cellHeadStyles}>
                          Цена
                        </TableCell>
                        <TableCell style={deleteColumnStyles}/>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(fields || []).map((item) => {
                        return (
                          <TableRow>
                            <TableCell variant={"head"} style={cellHeadStyles}>
                              {item.optionId}
                            </TableCell>
                            <TableCell variant={"head"} style={cellHeadStyles}>
                              {item.optionsName}
                            </TableCell>
                            <TableCell variant={"head"} style={cellHeadStyles}>
                              {item.optionsCount1}
                            </TableCell>
                            <TableCell variant={"head"} style={cellHeadStyles}>
                              {item.optionsCount2}
                            </TableCell>
                            <TableCell variant={"head"} style={cellHeadStyles}>
                              {item.duration}
                            </TableCell>
                            <TableCell variant={"head"} style={cellHeadStyles}>
                              {item.optionsNewPrice}
                            </TableCell>
                            <TableCell variant={"head"} align={"right"} style={cellHeadStyles}>
                              <Iconify icon={'material-symbols:delete-forever-rounded'} style={{ fontSize: '1.5rem', cursor: 'pointer' }}
                                       onClick={() => onClickDeleteButton(item)} />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </Card>
              </Grid>
            </Grid>

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