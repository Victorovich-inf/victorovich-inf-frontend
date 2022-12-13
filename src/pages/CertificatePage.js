import { Helmet } from 'react-helmet-async';
import {
  Card,
  Stack,
  Container,
  Typography,
} from '@mui/material';
import Scrollbar from '../components/scrollbar';
import UsersCRUDTable from '../components/CRUD/table/UsersCRUDTable';

export default function CertificatePage() {

  return (
    <>
      <Helmet>
        <title> Сертификаты | Feelifun CRM </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Сертификаты
          </Typography>
        </Stack>

        <Card>
          <Scrollbar>
            <UsersCRUDTable/>
          </Scrollbar>
        </Card>
      </Container>
    </>
  );
}
