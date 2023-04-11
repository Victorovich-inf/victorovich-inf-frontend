import { forwardRef } from 'react';
import { Icon } from '@iconify/react';
import { Box } from '@mui/material';

interface IconifyProps {
  icon: string;
  width?: number;
  sx?: any;
  style?: any;
  onClick?: () => void;
}

const Iconify = forwardRef(({ icon, width = 20, sx, onClick, ...other }: IconifyProps, ref) => {
  return <Box ref={ref} component={Icon} icon={icon} onClick={onClick ? onClick : undefined} sx={{ width, height: width, ...sx }} {...other} />
})

export default Iconify;
