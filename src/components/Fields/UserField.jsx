import { Button, Dialog, DialogContent, Divider, FormHelperText, Stack } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import UsersCRUDTable from '../CRUD/table/UsersCRUDTable';
import { useController } from 'react-hook-form';

export default function UserField({
                                    label,
                                    value,
                                    onChange,
                                    extraFilter,
                                    disabled,
                                    sx,
                                    object,
                                  }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const { fieldState: { error } } = useController({ name: 'user_id' });

  return (
    <>
      <Stack direction='row' alignItems='center'>
        <Typography style={{ fontWeight: 'bold', width: '50%' }}>
          {label || 'Пользователь'}:{' '}
        </Typography>
        <Typography>
          {object?.name || name || `id пользователя: ${value || 'не указано'}`}
        </Typography>
        <Button disabled={disabled} onClick={() => setOpen(true)} variant={'outlined'}
                style={{ marginLeft: '10px', outline: 'none' }}>Выбрать</Button>
      </Stack>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        PaperProps={{ sx: { maxHeight: '85%' } }}
        maxWidth={'80%'}
      >
        <DialogTitle>Выбор пользователя</DialogTitle>
        <Divider />
        <DialogContent>
          <UsersCRUDTable
            extraFilter={extraFilter}
            onClickCreateButton={undefined} // что бы не показывать кнопку создания
            onRowClick={(record, rowIndex) => {
              onChange(record.id);
              setName(record.name);
              setOpen(false);
            }}
          />
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            variant={'text'}
            style={{ marginLeft: 'auto' }}
            onClick={() => setOpen(false)}
          >
            Отменить
          </Button>
        </DialogActions>
      </Dialog>
      {error?.message ? <FormHelperText error sx={{p: 2}}>
        {error?.message ? error?.message : null}
      </FormHelperText> : null}
    </>
  );
}
