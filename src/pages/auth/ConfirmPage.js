import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import { Container, Typography, Divider } from '@mui/material';
import ConfirmForm from '../../sections/auth/confirm/ConfirmForm';

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
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

export default function ConfirmPage() {
  return (
    <>
      <Helmet>
        <title> Восстановление пароля | Victorovich-inf </title>
      </Helmet>

      <StyledRoot>
        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>Восстановление пароля</Typography>
            <Divider sx={{ my: 3 }}>
            </Divider>

            <ConfirmForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
