import { useOktaAuth } from "@okta/okta-react";
import React from "react";
import Contents from "./Contents";
// import { useUserContext } from "../auth/UserContext";
import Layout from "./Layout";

const Home = () => {
    const { authState } = useOktaAuth();
    // const [userInfo, setUserInfo] = useState(null);
    // const { userInfo } = useUserContext();

    // console.log(userInfo);

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
            <Layout>
                <Contents/>
            </Layout>
        </div>
    );
};
export default Home;