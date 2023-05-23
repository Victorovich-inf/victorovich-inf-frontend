import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import { useMemo } from 'react';
// @mui
import { alpha, ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import SettingsDrawer from './SettingsDrawer';

ThemeColorPresets.propTypes = {
  children: PropTypes.node,
};

export default function ThemeColorPresets({ children }) {
  const outerTheme = useTheme();

  const themeOptions = useMemo(
    () => ({
      palette: {
        primary: {
          lighter: '#C8FACD',
          light: '#5BE584',
          main: '#00AB55',
          dark: '#007B55',
          darker: '#005249',
          contrastText: '#fff',
        },
      },
      customShadows: {
        primary: `0 8px 16px 0 ${alpha('#00AB55', 0.24)}`,
      },
    }),
    []
  );

  const theme = createTheme(merge(outerTheme, themeOptions));

  return <ThemeProvider theme={theme}>
    {children}
    <SettingsDrawer/>
  </ThemeProvider>;
}
