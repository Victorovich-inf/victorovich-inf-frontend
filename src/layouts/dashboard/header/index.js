import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { bgBlur } from '../../../utils/cssStyles';
import Iconify from '../../../components/iconify';
import AccountPopover from './AccountPopover';
import DialogDelete from '../../../components/dialogs/DialogDelete';
import NotificationsPopover from './NotificationsPopover';
import { makeStyles } from '@mui/styles';
import { useStableNavigate } from '../../../contexts/StableNavigateContext';
import { PATH_DASHBOARD } from '../../../paths';

const NAV_WIDTH = 88;

const HEADER_MOBILE = 45;

const HEADER_DESKTOP = 65;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

const useStyles = makeStyles({
  typography: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: '1.25rem',
    cursor: 'pointer',
    transition: 'all 0.4s ease',
    '&:hover': {
      color: '#71f821',
    },
  },
});

const Header = ({ onOpenNav }) => {
  const classes = useStyles();
  const navigate = useStableNavigate()

  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: 'text.primary',
            display: { lg: 'none' },
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
        <Typography onClick={() => navigate(PATH_DASHBOARD.courses.root)} className={classes.typography}>Иван Викторович</Typography>


        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <NotificationsPopover />
          <AccountPopover />
        </Stack>
      </StyledToolbar>
      <DialogDelete/>
    </StyledRoot>
  );
}

export default Header;