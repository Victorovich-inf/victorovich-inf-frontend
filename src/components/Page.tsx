import { Helmet } from 'react-helmet-async';
import { forwardRef, ReactNode } from 'react';
import { Box } from '@mui/material';

interface PageInterface {
  children: ReactNode,
  title: string;
  meta?: string;
}

const Page = forwardRef(({ children, title = '', meta = '', ...other }: PageInterface, ref) => (
  <>
    <Helmet>
      <title>{`${title} | 2K admin`}</title>
      {meta}
    </Helmet>

    <Box sx={{ paddingLeft: {
        xs: '1.5rem',
        md: '3rem',
      }, paddingRight: {
        xs: '1.5rem',
        md: '3rem',
      } }} ref={ref} {...other}>
      {children}
    </Box>
  </>
));

export default Page;
