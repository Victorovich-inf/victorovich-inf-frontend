import { Box, Card, Grid, Stack } from '@mui/material';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import Page from '../../components/Page';
import useLoader from '../../hooks/useLoader';
import { FormProvider, RHFCheckbox, RHFTextField } from '../../components/hook-form';
import { useParams } from 'react-router';
import Typography from '@mui/material/Typography';
import { oneUserCRUD } from '../../http';
import { PATH_DASHBOARD } from '../../paths';
import { useRegisterMutation } from '../../store/api/admin/userApi';
import { useStableNavigate } from '../../contexts/StableNavigateContext';
import { CourseCreateData } from '../../@types/course';
import { fData } from '../../utils/formatNumber';
import { RHFUpload } from '../../components/hook-form/RHFUpload';
import RHFDate from '../../components/hook-form/RHFDate';

function CreateOrEdit() {
  const { loading, start, stop, Preloader } = useLoader(false);
  const navigate = useStableNavigate();
  const params = useParams();
  const [isEdit, setEdit] = React.useState(false);
  const [register] = useRegisterMutation();

  const defaultValues = useMemo(() => ({
    name: '',
    description: '',
    logo: null,
    dateStart: new Date(),
    cost: 0,
    free: false,
  }), []);

  const methods = useForm({
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;


  const onSubmit = async (state: CourseCreateData) => {
  };

  const handleDrop = React.useCallback(
    (acceptedFiles: any[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (newFile) {
        setValue('logo', newFile, { shouldValidate: true });
      }
    },
    [],
  );

  return (
    <Page title={'Добавление курса'}>
      {loading ? Preloader() : <>
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant='h4' gutterBottom>
                Добавление курса
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
                    <Grid item xs={12} md={12}>
                      <RHFTextField name='name' label='Название курса' />
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <RHFUpload
                        name='logo'
                        maxSize={3145728}
                        onDrop={handleDrop}
                        onDelete={() => setValue('logo', null, { shouldValidate: true })}
                        helperText={<Typography
                          variant='caption'
                          sx={{
                            mt: 2,
                            mx: 'auto',
                            display: 'block',
                            textAlign: 'center',
                            color: 'text.secondary',
                          }}
                        >
                          Доступно *.jpeg, *.jpg, *.png, *.gif
                          <br /> максимальный размер {fData(3145728)}
                        </Typography>} multiple={false} />
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <RHFTextField name='description' label='Описание' multiline
                                    rows={5} />
                    </Grid>
                    <Grid item md={6}>
                      <RHFDate name='dateStart' label='Дата начала' />
                    </Grid>
                    <Grid item md={6}>
                      <RHFTextField name='cost' type='number' label='Стоимость' />
                    </Grid>
                    <Grid item md={6}>
                      <RHFCheckbox name='free' label='Бесплатно' />
                    </Grid>
                  </Grid>
                </Stack>
              </Card>
            </Grid>
          </Grid>
          <LoadingButton sx={{ marginTop: 2, marginLeft: 'auto' }} type='submit' variant='contained' size='large'
                         loading={isSubmitting}>
            {isEdit ? 'Изменить' : 'Сохранить и продолжить'}
          </LoadingButton>
        </FormProvider>

      </>}
    </Page>
  );
}

export default CreateOrEdit;
