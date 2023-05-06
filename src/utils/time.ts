import dayjs from 'dayjs';
import 'dayjs/locale/ru'

dayjs.locale('ru')

export const convertToDate = (date: string) => {
  return dayjs(date).format('DD.MM.YYYY')
}
