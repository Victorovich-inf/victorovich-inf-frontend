import { Helmet } from 'react-helmet-async';
import {
  Card,
  Stack,
  Container,
  Typography, Box,
} from '@mui/material';
import Scrollbar from '../components/scrollbar';
import CertificatesCRUDTable from '../components/CRUD/table/CertificatesCRUDTable';
import { PATH_DASHBOARD } from '../paths';
import { useNavigate } from 'react-router-dom';
import useReload from '../hooks/useReload';
import { confirmDialog } from '../components/dialogs/DialogDelete';
import { certificatesCRUD } from '../http';

export default function CertificatePage() {

  const navigate = useNavigate()
  const {reload, reloadValue} = useReload();

  const handleAdd = () => {
    navigate(PATH_DASHBOARD.certificates.add)
  }
  const handleEdit = (id) => {
    navigate(PATH_DASHBOARD.certificates.edit(id))
  }
  const viewPage = (id) => {
    navigate(PATH_DASHBOARD.certificates.detail(id))
  }

  const deleteHandler = async (id) => {
    return confirmDialog('Удаление', 'Удалить сертификат?', async () => {
      try {
        await certificatesCRUD.delete(id).then(reload)
      } catch (e) {
        console.log(e);
      }
    })
  }


  return (
    <>
      <Helmet>
        <title> Сертификаты | Feelifun CRM </title>
      </Helmet>

      <Box sx={{paddingLeft: '3rem', paddingRight: '3rem'}}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Сертификаты
          </Typography>
        </Stack>

        <Card>
          <Scrollbar>
            <CertificatesCRUDTable reloadValue={reloadValue} reload={reload} onClickDeleteButton={deleteHandler} onClickEditButton={handleEdit} onClickDetailsButton={viewPage} onClickCreateButton={handleAdd}/>
          </Scrollbar>
        </Card>
      </Box>
    </>
  );
}
