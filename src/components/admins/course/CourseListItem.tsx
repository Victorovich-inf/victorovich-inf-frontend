import React from 'react';
import {
  Chip,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Iconify from '../../iconify';
import { LessonData } from '../../../@types/lesson';
import CourseAdd from './CourseAdd';
import { useCourseEditContext } from '../../../utils/context/CourseEditContext';
import { confirmDialog } from '../../dialogs/DialogDelete';
import { useDeleteLessonMutation, useDeleteTaskMutation } from '../../../store/api/admin/courseApi';

interface CourseListItemProps {
  data: LessonData,
  detailsMode?: boolean;
}


const CourseListItem = ({data, detailsMode = false}: CourseListItemProps) => {
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
        <Stack direction="row" alignItems="center">
          {!detailsMode ? <>
            <Chip size="small" label={data.public ? 'Опуб.' : 'Не опуб.'} color={data.public ? 'success': 'error'} />
            <IconButton onClick={() => handleDelete(data.id, 'lesson')}>
              <Iconify icon="material-symbols:delete-forever-rounded"/>
            </IconButton>
          </> : null}
          <IconButton onClick={handleClick}>
            {open ? <ExpandLess /> : <ExpandMore/>}
          </IconButton>
        </Stack>
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {data.Tasks?.filter(task => {
            if (detailsMode) {
              return task.public
            }
            return task
          }).map(task => {
            return <ListItemButton onClick={(e) => {
              handleSetSelected(task)
            }
            } key={task.id} sx={{ pl: 4 }}>
              <ListItemIcon>
                <Iconify icon="material-symbols:task"/>
              </ListItemIcon>
              <ListItemText primary={task.name} />
              {!detailsMode ? <Stack direction="row" alignItems="center">
                <Chip size="small" label={task.public ? 'Опуб.' : 'Не опуб.'} color={task.public ? 'success': 'error'} />
                <IconButton onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  handleDelete(task.id, 'task')
                }}>
                  <Iconify icon="material-symbols:delete-forever-rounded"/>
                </IconButton>
              </Stack> : null}
            </ListItemButton>
          }) }
          {!detailsMode ? <CourseAdd id={data.id} label='Добавить задачу' type='task' /> : null}
        </List>
      </Collapse>
    </>
  );
};

export default CourseListItem;
