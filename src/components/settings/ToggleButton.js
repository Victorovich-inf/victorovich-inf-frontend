import { alpha, useTheme } from '@mui/material/styles';
import { Tooltip, Box } from '@mui/material';
import BadgeDot from './BadgeDot';
import IconButtonAnimate from '../animate/IconButtonAnimate';
import SvgColor from '../svg-color';
import { bgBlur } from '../../utils/cssStyles';

export default function ToggleButton({ notDefault, open, onToggle }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        p: 0.5,
        right: 24,
        bottom: 24,
        zIndex: 999,
        position: 'fixed',
        borderRadius: '50%',
        boxShadow: `-12px 12px 32px -4px ${alpha(
          theme.palette.mode === 'light' ? theme.palette.grey[600] : theme.palette.common.black,
          0.36
        )}`,
        ...bgBlur({ color: theme.palette.background.default }),
      }}
    >
      {notDefault && !open && (
        <BadgeDot
          sx={{
            top: 8,
            right: 10,
          }}
        />
      )}

      <Tooltip title="Достижения">
        <IconButtonAnimate color="primary" onClick={onToggle} sx={{ p: 1.25 }}>
          <SvgColor src="/assets/icons/navbar/ic_achievements.svg" />
        </IconButtonAnimate>
      </Tooltip>
    </Box>
  );
}