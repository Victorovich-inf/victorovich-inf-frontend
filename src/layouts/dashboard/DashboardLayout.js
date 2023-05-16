import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Header from './header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavMini from './nav/NavMini';
import NavVertical from './nav/NavVertical';
import useResponsive from '../../hooks/useResponsive';

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 53;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 16,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const isDesktop = useResponsive('up', 'lg');

  const renderNavVertical = <NavVertical openNav={open} onCloseNav={() => setOpen(false)} />;

  return (
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)} />

      {isDesktop ? <NavMini openNav={open} onCloseNav={() => setOpen(false)} /> : renderNavVertical}
      <Main>
        <Outlet />
      </Main>
      <ToastContainer/>
    </StyledRoot>
  );
}
