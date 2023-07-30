import React from 'react';
import { useNavigate } from 'react-router-dom';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Security } from '@okta/okta-react';
import { Provider } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import config from './auth/oktaConfig';
import Routes from './auth/Routes';
import store from './store';
import { UserProvider } from './auth/UserContext';
import { SearchProvider } from './components/mainPage/searchContext';

const oktaAuth = new OktaAuth(config.oidc);

const App = () => {
  const navigate = useNavigate();

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );
  const restoreOriginalUri = (_oktaAuth, originalUri) => {
    navigate(toRelativeUrl(originalUri || '/', window.location.origin));
  };

  return (
    <Provider store={store}>
      <UserProvider>
        <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
          <ThemeProvider theme={theme}>
            <SearchProvider>
              <main>
                <Routes />
              </main>
            </SearchProvider>
          </ThemeProvider>
        </Security>
      </UserProvider>
    </Provider>
  );
};

export default App;
