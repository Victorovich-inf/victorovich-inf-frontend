import * as Yup from 'yup';

export const orderSchema = Yup.object().shape({
  number: Yup.number('Это не число').required('Номер нужно указывать'),
  service_id: Yup.string().required('Услугу нужно указывать'),
  sub_service_id: Yup.string().required('Подусулгу нужно указывать'),
  user_id: Yup.string().required('Пользователя нужно указывать'),
  city_id: Yup.string().required('Город нужно указывать'),
  options: Yup.array()
    .min(1, 'Список опций обязателен к заполнению'),
});
