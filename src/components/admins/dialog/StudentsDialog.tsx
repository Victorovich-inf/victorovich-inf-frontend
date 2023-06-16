import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import useResponsive from '../../../hooks/useResponsive';
import { DialogContent, Grid } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useCourseEditContext } from '../../../utils/context/CourseEditContext';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, RHFTextField } from '../../hook-form';
import RHFDateTime from '../../hook-form/RHFDateTime';
import * as Yup from 'yup';
import { useAddUserToCourseMutation } from '../../../store/api/admin/courseApi';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

interface CuratorDialogProps {
  open: boolean;
  handleClose: () => void;
}

const StudentSchema = Yup.object().shape({
  email: Yup.string().email('Это не email').required('Email обязателен'),
});

const StudentsDialog = ({ open, handleClose }: CuratorDialogProps) => {
  const isMobile = useResponsive('down', 'sm');

  const [addUserToCourse] = useAddUserToCourseMutation()

  const { course } = useCourseEditContext();

  const defaultValues = useMemo(() => ({
    email: '',
    end: new Date(),
  }), []);

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(StudentSchema)
  });

  const {
    handleSubmit,
  } = methods;


  const onSubmit = async (state: {email: string, end: Date}) => {
    try {
      if (course) {
        await addUserToCourse({courseId: course.id.toString(), email: state.email, end: state.end.toString()})
        handleClose()
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <BootstrapDialog
      fullWidth
      maxWidth={isMobile ? 'xl': "sm"}
      onClose={handleClose}
      aria-labelledby='customized-dialog-title'
      open={open}
    >
      <BootstrapDialogTitle id='customized-dialog-title' onClose={handleClose}>
        Добавление ученика
      </BootstrapDialogTitle>
      <FormProvider
        methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <RHFTextField name='email' label='Email' />
            </Grid>
            <Grid item xs={12} md={12}>
              <RHFDateTime name='end' label='До какого числа оплата' />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button type="submit">
            Добавить
          </Button>
        </DialogActions>
      </FormProvider>
    </BootstrapDialog>
  );
};

export default StudentsDialog;