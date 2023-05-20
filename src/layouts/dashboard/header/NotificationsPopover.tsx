import { SetStateAction, useEffect, useState } from 'react';
import {
  Box,
  List,
  Badge,
  Divider,
  Typography,
} from '@mui/material';
import Iconify from '../../../components/iconify';
import MenuPopover from '../../../components/menu-popover';
import IconButtonAnimate from '../../../components/animate/IconButtonAnimate';
import { useSocketContext } from '../../../utils/context/SocketContext';
import { NotificationData } from '../../../@types/notifications';
import NotificationItem from './NotificationItem';
import { useGetNotificationsQuery } from '../../../store/api/admin/userApi';


export default function NotificationsPopover() {

  const {data} = useGetNotificationsQuery()

  const [openPopover, setOpenPopover] = useState(null);
  const [notifications, setNotifications] = useState<NotificationData[]>([])

  const {socket} = useSocketContext()

  useEffect(() => {
    if (data?.length && notifications.length === 0) {
      setNotifications(data)
    }
  }, [data])

  useEffect(() => {
    socket.on("notification", ({notifications}: {notifications: NotificationData[]}) => {
      setNotifications(notifications);
    });
  }, [socket]);


  const handleOpenPopover = (event: { currentTarget: SetStateAction<null>; }) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <>
      {  // @ts-ignore
      <IconButtonAnimate
        color={openPopover ? 'primary' : 'default'}
        onClick={handleOpenPopover}
        sx={{ width: 40, height: 40 }}
      >
        <Badge badgeContent={notifications.length} color='error'>
          <Iconify icon='eva:bell-fill' />
        </Badge>
      </IconButtonAnimate>}

      <MenuPopover open={openPopover} onClose={handleClosePopover} sx={{ width: 360, p: 0 }}
                   disabledArrow={undefined}>
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant='subtitle1'>Уведомления</Typography>
          </Box>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

          <List
            disablePadding
            sx={{maxHeight: 300, overflowY: 'scroll'}}
          >
            {notifications.map((notification) => (
              <NotificationItem key={notification.id} data={notification}/>
            ))}
          </List>
      </MenuPopover>
    </>
  );
}