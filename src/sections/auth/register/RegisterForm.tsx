import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Stack, IconButton, InputAdornment, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../../components/iconify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { register } from '../../../store/actions/authActions';
import { UserRegisterData } from '../../../@types/user';
import $authHost from '../../../utils/axios';

export default function RegisterForm() {
  const navigate = useNavigate()

  const {search} = useLocation()


  useEffect(() => {
    if (search.split('?')[1]) {
      const query = new URLSearchParams(search);
      if (typeof query.get('t') !== 'string') {
        navigate('/404')
      } else {
        $authHost.post('/auth/has-account', {token: query.get('t'), course: query.get('course')}).then(res => {
          if (res.data?.token) {
            localStorage.setItem('accessToken', res.data.token);
            window.location.reload();
          }
        }).catch(error => {
          console.log(error?.response?.status);
          if (error?.response?.status === 500) {
            navigate('/404')
          }
        })
      }
    }
  }, [search]);


  const onClickAuth = () => {
    const query = new URLSearchParams(search);
    window.open(
      `${process.env.REACT_APP_API_URL}/auth/vkontakte-register?t=${query.get('t')}&course=${query.get('course')}`,
      'Register',
      'width=650,height=500,status=yes,toolbar=no,menubar=no,location=no',
    );
  };

  useEffect(() => {
    window.addEventListener('message', async ({ data, origin }) => {
      const user = data;
      if (typeof user === 'string') {
        const profile = JSON.parse(user);
        if (profile?.data) {
          const query = new URLSearchParams(search);
          await register({ ...profile.data, token: query.get('t'), course: query.get('course'), vkId: profile?.data.id, password: (Math.random() + 1).toString(36).substring(7) + '123123' })
        }
      }
    });
  }, []);

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('Имя обязателено'),
    lastName: Yup.string().required('Фамилия обязателена'),
    password: Yup.string().required('Пароль обязателен'),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: UserRegisterData) => {
    const query = new URLSearchParams(search);

    await register({ ... data, course: query.get('course'), token: query.get('t') })
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="firstName" label="Введите имя" />
        <RHFTextField name="lastName" label="Введите фамилию" />
        <RHFTextField
          name="password"
          label="Введите пароль"
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
        Зарегистрироваться
      </LoadingButton>
      <Button onClick={onClickAuth} endIcon={<Iconify icon={'icomoon-free:vk'}/>} sx={{ mb: 2 }}
              fullWidth size="large" type="button" variant="contained">
        Зарегистрироваться через
      </Button>
    </FormProvider>
  );
}
