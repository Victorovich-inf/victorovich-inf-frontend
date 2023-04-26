import React, { useMemo } from 'react';
import { Box, Button, Card, Grid, IconButton, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormProvider, RHFTextField } from '../../hook-form';
import { useForm } from 'react-hook-form';
import { useCourseEditContext } from '../../../utils/context/CourseEditContext';
import Iconify from '../../iconify';
import AddItem from './AddItem';
import RowElementAdmin from '../editor/RowElementAdmin';

const CourseLessonAdmin = () => {

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
        {elements ? elements.map((el, idx) => {
          return <RowElementAdmin key={idx} idx={idx} data={el}/>
        }) : null}
        <AddItem hasElements={!!elements?.length}/>
      </Stack>: <Box sx={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Урок/задание не выбран</Box>}
    </>
  );
};

export default CourseLessonAdmin;
