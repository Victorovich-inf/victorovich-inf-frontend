import * as Yup from 'yup';

export const editorTaskSchema = Yup.object().shape({
  answer: Yup.string().required('Ответ не может быть пустым')
});

