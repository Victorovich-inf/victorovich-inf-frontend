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
  },
  {
    title: 'Пользователи',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
];

export default navConfig;
