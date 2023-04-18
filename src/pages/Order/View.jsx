import { Box, Button, Card, Divider, Stack, Tab } from '@mui/material';
import React, { useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Page from '../../components/Page';
import useLoader from '../../hooks/useLoader';
import { useNavigate, useParams } from 'react-router';
import Typography from '@mui/material/Typography';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import { oneOrderCRUD, ordersCRUD, ordersHistoryCRUD } from '../../http';
import { paymentStatusArray, stateArray } from '../../utils/data';
import Iconify from '../../components/iconify';
import useReload from '../../hooks/useReload';
import { connect } from 'react-redux';
import { getUserData } from '../../store/reducers/userReducer';
import { BasicTable } from '../../components/BasicTable';
import { confirmDialog } from '../../components/dialogs/DialogDelete';
import { PATH_DASHBOARD } from '../../paths';

function View({ user }) {
  const { loading, start, stop, Preloader } = useLoader(false);
  const [data, setData] = React.useState({});
  const [history, setHistory] = React.useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const { reload, reloadValue } = useReload();
  const [value, setValue] = useState('1');

  React.useEffect(() => {
    (async function() {
      start();
      if (params?.id) {
        const res = await oneOrderCRUD.search({ id: params.id });
        const histories = await ordersHistoryCRUD.search({ filter: { order: params.id } });
        if (res) {
          setData({ ...res });
        }
        setHistory(histories.map(el => {
          let label = stateArray?.find(_ => _.value === el.state).label;
          return { ...el, state: label, user: el.user?.email };
        }));
      }
      stop();
    }());
  }, [params.id, reloadValue]);

  const RenderTableRow = React.useCallback((selected = false, text, data) => {
    return <TableRow selected={selected}>
      <TableCell>{text}</TableCell>
      <TableCell>
        {data}
      </TableCell>
    </TableRow>;
  }, []);

  const handleChangeState = async state => {
    let label = stateArray?.find(el => el.value === state).label;
    return confirmDialog('Смена статуса', `Вы действительно хотите сменить статус на ${label}`, async (comment) => {
      try {
        await ordersCRUD.edit({ id: params?.id, state });
        await ordersHistoryCRUD.create({ comment: comment ? comment : `Переход на статус`, user_id: user.id, state, order_id: params?.id });
        reload();
      } catch (e) {
      }
    }, true);
  };

  return (
    <Page title={`Просмотр заказа`}>
      <Box sx={{ paddingLeft: '3rem', paddingRight: '3rem' }}>
        {loading ? Preloader() : <>
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Stack alignItems='center' direction='row' justifyContent='space-between' sx={{ flexGrow: 1 }}>
                <Typography variant='h4' gutterBottom>
                  Просмотр заказа #{data?.number}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Button onClick={() => navigate(PATH_DASHBOARD.orders.edit(params.id))} color="error" variant='contained'>
                    Редактировать
                  </Button>
                  <Button onClick={() => navigate(-1)} variant='outlined'>
                    Назад
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Box>
          <Stack alignItems='center' spacing={2} direction='row' sx={{ flexGrow: 1, mb: 2 }}>
            {stateArray?.map(el => {
              return <Button onClick={() => {
                handleChangeState(el.value);
              }
              } startIcon={<Iconify icon={el.icon} />} color={el.color}
                             variant={data?.state === el.value && 'contained'}>{el.label}</Button>;
            })}
          </Stack>
          <Card>
            <TabContext value={value}>
              <Box sx={{ px: 3, bgcolor: 'background.neutral' }}>
                <TabList onChange={(e, value) => setValue(value)}>
                  <Tab disableRipple value='1' label='Общая информация' />
                  <Tab
                    disableRipple
                    value='2'
                    label={`Услуга`}
                  />
                  <Tab
                    disableRipple
                    value='3'
                    label={`Подуслуга`}
                  />
                  <Tab
                    disableRipple
                    value='4'
                    label={`Опции`}
                  />
                  <Tab
                    disableRipple
                    value='5'
                    label={`Лог`}
                    sx={{ '& .MuiTab-wrapper': { whiteSpace: 'nowrap' } }}
                  />
                </TabList>
              </Box>

              <Divider />

              <TabPanel value='1'>
                <Box>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>Номер</TableCell>
                        <TableCell>
                          {data?.number}
                        </TableCell>
                      </TableRow>
                      <TableRow selected>
                        <TableCell>Id</TableCell>
                        <TableCell>
                          {data?.id}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Дата заказа</TableCell>
                        <TableCell>{data?.dateOfOrder}</TableCell>
                      </TableRow>
                      <TableRow selected>
                        <TableCell>Дата визита</TableCell>
                        <TableCell>{data?.dateOfVisit}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Статус</TableCell>
                        <TableCell>{stateArray.find(el => el.value === data?.state)?.label}</TableCell>
                      </TableRow>
                      <TableRow selected>
                        <TableCell>Статус оплаты</TableCell>
                        <TableCell>{paymentStatusArray.find(el => el.value === data?.paymentStatus)?.label}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Город</TableCell>
                        <TableCell>{data?.city?.name}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Box>
              </TabPanel>
              <TabPanel value='2'>
                <Box>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>Название услуги</TableCell>
                        <TableCell>
                          {data?.services?.name}
                        </TableCell>
                      </TableRow>
                      <TableRow selected>
                        <TableCell>Категория</TableCell>
                        <TableCell>
                          {data?.services?.category?.name}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Box>
              </TabPanel>
              <TabPanel value='3'>
                <Box>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>Название подуслуги</TableCell>
                        <TableCell>
                          {data?.sub_services?.name}
                        </TableCell>
                      </TableRow>
                      {RenderTableRow(true, 'Длительность', data?.sub_services?.duration)}
                      {RenderTableRow(false, 'Кол-во от', data?.sub_services?.count1)}
                      {RenderTableRow(true, 'Кол-во до', data?.sub_services?.count2)}
                      {RenderTableRow(false, 'Цена', data?.sub_services?.newPrice)}
                      {RenderTableRow(true, 'URL', data?.sub_services?.url)}
                    </TableBody>
                  </Table>
                </Box>
              </TabPanel>
              <TabPanel value='4'>
                <BasicTable
                  disabled
                  cells={[
                    {
                      label: '№ n/n',
                      id: 'id',
                    },
                    {
                      label: 'Название',
                      id: 'optionsName',
                    },
                    {
                      label: 'Кол-во чел. от',
                      id: 'optionsCount1',
                    },
                    {
                      label: 'Кол-во чел. до',
                      id: 'optionsCount2',
                    },
                    {
                      label: 'Длительность',
                      id: 'duration',
                    },
                    {
                      label: 'Цена',
                      id: 'optionsNewPrice',
                    },
                  ]}
                  rows={data?.options}
                />
              </TabPanel>
              <TabPanel value='5'>
                <BasicTable
                  disabled
                  cells={[
                    {
                      label: 'Комментарий',
                      id: 'comment',
                    },
                    {
                      label: 'Статус',
                      id: 'state',
                    },
                    {
                      label: 'Автор',
                      id: 'user',
                    },
                  ]}
                  rows={history}
                />
              </TabPanel>
            </TabContext>
          </Card>

        </>}
      </Box>
    </Page>
  );
}

export default connect(
  (state) => ({
    user: getUserData(state),
  }),
)(View);