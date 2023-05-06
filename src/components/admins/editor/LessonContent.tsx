import React, { useMemo } from 'react';
import { useCourseEditContext } from '../../../utils/context/CourseEditContext';
import { useForm } from 'react-hook-form';
import { FormProvider } from '../../hook-form';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../iconify';

const LessonContent = () => {
  const { selected, updateProgressLesson, answerData, isCurator } = useCourseEditContext();

  const viewed = useMemo(() => {
    if (selected && answerData) {
      const hasKey = Object.keys(answerData).includes(`${selected.id}_lesson`);

      if (hasKey) {
        return !!answerData[`${selected.id}_lesson`]?.viewed;
      } else {
        return false;
      }

    }
  }, [answerData, selected]);

  const defaultValues = useMemo(() => ({}), []);

  const methods = useForm({
    defaultValues,
  });

  const {
    handleSubmit,
  } = methods;

  const onSubmit = () => {
    if (updateProgressLesson) {
      updateProgressLesson(`${selected?.id}_lesson`);
    }
  };


  return (
    <>
      {viewed ? <LoadingButton startIcon={<Iconify icon='material-symbols:check-circle' />}
                               sx={{ marginTop: 2, alignSelf: 'flex-start' }} variant='contained'>
        Просмотрено
      </LoadingButton> : <FormProvider
        methods={methods} onSubmit={handleSubmit(onSubmit)}>
        {!isCurator ? <LoadingButton sx={{ marginTop: 2, alignSelf: 'flex-start' }} type='submit' variant='contained'>
          Просмотрел
        </LoadingButton> : null}
      </FormProvider>}
    </>
  );
};

export default LessonContent;