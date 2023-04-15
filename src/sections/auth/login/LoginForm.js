import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Stack, IconButton, InputAdornment, Alert, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import useAuth from '../../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { auth, setUser } from '../../../store/reducers/userReducer';
import { useDispatch } from 'react-redux';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const { login } = useAuth();

  const onClickAuth = () => {
    window.open(
      'http://localhost:5001/auth/vkontakte-login',
      'Auth',
      'width=650,height=500,status=yes,toolbar=no,menubar=no,location=no',
    );
  };

  const dispatch = useDispatch()

  useEffect(() => {
    window.addEventListener('message', async ({ data, origin }) => {
      const user = data;
      if (typeof user === 'string') {
        const answer = JSON.parse(user);
        if (answer?.data) {
          await localStorage.setItem('accessToken', answer.token);
          await dispatch(setUser(answer.data))
          await dispatch(auth());
        }
      }
    });
  }, []);


  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Это не email').required('Email обязателен'),
    password: Yup.string().required('Пароль обязателен'),
  });

  const defaultValues = {
    email: 'beleberdek@yandex.ru',
    password: '123123',
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
        {!!errors.afterSubmit && <Alert severity="error">Неправильный логин или пароль</Alert>}
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
      <Button onClick={onClickAuth} endIcon={<Iconify icon={'icomoon-free:vk'}/>} sx={{ mb: 2 }}
              fullWidth size="large" type="button" variant="contained" loading={isSubmitting}>
        Войти через
      </Button>
    </FormProvider>
  );
}
