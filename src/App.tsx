import Router from './routes';
import ThemeProvider from './theme';
import { SnackbarProvider } from 'notistack';
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';
import { Provider } from 'react-redux';
import { store } from './store';
import './style.css';
import { AuthProvider } from './contexts/JWTContext';
import MotionLazyContainer from './components/animate/MotionLazyContainer';
import { SocketProvider } from './contexts/SocketProvider';
import ThemeColorPresets from './components/settings/ThemeColorPresets';

export default function App() {

  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <ThemeProvider>
          <ThemeColorPresets>
            <SocketProvider>
              <AuthProvider>
                <MotionLazyContainer>
                  <ScrollToTop />
                  <StyledChart />
                  <Router />
                </MotionLazyContainer>
              </AuthProvider>
            </SocketProvider>
          </ThemeColorPresets>
        </ThemeProvider>
      </SnackbarProvider>
    </Provider>
  );
}
