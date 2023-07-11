import { useOktaAuth } from "@okta/okta-react";
import React, { useState } from "react";
import Contents from "../components/mainPage/Contents";
import { Divider } from "@mui/material";
import SearchBar from "../components/mainPage/SearchBar";
import Dropdown from "../components/mainPage/Dropdown";
import CreatePostButton from "../components/mainPage/CreatePostButton";
import JoinVideoRoomButton from "../components/mainPage/JoinVideoRoomButton";

const Home = () => {
  const { authState } = useOktaAuth();
  // const [userInfo, setUserInfo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // const login = useCallback(async () => {
  //   await oktaAuth.signInWithRedirect();
  // }, [oktaAuth]);
  // useEffect(() => {
  //   if (!authState || !authState.isAuthenticated) {
  //     // When user isn't authenticated, forget any user info
  //     setUserInfo(null);
  //     // If user is not authenticated, redirect to Okta login
  //     login();
  //   } else {
  //     oktaAuth.getUser().then((info) => {
  //       setUserInfo(info);
  //     });
  //   }
  // }, [authState, oktaAuth, login]);

  if (!authState) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <SearchBar setSearchTerm={setSearchTerm} />
      <Dropdown />
      <div className="flex">
        <CreatePostButton />
        <Divider variant="middle"/>
        <JoinVideoRoomButton />
      </div>
      <Contents searchTerm={searchTerm} />
    </div>
  );
};
export default Home;
