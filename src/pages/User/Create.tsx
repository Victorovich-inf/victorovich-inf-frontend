import { Box, Card, Grid, Stack } from '@mui/material';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import Page from '../../components/Page';
import useLoader from '../../hooks/useLoader';
import { FormProvider, RHFTextField } from '../../components/hook-form';
import { useParams } from 'react-router';
import Typography from '@mui/material/Typography';
import { oneUserCRUD} from '../../http';
import { PATH_DASHBOARD } from '../../paths';
import { UserCreateData } from '../../@types/user';
import { useRegisterMutation } from '../../store/api/admin/userApi';
import { useStableNavigate } from '../../contexts/StableNavigateContext';

function CreateOrEdit() {
  const { loading, start, stop, Preloader } = useLoader(false);
  const navigate = useStableNavigate();
  const params = useParams()
  const [isEdit, setEdit] = React.useState(false);
  const [register] = useRegisterMutation()

  const defaultValues = useMemo(() => ({
    email: ''
  }), []);

  const methods = useForm({
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;


  const onSubmit = async (state: UserCreateData) => {
    await register(state).unwrap()
    navigate(PATH_DASHBOARD.user.root)
  };

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
    <Page title={'Добавление пользователя'}>
        {loading ? Preloader() : <>
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant='h4' gutterBottom>
                  Добавление пользователя
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
                        <RHFTextField name='email' label='Email' />
                      </Grid>
                    </Grid>
                  </Stack>
                </Card>
              </Grid>
            </Grid>
            <LoadingButton sx={{ marginTop: 2, marginLeft: 'auto' }} type='submit' variant='contained' size='large'
                           loading={isSubmitting}>
              {isEdit ? "Изменить" : "Создать"}
            </LoadingButton>
          </FormProvider>

        </>}
    </Page>
  );
}

export default CreateOrEdit;
