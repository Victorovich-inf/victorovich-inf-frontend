import { Helmet } from 'react-helmet-async';
import {
  Card,
  Stack,
  Container,
  Typography, Tabs, Tab,
} from '@mui/material';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import UsersCRUDTable from '../components/CRUD/table/UsersCRUDTable';
import Label from '../components/label';

export default function OrderPage() {

  const TABS = [
    { value: 'all', label: 'Все', color: 'info', count: 1 },
    { value: 'success', label: 'Выполненные', color: 'success', count: 2 },
  ];


  return (
    <>
      <Helmet>
        <title> Заказы | Feelifun CRM </title>
      </Helmet>

      <Container>
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
            sx={{ px: 2, bgcolor: 'background.neutral' }}
          >
            {TABS.map((tab) => (
              <Tab
                disableRipple
                key={tab.value}
                value={tab.value}
                label={
                  <Stack spacing={1} direction="row" alignItems="center">
                    <div>{tab.label}</div> <Label color={tab.color}> {tab.count} </Label>
                  </Stack>
                }
              />
            ))}
          </Tabs>
          <Scrollbar>
            <UsersCRUDTable/>
          </Scrollbar>
        </Card>
      </Container>
    </>
  );
}
