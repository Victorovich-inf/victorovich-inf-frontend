// component
import SvgColor from '../../../components/svg-color';
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Дашбоард',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
    role: [0, 1, 2]
  },
  {
    title: 'Пользователи',
    path: '/dashboard/user',
    icon: icon('ic_user'),
    role: [1]
  },
  {
    title: 'Курсы (админ.)',
    path: '/dashboard/courses',
    icon: icon('ic_courses-admin'),
    role: [1]
  },
];

export default navConfig;
