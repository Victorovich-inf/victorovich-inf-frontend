import SvgColor from '../../../components/svg-color';
import { PATH_DASHBOARD } from '../../../paths';

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = (role) => {

  if (role === undefined) {
    return [
      {
        subheader: 'Дашбоард',
        items: [
          {
            title: 'Каталог',
            path: '/dashboard/courses',
            icon: icon('ic_courses-admin'),
          }
        ],
      },
    ]

  }

  if (role === 1) {
    return [
      {
        subheader: 'Дашбоард',
        items: [
          {
            title: 'Пользователи',
            path: '/dashboard/user',
            icon: icon('ic_user'),
            role: [1],
          },
          {
            title: 'Календарь',
            path: '/dashboard/app',
            icon: icon('ic_calendar'),
          },
          {
            title: 'Курсы',
            path: '/dashboard/courses',
            icon: icon('ic_courses-admin'),
            children: [
              { title: 'Администрирование', path: PATH_DASHBOARD.courses.root },
              { title: 'Каталог', path: PATH_DASHBOARD.courses.rootUser },
            ],
          }
        ],
      },
    ]
  }

  if (role === 2) {
    return [
      {
        subheader: 'Дашбоард',
        items: [
          {
            title: 'Пользователи',
            path: '/dashboard/user',
            icon: icon('ic_user'),
            role: [1],
          },
          {
            title: 'Календарь',
            path: '/dashboard/app',
            icon: icon('ic_calendar'),
          },
          {
            title: 'Каталог',
            path: '/dashboard/courses',
            icon: icon('ic_courses-admin'),
          },
          {
            title: 'Чат',
            path: '/dashboard/chats',
            icon: icon('ic_chat'),
          },
        ],
      },
    ]
  }


  return [
    {
      subheader: 'Дашбоард',
      items: [
        {
          title: 'Календарь',
          path: '/dashboard/app',
          icon: icon('ic_calendar'),
        },
        {
          title: 'Каталог',
          path: '/dashboard/courses',
          icon: icon('ic_courses-admin'),
        },
        {
          title: 'Чат',
          path: '/dashboard/chats',
          icon: icon('ic_chat'),
        }
      ],
    },
  ]
};

export default navConfig;
