import React from 'react';

import { useNavigate } from 'react-router-dom';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Security } from '@okta/okta-react';
import { Container } from 'semantic-ui-react';
import config from './auth/oktaConfig';
import Navbar from './components/Navbar';
import Routes from './auth/Routes';

const oktaAuth = new OktaAuth(config.oidc);

const App = () => {
  const navigate = useNavigate();
  const restoreOriginalUri = (_oktaAuth,  originalUri) => {
    navigate(toRelativeUrl(originalUri || '/', window.location.origin));
  };
  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <Container text style={{marginTop: '7em'}} className="App">
        <header className="App-header">
          <Navbar/>
        </header>
        <main>
          <Routes />
        </main>
      </Container>
    </Security>
  );
};
export default App;