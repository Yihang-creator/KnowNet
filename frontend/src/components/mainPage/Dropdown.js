import React, { useState } from "react";
import "./Dropdown.css";
import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../auth/UserContext";

const Dropdown = () => {
  const { authState, oktaAuth } = useOktaAuth();

  const [open, setOpen] = useState(false);

  const login = async () => oktaAuth.signInWithRedirect();
  const logout = async () => oktaAuth.signOut();

  const { userInfo } = useUserContext();

  const user_image = userInfo == null ? null : userInfo.userPhotoUrl;

  if (!authState) {
    return null;
  }

  return (
    <div className="menu-container">
      <div
        className="menu-trigger"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <img src={user_image} alt=""></img>
      </div>

      <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
        <h3>
          The KyW
          <br />
          <span>Website Designer</span>
        </h3>
        <ul>
          {authState.isAuthenticated ? (
            <>
              <Link to="/">
                <DropdownItem img={user_image} text={"Home"} />
              </Link>
              <Link to="/profile">
                <DropdownItem img={user_image} text={"Profile"} />
              </Link>
              <DropdownItem
                img={user_image}
                text={"Log Out"}
                onClick={logout}
              />
            </>
          ) : (
            <DropdownItem img={user_image} text={"Log In"} onClick={login} />
          )}
        </ul>
      </div>
    </div>
  );
};

function DropdownItem(props) {
  return (
    <li className="dropdownItem" onClick={props.onClick}>
      <img src={props.img} alt=""></img>
      <a> {props.text} </a>
    </li>
  );
}

export default Dropdown;
