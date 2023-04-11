
function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
};


export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  app: {
    root: path(ROOTS_DASHBOARD, `/app`),
  },
  user: {
    root: path(ROOTS_DASHBOARD, `/user`),
    add: path(ROOTS_DASHBOARD, `/user/add`),
    edit: (id) => path(ROOTS_DASHBOARD, `/user/${id}/`),
    detail: (id) => path(ROOTS_DASHBOARD, `/user/${id}/view`),
  }
};
