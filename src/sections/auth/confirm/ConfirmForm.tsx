import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Stack, IconButton, InputAdornment, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../../components/iconify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { confirm, register } from '../../../store/actions/authActions';
import { UserConfirmData, UserRegisterData } from '../../../@types/user';
import $authHost from '../../../utils/axios';

export default function ConfirmForm() {
  const navigate = useNavigate()

  const {search} = useLocation()

  useEffect(() => {
    if (search.split('?')[1]) {
      const query = new URLSearchParams(search);
      if (typeof query.get('t') !== 'string') {
        navigate('/404')
      }
    }
  }, [search]);

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    password: Yup.string().min(3, 'Минимум 3 символа')
      .max(50, 'Максимум 50 символов').required('Пароль обязателен'),
  });

  const defaultValues = {
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

  const onSubmit = async (data: UserConfirmData) => {
    const query = new URLSearchParams(search);

    await confirm({ ... data, token: query.get('t') })
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
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
        Сменить пароль
      </LoadingButton>
    </FormProvider>
  );
}
