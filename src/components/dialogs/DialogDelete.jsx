import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import create from 'zustand';
import { Box, TextField } from '@mui/material';

const useConfirmDialogStore = create((set) => ({
    message: '',
    title: '',
    comment: false,
    onSubmit: undefined,
    close: () => set({onSubmit: undefined}),
}));


export const confirmDialog = (title, message, onSubmit, comment) => {
    useConfirmDialogStore.setState({
        title,
        message,
        onSubmit,
        comment
    });
};

const DialogDelete = () => {
    const {title, message, onSubmit, comment, close} = useConfirmDialogStore();
    const [text, setText] = React.useState('');

    return (
        <Dialog
            open={Boolean(onSubmit)}
            onClose={close}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {message}
                </DialogContentText>
                {comment ? <Box sx={{ mt: 2 }}>
                    <TextField value={text} onChange={(e) => {
                        setText(e.target.value);
                    }
                    } fullWidth label='Комментарий (не обязательно)' />
                </Box> : null}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => close()} color="error" variant="contained">
                    Нет
                </Button>
                <Button onClick={() => {
                    if (onSubmit) {
                        onSubmit(text);
                    }
                    close();
                }} color="primary" variant="contained">
                    Да
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DialogDelete;
