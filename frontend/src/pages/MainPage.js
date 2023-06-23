import { useOktaAuth } from '@okta/okta-react';
import React, { useState, useEffect, useCallback } from 'react';
import Contents from "../components/mainPage/Contents";
import SearchBar from "../components/mainPage/SearchBar";
import Dropdown from "../components/mainPage/Dropdown";

const Home = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      oktaAuth.getUser().then((info) => {
        setUserInfo(info);
      });
    }
  }, [authState, oktaAuth]); // Update if authState changes

  const login = useCallback(async () => {
    await oktaAuth.signInWithRedirect();
  }, [oktaAuth]);

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
      // If user is not authenticated, redirect to Okta login
      login();
    } else {
      oktaAuth.getUser().then((info) => {
        setUserInfo(info);
      });
    }
  }, [authState, oktaAuth, login]);

  if (!authState) {
    return (
      <div>Loading...</div>
    );
  }

  //uncommented code below to show postContent 
  return (
    <div>
      <SearchBar setSearchTerm={setSearchTerm} />
      <Dropdown />
      <Contents searchTerm={searchTerm} />
    </div>
  );
};
export default Home;