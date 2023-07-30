import React, { useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { toRelativeUrl } from '@okta/okta-auth-js';
import { Outlet } from 'react-router-dom';
import Loading from './Loading';
import { useUserContext } from './UserContext';

export const RequiredAuth = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const { userInfo, setUserInfo } = useUserContext();

  useEffect(() => {
    if (!authState) {
      return;
    }

    if (!authState?.isAuthenticated) {
      const originalUri = toRelativeUrl(
        window.location.href,
        window.location.origin
      );
      oktaAuth.setOriginalUri(originalUri);
      oktaAuth.signInWithRedirect();
    } else {
      if (!userInfo) {
        oktaAuth.getUser().then((info) => {
          fetch(`/api/users/${info.email}`, {
            headers: {
              Authorization: 'Bearer ' + oktaAuth.getAccessToken(),
            },
          })
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              setUserInfo(data);
            })
            .catch((error) => console.log(error));
          // 1. fetch userId based on email
          // 2. use setUserInfo to set current user info
          // 3. use useUserContext hook anywhere in the app
        });
      }
    }
  }, [oktaAuth, authState?.isAuthenticated, authState, setUserInfo, userInfo]);

  if (!authState || !authState?.isAuthenticated || !userInfo) {
    return <Loading />;
  }

  return <Outlet />;
};
