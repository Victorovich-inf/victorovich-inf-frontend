import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import create from 'zustand';

const useConfirmDialogStore = create((set) => ({
    message: '',
    title: '',
    onSubmit: undefined,
    close: () => set({onSubmit: undefined}),
}));


export const confirmDialog = (title, message, onSubmit) => {
    useConfirmDialogStore.setState({
        title,
        message,
        onSubmit,
    });
};

const DialogDelete = () => {
    const {title, message, onSubmit, close} = useConfirmDialogStore();
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
            </DialogContent>
            <DialogActions>
                <Button onClick={() => close()} color="error" variant="contained">
                    Нет
                </Button>
                <Button onClick={() => {
                    if (onSubmit) {
                        onSubmit();
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
