import { useState } from 'react';
import * as Yup from 'yup';
import { Stack, IconButton, InputAdornment, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import useAuth from '../../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, RHFTextField } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Это не email').required('Email обязателен'),
    password: Yup.string().required('Пароль обязателен'),
  });

  const defaultValues = {
    email: 'gena@mail.ru',
    password: '123123123',
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
      await login(data.email, data.password);
    } catch (error) {
      setError('afterSubmit', { ...error, message: error.message });

    }

  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
        <RHFTextField name="email" label="Email" />

        <RHFTextField
          name="password"
          label="Пароль"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton sx={{ my: 2 }} fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Войти
      </LoadingButton>
    </FormProvider>
  );
}
