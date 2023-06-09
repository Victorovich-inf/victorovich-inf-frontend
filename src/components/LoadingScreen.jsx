import PropTypes from 'prop-types';
import { m } from 'framer-motion';
import { alpha, styled } from '@mui/material/styles';
import { Box, CircularProgress } from '@mui/material';
import Logo from './logo';

const RootStyle = styled('div')(({ theme }) => ({
  right: 0,
  bottom: 0,
  zIndex: 99999,
  width: '100%',
  height: '100%',
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

LoadingScreen.propTypes = {
  isDashboard: PropTypes.bool,
};

export default function LoadingScreen({ isDashboard, ...other }) {
  return (
    <>
      {!isDashboard && (
        <RootStyle {...other}>

          <CircularProgress size={44} />

        </RootStyle>
      )}
    </>
  );
}
