import { Box, Button, Card, Divider, Stack, Tab } from '@mui/material';
import React, {  useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Page from '../../components/Page';
import useLoader from '../../hooks/useLoader';
import {  useParams } from 'react-router';
import Typography from '@mui/material/Typography';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import { oneOrderCRUD } from '../../http';
import { paymentStatusArray, stateArray } from '../../utils/data';
import Iconify from '../../components/iconify';
import { teal } from '@mui/material/colors';

function View(props) {
  const { loading, start, stop, Preloader } = useLoader(false);
  const [data, setData] = React.useState({});
  const params = useParams();
  const [isEdit, setEdit] = React.useState(false);
  const [value, setValue] = useState('1');
  const color = teal[500];

  React.useEffect(() => {
    (async function() {
      start();
      if (params?.id) {
        const res = await oneOrderCRUD.search({ id: params.id });
        if (res) {
          setData({ ...res });
          setEdit(true);
        }
      }
      stop();
    }());
  }, []);

  const RenderTableRow = React.useCallback((selected = false, text, data) => {
    return <TableRow selected={selected}>
      <TableCell>{text}</TableCell>
      <TableCell>
        {data}
      </TableCell>
    </TableRow>
  }, [])


  return (
    <Page title={`Просмотр заказа`}>
      <Box sx={{ paddingLeft: '3rem', paddingRight: '3rem' }}>
        {loading ? Preloader() : <>
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Stack alignItems="center" direction="row" justifyContent="space-between" sx={{ flexGrow: 1 }}>
                <Typography variant='h4' gutterBottom>
                  Просмотр заказа #{data?.number}
                </Typography>
                <Button variant="outlined">
                  Назад
                </Button>
              </Stack>
            </Box>
          </Box>
          <Stack alignItems="center" spacing={2} direction="row" sx={{ flexGrow: 1, mb: 2 }}>
            <Button startIcon={<Iconify icon={'ic:sharp-fiber-new'} />} variant="outlined">Новый заказ</Button>
            <Button startIcon={<Iconify icon={'carbon:task-approved'} />} color="info" variant="outlined">Одобрен</Button>
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
            </TabContext>
          </Card>

        </>}
      </Box>
    </Page>
  );
}

export default View;