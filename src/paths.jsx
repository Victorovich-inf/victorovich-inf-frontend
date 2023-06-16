
function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_NO_AUTH = '/main';
const ROOTS_DASHBOARD = '/dashboard';

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
};

export const PATH_NO_AUTH = {
  root: ROOTS_NO_AUTH,
  app: path(ROOTS_NO_AUTH, '/app'),
};


export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  app: {
    root: path(ROOTS_DASHBOARD, `/app`),
  },
  courses: {
    root: path(ROOTS_DASHBOARD, `/courses-admin`),
    rootUser: path(ROOTS_DASHBOARD, `/courses`),
    add: path(ROOTS_DASHBOARD, `/courses-admin/add`),
    edit: (id) => path(ROOTS_DASHBOARD, `/courses-admin/${id}/edit`),
    details: (id) => path(ROOTS_DASHBOARD, `/courses/${id}/details`),
    chat: (idCourse, id) => path(ROOTS_DASHBOARD, `/courses/${idCourse}/chat/${id}`),
  },
  settings: {
    root: path(ROOTS_DASHBOARD, `/settings`),
  },
  user: {
    root: path(ROOTS_DASHBOARD, `/user`),
    add: path(ROOTS_DASHBOARD, `/user/add`),
    edit: (id) => path(ROOTS_DASHBOARD, `/user/${id}/`),
    detail: (id) => path(ROOTS_DASHBOARD, `/user/${id}/view`),
  },
  chat: {
    root: path(ROOTS_DASHBOARD, `/chats`),
    detail: (id) => path(ROOTS_DASHBOARD, `/chats/${id}`),
  }
};
