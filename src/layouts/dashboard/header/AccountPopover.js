import { useState } from 'react';
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, MenuItem, IconButton, Popover, Button, Link } from '@mui/material';
import { connect } from 'react-redux';
import { getUserData } from '../../../store/reducers/userReducer';
import useAuth from '../../../hooks/useAuth';
import { CustomAvatar } from '../../../components/custom-avatar';
import { isEmpty } from 'lodash';
import { useNavigate } from 'react-router';
import { PATH_AUTH, PATH_DASHBOARD } from '../../../paths';
import { Link as RouterLink } from 'react-router-dom';

function AccountPopover({ user }) {
  const navigate = useNavigate();
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
      {!isEmpty(user) ? <>
        <IconButton
          onClick={handleOpen}
          sx={{
            p: 0,
            ...(open && {
              '&:before': {
                zIndex: 1,
                content: '\'\'',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                position: 'absolute',
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
              },
            }),
          }}
        >

          <CustomAvatar
            // @ts-ignore
            name={`${user?.firstName}${user?.lastName}`}
          />
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
            <Typography variant='subtitle2' noWrap>
              {user?.firstName} {user?.lastName}
            </Typography>
            <Typography variant='body2' sx={{ color: 'text.secondary' }} noWrap>
              {user?.email}
            </Typography>
          </Box>
          <Link sx={{
            display: 'contents',
          }} component={RouterLink} to={PATH_DASHBOARD.settings.root}><MenuItem sx={{ m: 1 }}>Профиль</MenuItem></Link>
          <Divider sx={{ borderStyle: 'dashed' }} />
          <MenuItem onClick={async () => {
            setOpen(false);
            await logout();
            window.location.reload();
          }} sx={{ m: 1 }}>
            Выйти
          </MenuItem>
        </Popover>
      </> : <Button onClick={() => navigate(PATH_AUTH.login)}>Войти</Button>}
    </>
  );
}

export default connect(
  (state) => ({
    user: getUserData(state),
  }),
)(AccountPopover);
