// component
import SvgColor from '../../../components/svg-color';
import Iconify from '../../../components/iconify';
import { PATH_DASHBOARD } from '../../../paths';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    subheader: 'Дашбоард',
    items: [
      {
        title: 'Календарь',
        path: '/dashboard/app',
        icon: icon('ic_calendar'),
        role: [0, 1, 2],
      },
      {
        title: 'Пользователи',
        path: '/dashboard/user',
        icon: icon('ic_user'),
        role: [1],
      },
      {
        title: 'Курсы',
        path: '/dashboard/courses',
        icon: icon('ic_courses-admin'),
        children: [
          { title: 'Администрирование', path: PATH_DASHBOARD.courses.root },
          { title: 'Каталог', path: PATH_DASHBOARD.courses.rootUser },
        ],
      },
      {
        title: 'Чат',
        path: '/dashboard/chats',
        icon: icon('ic_chat'),
      },
    ],
  },
];

export default navConfig;
