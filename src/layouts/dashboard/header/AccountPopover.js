import { useState } from 'react';
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
import account from '../../../_mock/account';
import { connect } from 'react-redux';
import { getUserData } from '../../../store/reducers/userReducer';
import useAuth from '../../../hooks/useAuth';

function AccountPopover({user}) {
  const [open, setOpen] = useState(null);
  const { logout } = useAuth();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.firstName} {user?.lastName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>
        <Divider sx={{ borderStyle: 'dashed' }} />
        <MenuItem onClick={async () => {
          setOpen(false)
          await logout()
        }} sx={{ m: 1 }}>
          Выйти
        </MenuItem>
      </Popover>
    </>
  );
}

export default connect(
  (state) => ({
    user: getUserData(state),
  }),
)(AccountPopover);
