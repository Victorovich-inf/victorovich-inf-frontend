import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Drawer } from '@mui/material';
import useResponsive from '../../../hooks/useResponsive';
import { NAV } from '../../../config-global';
import Scrollbar from '../../../components/scrollbar';
import { NavSectionVertical } from '../../../components/nav-section';
import navConfig from './config';
import { connect } from 'react-redux';
import { getUserData } from '../../../store/reducers/userReducer';

const NavVertical = ({ openNav, onCloseNav, user }) => {
  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <NavSectionVertical data={navConfig(user.role)} />

      <Box sx={{ flexGrow: 1 }} />

    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_DASHBOARD },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              zIndex: 0,
              width: NAV.W_DASHBOARD,
              bgcolor: 'transparent',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: {
              width: NAV.W_DASHBOARD,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

export default connect(
  (state) => ({
    user: getUserData(state),
  }),
)(NavVertical);
