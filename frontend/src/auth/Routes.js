import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginCallback } from '@okta/okta-react';
import { RequiredAuth } from './SecureRoute';
import Home from '../pages/MainPage';
import Loading from './Loading';
import Messages from '../pages/Messages';
import Profile from '../pages/Profile';
import { PostContent } from '../components/PostContent';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" exact={true} element={<Home/>}/>
      <Route path="login/callback" element={<LoginCallback loadingElement={<Loading/>}/>}/>
      {/* <Route path="/messages" element={<RequiredAuth/>}>
        <Route path="" element={<Messages/>}/>
      </Route> */}
      <Route path="/profile" element={<RequiredAuth/>}>
        <Route path="" element={<Profile/>}/>
      </Route>
      <Route path="/post/:id" element={<RequiredAuth/>}>
        <Route path="" element={<PostContent />}/>
      </Route>
    </Routes>
  );
};

export default AppRoutes;