import { Card, Grid, Stack } from '@mui/material';
import React, { useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import Page from '../../components/Page';
import useLoader from '../../hooks/useLoader';
import { FormProvider, RHFTextField } from '../../components/hook-form';
import Typography from '@mui/material/Typography';
import { CourseCreateData } from '../../@types/course';
import { fData } from '../../utils/formatNumber';
import { RHFUpload } from '../../components/hook-form/RHFUpload';
import RHFDate from '../../components/hook-form/RHFDate';
import { yupResolver } from '@hookform/resolvers/yup';
import { courseSchema } from '../../schemas/courseSchema';
import { useCreateMutation } from '../../store/api/admin/courseApi';
import { useStableNavigate } from '../../contexts/StableNavigateContext';
import { PATH_DASHBOARD } from '../../paths';
import RHFSwitch from '../../components/hook-form/RHFSwitch';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';

function CreateOrEdit() {
  const { loading, Preloader } = useLoader(false);
  const navigate = useStableNavigate()

  const [create] = useCreateMutation()

  const defaultValues = useMemo(() => ({
    name: '',
    description: '',
    file: null,
    dateStart: new Date(),
    cost: 0,
    oldPrice: 0,
    free: false,
  }), []);

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(courseSchema)
  });

  const {
    handleSubmit,
    setValue,
    control,
    formState: { isSubmitting, errors },
  } = methods;

  const free = useWatch({
    control,
    name: "free",
  });

  const onSubmit = async (state: CourseCreateData) => {
    let formData = new FormData()
    // @ts-ignore
    state.file && formData.append('file', state.file)
    state.name && formData.append('name', state.name)
    state.description && formData.append('description', state.description)
    state.dateStart && formData.append('dateStart', state.dateStart.toString())
    state.cost && formData.append('cost', state.cost.toString())
    state.oldPrice && formData.append('oldPrice', state.oldPrice.toString())
    state.free && formData.append('free', state.free ? '1' : '0')

    const {data} = await create(formData as unknown as CourseCreateData).unwrap();

    navigate(PATH_DASHBOARD.courses.edit(data.id))
  };

  const handleDrop = React.useCallback(
    (acceptedFiles: any[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (newFile) {
        setValue('file', newFile, { shouldValidate: true });
      }
    },
    [],
  );

  return (
    <Page title={'Добавление курса'}>
      {loading ? Preloader() : <>
        <CustomBreadcrumbs
          heading='Добавление курса'
          links={[
            { name: 'Дашбоард', href: PATH_DASHBOARD.root },
            { name: 'Курсы', href: PATH_DASHBOARD.courses.root },
            { name: 'Добавление' },
          ]} action={undefined} moreLink={undefined} activeLast={undefined} sx={undefined}        />
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
            <Grid item xs={12} md={12}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                      <RHFTextField name='name' label='Название курса' />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <RHFUpload
                        name='file'
                        maxSize={3145728}
                        onDrop={handleDrop}
                        onDelete={() => setValue('file', null, { shouldValidate: true })}
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
                    <Grid item xs={12} md={6}>
                      <RHFTextField name='description' label='Описание' multiline
                                    rows={5} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <RHFDate name='dateStart' label='Дата начала' />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <RHFTextField disabled={free} name='cost' type='number' label='Стоимость' />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <RHFTextField disabled={free} name='oldPrice' type='number' label='Старая цена' />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <RHFSwitch name='free' label='Бесплатно' helperText={null} />
                    </Grid>
                  </Grid>
                </Stack>
              </Card>
            </Grid>
          </Grid>
          <LoadingButton sx={{ marginTop: 2, marginLeft: 'auto' }} type='submit' variant='contained' size='large'
                         loading={isSubmitting}>
            {'Сохранить и продолжить'}
          </LoadingButton>
        </FormProvider>

      </>}
    </Page>
  );
}

export default CreateOrEdit