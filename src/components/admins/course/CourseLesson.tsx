import React, { useMemo } from 'react';
import { Box, Card, CardContent, CardHeader, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useCourseEditContext } from '../../../utils/context/CourseEditContext';
import RowElement from '../editor/RowElement';
import TaskContent from '../editor/TaskContent';
import LessonContent from '../editor/LessonContent';

const CourseLesson = () => {

  const {selected, content} = useCourseEditContext()

  const defaultValues = useMemo(() => ({
    name: '',
  }), []);

  const elements = useMemo(() => {
    if (selected?.id && Object.keys(content)?.length) {
      let key;

      if ('courseId' in selected) {
        key = `${selected?.id}_lesson`
      } else {
        key = `${selected?.id}_task`
      }

      return content[key]?.elements || []
    }
    return []
  }, [selected, content])

  const methods = useForm({
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  React.useEffect(() => {
    if (selected) {
      reset({
        name: selected.name
      })
    }
  }, [selected])

  return (
    <>
      {selected ? <Stack direction="column" spacing={2} sx={{flex: 1}}>
      <Card>
        {'courseId' in selected ? <CardHeader sx={{ backgroundColor: '#F7F7F9', padding: '20px 24px 17px' }} title={selected?.name} /> :
          <CardHeader sx={{ backgroundColor: '#F7F7F9', padding: '20px 24px 17px' }} title={selected?.name}
                     subheader={`Задание урока "${selected?.Lesson?.name}"`} />}
        <CardContent sx={{display: 'flex', flexDirection: 'column', rowGap: 2, padding: 4}}>
          {elements ? elements.map((el, idx) => {
            return <RowElement key={idx} idx={idx} data={el}/>
          }) : null}
          {'lessonId' in selected ? <TaskContent/> : <LessonContent/>}
        </CardContent>
      </Card>
      </Stack>: <Box sx={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Урок/задание не выбран</Box>}
    </>
  );
};

export default CourseLesson;
