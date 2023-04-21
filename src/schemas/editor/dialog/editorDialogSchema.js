import * as Yup from 'yup';

export const editorTaskDialogSchema = Yup.object().shape({
  name: Yup.string().required('Название не может быть пустым'),
  answer: Yup.string().required('Ответ не может быть пустым'),
  prompt: Yup.string(),
  taskSolutionText: Yup.string(),
  public: Yup.boolean(),
  answerFile: Yup.boolean(),
});

export const editorLessonDialogSchema = Yup.object().shape({
  name: Yup.string().required('Название не может быть пустым'),
  public: Yup.boolean(),
});
