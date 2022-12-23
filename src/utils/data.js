export const stateArray = [{
  value: 'new',
  label: 'Новый заказ',
  color: 'primary',
  icon: 'ic:sharp-fiber-new',
}, {
  value: 'approved',
  label: 'Одобрен',
  color: 'info',
  icon: 'carbon:task-approved',
}, {
  value: 'received',
  label: 'Услуга получена',
  color: 'success',
  icon: 'ri:folder-received-line',
}, {
  value: 'sent', label: 'Оплата отправлена', color: 'secondary', icon: 'mdi:email-sent',
}, {
  value: 'canceled', label: 'Отменен', color: 'error', icon: 'material-symbols:cancel-outline',
}];

export const paymentStatusArray = [{
  value: 'paid',
  label: 'Оплачен',
}, {
  value: 'not paid',
  label: 'Не оплачен',
}, {
  value: 'process',
  label: 'В процессе',
},
];


export const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

export const getComparator = (order, orderBy) => {
  return order === "asc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

export const sortRows = (array, order, orderBy) => {
  const comparator = getComparator(order, orderBy);

  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};
