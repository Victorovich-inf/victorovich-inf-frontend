import { Helmet } from 'react-helmet-async';
import {
  Card,
  Stack,
  Typography, Tabs, Tab, Box,
} from '@mui/material';
import Scrollbar from '../components/scrollbar';
import Label from '../components/label';
import OrdersCRUDTable from '../components/CRUD/table/OrdersCRUDTable';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from '../paths';
import { confirmDialog } from '../components/dialogs/DialogDelete';
import { stateArray } from '../utils/data';
import useTabs from '../hooks/useTabs';
import { ordersCRUD, ordersStateCRUD } from '../http';
import { useEffect, useState } from 'react';
import useLoader from '../hooks/useLoader';
import LoadingScreen from '../components/LoadingScreen';
import useReload from '../hooks/useReload';

export default function OrderPage() {
  const navigate = useNavigate()
  const {reload, reloadValue} = useReload();
  const { loading, start, stop } = useLoader(true);
  const [ordersState, setOrdersState] = useState({})
  const { currentTab: filterStatus, onChangeTab: onFilterStatus } = useTabs('new');

  const handleAdd = () => {
    navigate(PATH_DASHBOARD.orders.add)
  }

  const handleEdit = (id) => {
    navigate(PATH_DASHBOARD.orders.edit(id))
  }

  const viewPage = (id) => {
    navigate(PATH_DASHBOARD.orders.detail(id))
  }

  useEffect(() => {
    start()
    ordersStateCRUD.search().then(res => {
      setOrdersState(res);
    }).finally(stop)
  }, [reloadValue]);

  const deleteHandler = async (id) => {
    return confirmDialog('Удаление', 'Удалить заказ?', async () => {
      try {
        await ordersCRUD.delete(id).then(reload)
      } catch (e) {
      }
    })
  }
  const TABS = [...stateArray];

  if (loading) {
    return <LoadingScreen/>
  }

  return (
    <>
      <Helmet>
        <title> Заказы | Victorovich-inf </title>
      </Helmet>

      <Box sx={{paddingLeft: '3rem', paddingRight: '3rem'}}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Заказы
          </Typography>
        </Stack>

        <Card>
          <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            value={filterStatus}
            onChange={onFilterStatus}
            sx={{ px: 2, bgcolor: 'background.neutral' }}
          >
            {TABS.map((tab) => (
              <Tab
                disableRipple
                key={tab.value}
                value={tab.value}
                label={
                  <Stack spacing={1} direction="row" alignItems="center">
                    <div>{tab.label}</div> <Label color={tab.color}> {ordersState[tab.value]} </Label>
                  </Stack>
                }
              />
            ))}
          </Tabs>
          <Scrollbar>
            <OrdersCRUDTable reloadValue={reloadValue} reload={reload} extraFilter={{state: filterStatus}} onClickDetailsButton={viewPage} onClickDeleteButton={deleteHandler} onClickCreateButton={handleAdd} onClickEditButton={handleEdit}/>
          </Scrollbar>
        </Card>
      </Box>
    </>
  );
}
