import * as Yup from 'yup';

export const userProfileSchema = Yup.object().shape({
  firstName: Yup.string().required('Имя не может быть пустым'),
  lastName: Yup.string().required('Фамилия не может быть пустым'),
});

export const userPasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().min(3, 'Минимум 3 символа')
    .max(50, 'Максимум 50 символов').required('Пароль обязателен'),
  newPassword: Yup.string().min(3, 'Минимум 3 символа')
    .max(50, 'Максимум 50 символов').required('Пароль обязателен'),
});
