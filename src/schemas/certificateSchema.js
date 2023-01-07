import * as Yup from 'yup';

export const certificateSchema = Yup.object().shape({
  number: Yup.number('Это не число').required('Номер нужно указывать'),
  code: Yup.number('Это не число').required('Код нужно указывать'),
  confirmationCode: Yup.number('Это не число').required('Код подтверждения сертификата нужно указывать'),
  balance: Yup.number('Это не число').required('Баланс (номинал) нужно указывать'),
  dateEnd: Yup.string().required('Дату окончания нужно указывать'),
  service_id: Yup.string().required('Услугу нужно указывать'),
  sub_service_id: Yup.string().required('Подусулгу нужно указывать'),
  user_id: Yup.string().required('Пользователя нужно указывать'),
  city_id: Yup.string().required('Город нужно указывать'),
  options: Yup.array()
    .min(1, 'Список опций обязателен к заполнению'),
});
