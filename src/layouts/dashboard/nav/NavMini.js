import { Stack, Box } from '@mui/material';
import { NAV } from '../../../config-global';
import { hideScrollbarX } from '../../../utils/cssStyles';
import { NavSectionMini } from '../../../components/nav-section';
import navConfig from './config';
import { connect } from 'react-redux';
import { getUserData } from '../../../store/reducers/userReducer';

const NavMini = ({user}) => {

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_DASHBOARD_MINI },
      }}
    >
      <Stack
        sx={{
          pb: 2,
          height: 1,
          pt: 3,
          position: 'fixed',
          width: NAV.W_DASHBOARD_MINI,
          borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          ...hideScrollbarX,
        }}
      >
        <NavSectionMini data={navConfig(user.role)} />
      </Stack>
    </Box>
  );
}

export default connect(
  (state) => ({
    user: getUserData(state),
  }),
)(NavMini);
