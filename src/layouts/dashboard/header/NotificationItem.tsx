import React from 'react';
import { NotificationData } from '../../../@types/notifications';
import { fToNow } from '../../../utils/formatTime';
import { IconButton, ListItemButton, ListItemText, Stack, Typography } from '@mui/material';
import Iconify from '../../../components/iconify';
import { useSocketContext } from '../../../utils/context/SocketContext';

interface NotificationItemProps {
  data: NotificationData
}

const NotificationItem = ({data}: NotificationItemProps) => {

  const {socket} = useSocketContext()

  const handleDeleteMessage = () => {
    socket.emit('notification:remove', {id: data.id})
  }

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
      }}
    >
      <ListItemText
        disableTypography
        primary={data.text}
        secondary={
          <Stack alignItems="center" direction="row" justifyContent="space-between">
            <Stack direction="row" sx={{ mt: 0.5, typography: 'caption', color: 'text.disabled' }}>
              <Iconify icon="eva:clock-fill" width={16} sx={{ mr: 0.5 }} />
              <Typography variant="caption">{fToNow(data.createdAt)}</Typography>
            </Stack>
            <IconButton onClick={handleDeleteMessage} color="error">
              <Iconify icon="material-symbols:delete-outline" width={16} />
            </IconButton>
          </Stack>
        }
      />
    </ListItemButton>
  );
};

export default NotificationItem;