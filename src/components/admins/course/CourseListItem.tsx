import React, { useMemo } from 'react';
import {
  Chip,
  Collapse,
  IconButton,
  List,
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
import { TaskData } from '../../../@types/task';

interface CourseListItemProps {
  data: LessonData,
  detailsMode?: boolean;
}


const CourseListItem = ({ data, detailsMode = false }: CourseListItemProps) => {
  const [open, setOpen] = React.useState(false);
  const [deleteLesson] = useDeleteLessonMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const { handleSetSelected, answerData } = useCourseEditContext();

  const handleDelete = async (id: number, type: 'lesson' | 'task') => {
    return confirmDialog(type === 'lesson' ? 'Удаление урока' : 'Удаление задачи',
      type === 'lesson' ? 'Удалить урок?' : 'Удалить задачу?', async () => {
        try {
          if (type === 'lesson') {
            await deleteLesson(id);
          } else {
            await deleteTask(id);
          }
        } catch (e) {
          console.log(e);
        }
      });
  };

  const handleClick = (e: { stopPropagation: () => void; preventDefault: () => void; }) => {
    e.stopPropagation();
    e.preventDefault();
    setOpen(!open);
  };

  const hasChildPublic = (tasks: TaskData[]) => {
    return tasks.find(el => el.public);
  };

  const viewed = useMemo(() => {
    if (data && answerData) {
      const hasKey = Object.keys(answerData).includes(`${data.id}_lesson`);

      if (hasKey) {
        return !!answerData[`${data.id}_lesson`]?.viewed;
      } else {
        return false;
      }

    }
  }, [answerData, data]);

  return (
    <>
      <ListItemButton onClick={(e) => {
        handleSetSelected(data);
      }}>
        <ListItemIcon>
          <Iconify icon='material-symbols:play-lesson-outline' />
        </ListItemIcon>
        <ListItemText primary={data.name} />
        <Stack direction='row' alignItems='center'>
          {!detailsMode ? <>
            <Chip sx={{marginRight: '5px'}} size='small' label={data.public ? 'Опуб.' : 'Не опуб.'} color={data.public ? 'success' : 'error'} />
            <Chip size='small' label={`${data.index}`} color={'info'} />
            <IconButton color='error' onClick={() => handleDelete(data.id, 'lesson')}>
              <Iconify icon='material-symbols:delete-outline' />
            </IconButton>
          </> : null}
          {viewed ? <Iconify sx={{ color: '#54D62C' }} icon='material-symbols:check-circle' /> : null}
          {(detailsMode && hasChildPublic(data?.Tasks)) ? <IconButton onClick={handleClick}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton> : null}
          {!detailsMode ? <IconButton onClick={handleClick}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton> : null}
        </Stack>
      </ListItemButton>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {data.Tasks?.filter(task => {
            if (detailsMode) {
              return task.public;
            }
            return task;
          }).map(task => {

            const correctly = () => {
              if (task && answerData && 'Lesson' in task) {
                const hasKey = Object.keys(answerData).includes(`${task.Lesson.id}_lesson`);

                if (hasKey) {
                  let answer = answerData[`${task.Lesson.id}_lesson`]?.Tasks?.find(el => el.id === task.id.toString())?.correctly;
                  return !!answer;
                } else {
                  return false;
                }

              }
            };

            return <ListItemButton onClick={(e) => {
              handleSetSelected(task);
            }
            } key={task.id} sx={{ pl: 4 }}>
              <ListItemIcon>
                <Iconify icon='material-symbols:task' />
              </ListItemIcon>
              <ListItemText primary={task.name} />
              {correctly() ? <Iconify sx={{ color: '#54D62C' }} icon='material-symbols:check-circle' /> : null}
              {!detailsMode ? <Stack direction='row' alignItems='center'>
                <Chip size='small' sx={{marginRight: '5px'}} label={task.public ? 'Опуб.' : 'Не опуб.'}
                      color={task.public ? 'success' : 'error'} />
                <Chip size='small' label={`${task.index}`} color={'info'} />
                <IconButton color='error' onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleDelete(task.id, 'task');
                }}>
                  <Iconify icon='material-symbols:delete-outline' />
                </IconButton>
              </Stack> : null}
            </ListItemButton>;
          })}
          {!detailsMode ? <CourseAdd id={data.id} label='Добавить задачу' type='task' /> : null}
        </List>
      </Collapse>
    </>
  );
};

export default CourseListItem;
