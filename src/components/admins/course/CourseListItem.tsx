import React from 'react';
import { Collapse, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Iconify from '../../iconify';
import { LessonData } from '../../../@types/lesson';
import CourseAdd from './CourseAdd';
import { useCourseEditContext } from '../../../utils/context/CourseEditContext';
import { confirmDialog } from '../../dialogs/DialogDelete';
import { useDeleteLessonMutation, useDeleteTaskMutation } from '../../../store/api/admin/courseApi';

interface CourseListItemProps {
  data: LessonData
}


const CourseListItem = ({data}: CourseListItemProps) => {
  const [open, setOpen] = React.useState(false);
  const [deleteLesson] = useDeleteLessonMutation()
  const [deleteTask] = useDeleteTaskMutation()
  const {selected, handleSetSelected} = useCourseEditContext()

  const handleDelete = async (id: number, type: 'lesson' | 'task')  => {
    return confirmDialog(type === 'lesson' ? 'Удаление урока' : 'Удаление задачи',
      type === 'lesson' ? 'Удалить урок?' : 'Удалить задачу?', async () => {
      try {
        if (type === 'lesson') {
          await deleteLesson(id)
        } else {
          await deleteTask(id)
        }
      } catch (e) {
        console.log(e);
      }
    })
  }

  const handleClick = (e: { stopPropagation: () => void; preventDefault: () => void; }) => {
    e.stopPropagation()
    e.preventDefault()
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={(e) => {
        handleSetSelected(data)
      }}>
        <ListItemIcon>
          <Iconify icon="material-symbols:play-lesson-outline"/>
        </ListItemIcon>
        <ListItemText primary={data.name} />
        <Stack direction="row">
          <IconButton onClick={() => handleDelete(data.id, 'lesson')}>
            <Iconify icon="material-symbols:delete-forever-rounded"/>
          </IconButton>
          <IconButton onClick={handleClick}>
            {open ? <ExpandLess /> : <ExpandMore/>}
          </IconButton>
        </Stack>
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {data.Tasks?.map(task => {
            return <ListItemButton onClick={(e) => {
              handleSetSelected(task)
            }
            } key={task.id} sx={{ pl: 4 }}>
              <ListItemIcon>
                <Iconify icon="material-symbols:task"/>
              </ListItemIcon>
              <ListItemText primary={task.name} />
              <IconButton onClick={() => handleDelete(task.id, 'task')}>
                <Iconify icon="material-symbols:delete-forever-rounded"/>
              </IconButton>
            </ListItemButton>
          }) }
          <CourseAdd id={data.id} label="Добавить задачу" type="task"/>
        </List>
      </Collapse>
    </>
  );
};

export default CourseListItem;
