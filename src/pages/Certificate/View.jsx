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
import { oneCertificateCRUD } from '../../http';
import useReload from '../../hooks/useReload';
import { connect } from 'react-redux';
import { getUserData } from '../../store/reducers/userReducer';
import { BasicTable } from '../../components/BasicTable';
import { PATH_DASHBOARD } from '../../paths';

function View({ user }) {
  const { loading, start, stop, Preloader } = useLoader(false);
  const [data, setData] = React.useState({});
  const params = useParams();
  const navigate = useNavigate();
  const { reload, reloadValue } = useReload();
  const [value, setValue] = useState('1');

  React.useEffect(() => {
    (async function() {
      start();
      if (params?.id) {
        const res = await oneCertificateCRUD.search({ id: params.id });
        if (res) {
          setData({ ...res });
        }
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

  return (
    <Page title={`Просмотр сертификата`}>
      <Box sx={{ paddingLeft: '3rem', paddingRight: '3rem' }}>
        {loading ? Preloader() : <>
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Stack alignItems='center' direction='row' justifyContent='space-between' sx={{ flexGrow: 1 }}>
                <Typography variant='h4' gutterBottom>
                  Просмотр сертификата #{data?.number}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Button onClick={() => navigate(PATH_DASHBOARD.certificates.edit(params.id))} color="error" variant='contained'>
                    Редактировать
                  </Button>
                  <Button onClick={() => navigate(-1)} variant='outlined'>
                    Назад
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Box>
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
                </TabList>
              </Box>

              <Divider />

              <TabPanel value='1'>
                <Box>
                  <Table>
                    <TableBody>
                      {RenderTableRow(false, 'Номер сертификата', data?.number)}
                      {RenderTableRow(true, 'Код сертификата', data?.code)}
                      {RenderTableRow(false, 'Код подтверждения сертификата', data?.confirmationCode)}
                      {RenderTableRow(true, 'Баланс (номинал)', data?.balance)}
                      {RenderTableRow(false, 'Дата окончания', data?.dateEnd)}
                      {RenderTableRow(true, 'Дата покупки', data?.dateBuy)}
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