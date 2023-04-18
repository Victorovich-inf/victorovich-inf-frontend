import * as Yup from 'yup';

export const courseSchema = Yup.object().shape({
  name: Yup.string().required('Название не может быть пустым'),
  description: Yup.string().required('Описание не может быть пустым'),
  dateStart: Yup.string().required('Дата старта не может быть пустой'),
  file: Yup
    .mixed()
    .required('Логотип не может быть пустым')
    .test(
      "file",
      "Доступно *.jpeg, *.jpg, *.png, *.gif",
      (value) => {
        return !value || (value && (value.type === "image/jpeg" || value.type === "image/png" || value.type === "image/gif"))
      }
    ),
});
