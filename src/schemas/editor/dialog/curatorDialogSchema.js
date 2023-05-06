import * as Yup from 'yup';

export const curatorDialogSchema = Yup.object().shape({
  curator: Yup.number().required('Куратор должен быть выбран'),
});