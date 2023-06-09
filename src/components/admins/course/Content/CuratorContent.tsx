import React from 'react';
import { Box, Button, Card, Divider, Stack, Typography } from '@mui/material';
import Iconify from '../../../iconify';
import CuratorDialog from '../../dialog/CuratorDialog';
import { useCourseEditContext } from '../../../../utils/context/CourseEditContext';
import { convertToDate } from '../../../../utils/time';
import { useDeleteFromCourseMutation } from '../../../../store/api/admin/courseApi';

const CuratorContent = () => {
  const [deleteFromCourse] = useDeleteFromCourseMutation()
  const {course} = useCourseEditContext()

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
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
          <Typography variant="overline" sx={{ color: 'text.secondary' }}>
            Кураторы
          </Typography>

          <Button onClick={handleClickOpen} size="small" startIcon={<Iconify icon="eva:plus-fill" />}>
            Добавить куратора
          </Button>
        </Stack>

        <Stack spacing={3} divider={<Divider sx={{ borderStyle: 'dashed' }} />}>
          {course?.CuratorCourses?.length ? course?.CuratorCourses.map(({ User: user, id, createdAt }) => (
            <Stack key={user.id} spacing={1}>
              <Typography variant="subtitle1">{`${user.firstName} ${user.lastName}`}</Typography>

              <Typography variant="body2">
                <Box component="span" sx={{ color: 'text.secondary', mr: 0.5 }}>
                  Дата добавления:
                </Box>
                {`${convertToDate(createdAt)}`}
              </Typography>

              <Stack direction="row" spacing={1}>
                <Button onClick={() => deleteFromCourse({ id: id.toString(), courseId: course?.id.toString() || '', userId: user.id.toString() })} color="error" size="small" startIcon={<Iconify icon="eva:trash-2-outline" />}>
                  Удалить из курса
                </Button>
              </Stack>
            </Stack>
          )) : <Typography variant="subtitle1">Кураторы не назначены</Typography>}
        </Stack>
      </Card>
      <CuratorDialog open={open} handleClose={handleClose}/>
    </>
  );
};

export default CuratorContent;