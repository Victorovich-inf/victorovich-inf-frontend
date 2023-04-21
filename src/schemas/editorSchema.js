import * as Yup from 'yup';
const URL = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
const YOUTUBE = /(?:https?:\/\/)?(?:www\.)?youtu(?:\.be\/|be.com\/\S*(?:watch|embed)(?:(?:(?=\/[-a-zA-Z0-9_]{11,}(?!\S))\/)|(?:\S*v=|v\/)))([-a-zA-Z0-9_]{11,})/

export const settingsImage = Yup.object().shape({
  src: Yup.string().required('Ссылка не может быть пустой').matches(URL, 'Это не ссылка'),
});

export const settingsVideo = Yup.object().shape({
  video: Yup.string().required('Ссылка не может быть пустой').matches(YOUTUBE, 'Это не ссылка на Youtube'),
});

export const settingsFile = Yup.object().shape({
  file: Yup.string().required('Ссылка не может быть пустой').matches(URL, 'Это не ссылка'),
});
