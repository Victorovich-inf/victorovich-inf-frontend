import { Helmet } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import { styled } from '@mui/material/styles';
import {Container, Typography, Divider} from '@mui/material';
import useResponsive from '../../hooks/useResponsive';
import { ResetForm } from '../../sections/auth/reset';

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function PasswordResetPage() {
  const mdUp = useResponsive('up', 'md');

  return (
    <>
      <Helmet>
        <title> Восстановление пароля | Victorovich-inf </title>
      </Helmet>

      <StyledRoot>
        {mdUp && (
          <StyledSection>
            <Typography variant='h3' sx={{ px: 5, mt: 10, mb: 5 }}>
              Привет, с возвращением
            </Typography>
            <img src='/assets/illustrations/illustration_login.png' alt='login' />
          </StyledSection>
        )}

        <Container maxWidth='sm'>
          <StyledContent>
            <Typography variant='h4' gutterBottom>
              Восстановление пароля
            </Typography>
            <Divider sx={{ my: 3 }}>
            </Divider>

            <ResetForm />
          </StyledContent>
        </Container>
        <ToastContainer />
      </StyledRoot>
    </>
  );
}
