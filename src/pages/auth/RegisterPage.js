import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import { Container, Typography, Divider } from '@mui/material';
import RegisterForm from '../../sections/auth/register/RegisterForm';

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

export default function RegisterPage() {
  return (
    <>
      <Helmet>
        <title> Завершение регистрации | Victorovich-inf </title>
      </Helmet>

      <StyledRoot>
        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Завершение регистрации
            </Typography>
            <Divider sx={{ my: 3 }}>
            </Divider>

            <RegisterForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
