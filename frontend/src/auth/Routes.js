import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoginCallback } from '@okta/okta-react';
import { RequiredAuth } from './SecureRoute';
import Home from '../components/mainPage/MainPage';
import Loading from './Loading';
import { PostContent } from '../components/mainPage/PostContent';
import CommentPage from '../components/comments/CommentBoard';
import JoinPage from '../components/videoRoom/JoinPage';
import Chat from '../components/Chat';
import UserInfoPage from '../components/userPages/UserInfoPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<RequiredAuth />}>
        <Route path="" exact={true} element={<Home />} />
      </Route>
      <Route
        path="login/callback"
        element={<LoginCallback loadingElement={<Loading />} />}
      />
      <Route path="/comments" element={<RequiredAuth />}>
        <Route path="" element={<CommentPage />} />
      </Route>
      <Route path="/profile/:userId" element={<RequiredAuth />}>
        <Route path="" element={<UserInfoPage />} />
      </Route>
      <Route path="/chat/:talkTo" element={<RequiredAuth />}>
        <Route path="" element={<Chat />} />
      </Route>
      <Route path="/post/:id" element={<RequiredAuth />}>
        <Route path="" element={<PostContent />} />
      </Route>
      <Route path="/joinVideoRoom" element={<RequiredAuth />}>
        <Route path="" exact={true} element={<JoinPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
