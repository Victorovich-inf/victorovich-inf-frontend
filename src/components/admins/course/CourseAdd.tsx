import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from '@mui/material';
import { FormProvider, RHFTextField } from '../../hook-form';
import Iconify from '../../iconify';
import { useCreateLessonMutation, useCreateTaskMutation } from '../../../store/api/admin/courseApi';
import { useCourseEditContext } from '../../../utils/context/CourseEditContext';

interface CourseAddProps {
  type?: 'lesson' | 'task',
  id: number,
  label: string
}

const CourseAdd = ({type = 'lesson', id, label}: CourseAddProps) => {
  const [modeAdd, setModeAdd] = React.useState(false)

  const {course} = useCourseEditContext()

  const [createLesson] = useCreateLessonMutation()
  const [createTask] = useCreateTaskMutation()

  const handleChangeModeToActive = () => {
    setModeAdd(true)
  }

  const handleChangeModeToNotActive = () => {
    setModeAdd(false)
  }

  const defaultValues = useMemo(() => ({
    name: type === 'lesson' ? 'Урок' : 'Задание',
  }), []);

  const methods = useForm({
    defaultValues,
  });

  const {
    handleSubmit,
  } = methods;

  const onSubmit = async ({name}: {name: string}) => {
    if (type === 'lesson') {

      let maxIndex = 0;

      const maxIndexFind = course?.Lessons;

      if (maxIndexFind) {
        const maxItem = maxIndexFind.map(el => Number(el.index))
        maxIndex = Math.max(...maxItem) + 1;
      }

      await createLesson({name, courseId: id, maxIndex})

    } else if (type === 'task') {

      let maxIndex = 0;

      const maxIndexFind = course?.Lessons.find(el => el.id === id);

      if (maxIndexFind?.Tasks?.length) {
        const maxItem = maxIndexFind.Tasks.map(el => Number(el.index))
        maxIndex = Math.max(...maxItem) + 1;
      }

      await createTask({name, lessonId: id, maxIndex})
    }
    handleChangeModeToNotActive()
  }

  return <>
    {modeAdd ? <ListItem  sx={{ pl: 4, cursor: 'pointer' }}>
      <FormProvider
                             methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="row" spacing={1}>
        <RHFTextField size="small" name='name' label='Название' />
        <Stack direction="row">
          <IconButton type="submit">
            <Iconify icon="material-symbols:check-circle-rounded"/>
          </IconButton>
          <IconButton onClick={handleChangeModeToNotActive} >
            <Iconify icon="material-symbols:cancel"/>
          </IconButton>
        </Stack>
      </Stack>
      </FormProvider></ListItem> : <ListItemButton sx={{ pl: type === 'lesson' ? 4 : 6 }} onClick={handleChangeModeToActive}>
      <ListItemIcon>
        <Iconify icon="ic:baseline-plus"/>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>}
  </>
}

export default CourseAdd
