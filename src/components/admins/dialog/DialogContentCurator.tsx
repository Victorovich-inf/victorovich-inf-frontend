import React, { useMemo } from 'react';
import { DialogContent, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { FormProvider } from '../../hook-form';
import { useCourseEditContext } from '../../../utils/context/CourseEditContext';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { useGetAllCuratorsQuery } from '../../../store/api/admin/curatorApi';
import RHFSelect from '../../hook-form/RHFSelect';
import { UserData } from '../../../@types/user';
import { curatorDialogSchema } from '../../../schemas/editor/dialog/curatorDialogSchema';
import { useAddToCourseMutation } from '../../../store/api/admin/courseApi';

const DialogContentCurator = ({handleClose}: {handleClose: () => void}) => {

  const { course } = useCourseEditContext();

  const [addToCourse] = useAddToCourseMutation()

  const {data} = useGetAllCuratorsQuery({courseId: course?.id.toString() || ''})

  const defaultValues = useMemo(() => ({
    curator: '' as string | number
  }), []);

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(curatorDialogSchema)
  });

  const {
    handleSubmit,
  } = methods;


  const onSubmit = async (state: {curator: number | string}) => {
    try {
      if (course?.id) {
        await addToCourse({userId: state.curator.toString(), courseId: course.id.toString()}).unwrap().then(handleClose)
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <FormProvider
      methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <RHFSelect name='curator' label='Куратор' options={data?.rows || []} optionValueKey={'id'}
                       optionLabelKey={'firstName'} getOptionLabel={(data: UserData) => `${data.firstName} ${data.lastName}`} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button type="submit">
          Сохранить
        </Button>
      </DialogActions>
    </FormProvider>
  );
};

export default DialogContentCurator;