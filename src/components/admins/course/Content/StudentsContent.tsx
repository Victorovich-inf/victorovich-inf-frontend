import React from 'react';
import { Box, Button, Card, Divider, IconButton, Stack, Typography } from '@mui/material';
import Iconify from '../../../iconify';
import CuratorDialog from '../../dialog/CuratorDialog';
import { useCourseEditContext } from '../../../../utils/context/CourseEditContext';
import { convertToDate } from '../../../../utils/time';
import {
  useDeleteFromCourseMutation,
  useDeleteUserFromCourseMutation,
  useEditUserCourseMutation,
} from '../../../../store/api/admin/courseApi';
import StudentsDialog from '../../dialog/StudentsDialog';
import { connect } from 'react-redux';
import { getUserData } from '../../../../store/reducers/userReducer';
import { UserData } from '../../../../@types/user';
import StudentsEditDialog from '../../dialog/StudentsEditDialog';
import { confirmDialog } from '../../../dialogs/DialogDelete';

interface StudentsContentProps {
  user: UserData;
}

interface StudentColumnProps {
  user: UserData,
  end: string,
  completed: boolean,
  id: number
}

const StudentColumn = ({ user, end, completed, id }: StudentColumnProps) => {
  const [deleteUserFromCourse] = useDeleteUserFromCourseMutation();
  const {course} = useCourseEditContext()

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteUser = () => {
    return confirmDialog(`Удаление пользователя ${user.email}`, `Вы действительно хотите этого пользователя из курса`, async () => {
      deleteUserFromCourse({courseId: course?.id.toString() || '', userId: user.id.toString()})
    });
  }

  return <Stack spacing={1}>
    <Typography variant='subtitle1'>{`${user.email}`}</Typography>
    <Typography variant='body2'>
      <Box component='span' sx={{ color: 'text.secondary', mr: 0.5 }}>
        Присоединился:
      </Box>
      {completed ? <IconButton>
        <Iconify icon='material-symbols:check-circle-rounded' />
      </IconButton> : <IconButton>
        <Iconify icon='material-symbols:cancel' />
      </IconButton>}
    </Typography>
    <Typography variant='body2'>
      <Box component='span' sx={{ color: 'text.secondary', mr: 0.5 }}>
        Дата добавления:
      </Box>
      {`${convertToDate(user.createdAt)}`}
    </Typography>
    <Typography variant='body2'>
      <Box component='span' sx={{ color: 'text.secondary', mr: 0.5 }}>
        Дата окончания:
      </Box>
      {`${convertToDate(end)}`}
    </Typography>

    <Stack direction='row' spacing={1}>
      <Button onClick={handleClickOpen} color='info' size='small'
              startIcon={<Iconify icon={'material-symbols:edit'} />}>
        Редактировать
      </Button>
      <Button onClick={handleDeleteUser} color='error' size='small'
              startIcon={<Iconify icon='eva:trash-2-outline' />}>
        Удалить из курса
      </Button>
    </Stack>
    <StudentsEditDialog userId={user.id.toString()} end={end} open={open} handleClose={handleClose} />
  </Stack>;
};

const StudentsContent = ({ user }: StudentsContentProps) => {
  const { course } = useCourseEditContext();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <>
      <Card sx={{ p: '16px' }}>
        <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ mb: 3 }}>
          <Typography variant='overline' sx={{ color: 'text.secondary' }}>
            Ученики
          </Typography>

          <Button onClick={handleClickOpen} size='small' startIcon={<Iconify icon='eva:plus-fill' />}>
            Добавить ученика
          </Button>
        </Stack>

        <Stack spacing={3} divider={<Divider sx={{ borderStyle: 'dashed' }} />}>
          {course?.CourseUsers?.length ? course?.CourseUsers.filter((el) => el.User.id !== user.id).map(({
                                                                                                           completed,
                                                                                                           end,
                                                                                                           User: user,
                                                                                                           id,
                                                                                                         }) => (
            <StudentColumn key={user.id} user={user} id={id} end={end} completed={completed} />
          )) : <Typography variant='subtitle1'>Учеников нет</Typography>}
        </Stack>
      </Card>
      <StudentsDialog open={open} handleClose={handleClose} />
    </>
  );
};

export default connect(
  (state) => ({
    user: getUserData(state),
  }),
)(StudentsContent);