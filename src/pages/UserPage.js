import { Helmet } from 'react-helmet-async';
import {
  Card,
  Stack,
  Typography,
  Box,
} from '@mui/material';
import UsersCRUDTable from '../components/CRUD/table/UsersCRUDTable';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from '../paths';
import { confirmDialog } from '../components/dialogs/DialogDelete';

export default function UserPage() {
  const navigate = useNavigate()

  const handleAdd = () => {
    navigate(PATH_DASHBOARD.user.add)
  }

  const handleEdit = (id) => {
    navigate(PATH_DASHBOARD.user.edit(id))
  }

  const viewPage = (id) => {
    navigate(PATH_DASHBOARD.user.detail(id))

  }

  const deleteHandler = async (id) => {
    return confirmDialog('Удаление пользователя', 'Удалить пользователя?', async () => {
      try {

      } catch (e) {
        console.log(e);
      }
    })
  }

  return (
    <>
      <Helmet>
        <title> Пользователи | Feelifun CRM </title>
      </Helmet>

      <Box sx={{paddingLeft: '3rem', paddingRight: '3rem'}}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Пользователи
          </Typography>
        </Stack>

        <Card>
            <UsersCRUDTable onClickDetailsButton={viewPage} onClickDeleteButton={deleteHandler} onClickCreateButton={handleAdd} onClickEditButton={handleEdit}/>
        </Card>
      </Box>
    </>
  );
}
