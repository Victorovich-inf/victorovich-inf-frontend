import * as Yup from 'yup';
import { Stack, Alert, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { PATH_AUTH } from '../../../paths';
import { useNavigate } from 'react-router';
import { reset } from '../../../store/actions/authActions';
import { showToast } from '../../../utils/toast';

export default function ResetForm() {
  const navigate = useNavigate()


  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Это не email').required('Email обязателен'),
  });

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await reset({email: data.email});
      showToast({variant: 'check', content: 'Инструкция отправлена на почту'})
    } catch (error) {
      setError('afterSubmit', { ...error, message: error.message });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity='error'>Неправильный логин или пароль</Alert>}
        <RHFTextField name='email' label='Email' />
      </Stack>

      <LoadingButton sx={{ my: 2 }} fullWidth size='large' type='submit' variant='contained' loading={isSubmitting}>
        Сбросить
      </LoadingButton>
      <Typography onClick={() => {
        navigate(PATH_AUTH.login)
      }} alignSelf='flex-end' variant='subtitle2' noWrap style={{
        fontWeight: 300,
        color: '#8B8799',
        fontSize: '16px',
        cursor: 'pointer',
      }}>
        Назад
      </Typography>
    </FormProvider>
  );
}
