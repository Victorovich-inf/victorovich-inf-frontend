import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useCourseEditContext } from '../../../utils/context/CourseEditContext';
import DialogContentTask from './DialogContentTask';
import DialogContentLesson from './DialogContentLesson';
import useResponsive from '../../../hooks/useResponsive';

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

interface EditorDialogProps {
  open: boolean;
  handleClose: () => void;
}

const EditorDialog = ({ open, handleClose }: EditorDialogProps) => {

  const { selected, isTask, isLesson } = useCourseEditContext();
  const isMobile = useResponsive('down', 'sm');

  const isTaskSettings = isTask(selected)

  const renderContent = (isTask: boolean) => {
    switch (isTask) {
      case true: {
        return <DialogContentTask/>
      }
      case false: {
        return <DialogContentLesson/>
      }
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
        Редактирование {selected ? isLesson(selected) ? `урока "${selected.name}"` : `задания "${selected.name}"` : null}
      </BootstrapDialogTitle>
      {renderContent(isTaskSettings)}
    </BootstrapDialog>
  );
};

export default EditorDialog;