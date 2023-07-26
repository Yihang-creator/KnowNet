import React from "react";
import { Routes, Route } from "react-router-dom";
import { LoginCallback } from "@okta/okta-react";
import { RequiredAuth } from "./SecureRoute";
import Home from "../pages/MainPage";
import Loading from "./Loading";
import Profile from "../pages/Profile";
import { PostContent } from "../components/PostContent";
import CommentPage from "../components/comments/CommentBoard";
import JoinPage from "../components/videoRoom/JoinPage";
import InteractiveVideo from "../components/interactiveVideo/InteractiveVideo";
import InteractiveVideoBuilder from "../components/interactiveVideo/InteractiveVideoBuilder";

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
      <Route path="/profile" element={<RequiredAuth />}>
        <Route path="" element={<Profile />} />
      </Route>
      <Route path="/post/:id" element={<RequiredAuth />}>
        <Route path="" element={<PostContent />} />
      </Route>
      <Route path="/joinVideoRoom" element={<RequiredAuth />}>
        <Route path="" exact={true} element={<JoinPage />} />
      </Route>
      <Route path="/interactive" element={<RequiredAuth />}>
        <Route path="" exact={true} element={<InteractiveVideo />} />
      </Route>
      <Route path="/interactiveBuilder" element={<RequiredAuth />}>
        <Route path="" exact={true} element={<InteractiveVideoBuilder />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
