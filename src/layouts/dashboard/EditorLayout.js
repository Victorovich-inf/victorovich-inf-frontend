import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Header from './header';
import Nav from './nav';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  paddingLeft: 0,
  paddingRight: 0,
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
  },
}));

// ----------------------------------------------------------------------

export default function EditorLayout() {
  const [open, setOpen] = useState(false);

  return (
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)} />

      <Main>
        <Outlet />
      </Main>
      <ToastContainer/>
    </StyledRoot>
  );
}
