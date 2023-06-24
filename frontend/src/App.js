import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { Security } from "@okta/okta-react";
import { Provider } from "react-redux";
import Dropdown from "./components/mainPage/Dropdown";
import SearchBar from "./components/mainPage/SearchBar";

import config from "./auth/oktaConfig";
import Routes from "./auth/Routes";
import store from "./store";

const oktaAuth = new OktaAuth(config.oidc);

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const restoreOriginalUri = (_oktaAuth, originalUri) => {
    navigate(toRelativeUrl(originalUri || "/", window.location.origin));
  };

  return (
    <Provider store={store}>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
        <main>
          <Routes />
        </main>
      </Security>
    </Provider>
  );
};

export default App;
