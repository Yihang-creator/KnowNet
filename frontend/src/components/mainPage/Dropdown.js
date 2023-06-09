import React, {useState} from 'react';
import user_image from "../../img/user.jpeg";
import './Dropdown.css';
import { useOktaAuth } from '@okta/okta-react';
import { Link } from 'react-router-dom';

const Dropdown = () => {
    const { authState, oktaAuth } = useOktaAuth();

    const [open, setOpen] = useState(false);

    const login = async () => oktaAuth.signInWithRedirect();
    const logout = async () => oktaAuth.signOut();

    if (!authState) {
        return null;
    }



    return (
        <div className="menu-container">
            <div className="menu-trigger" onClick={()=>{setOpen(!open)}}>
                <img src={user_image}></img>
            </div>

            <div className={`dropdown-menu ${open? 'active' : 'inactive'}`}>
                <h3>The KyW<br/><span>Website Designer</span></h3>
                <ul>
                    <DropdownItem img = {user_image} text = {"My Posts"}/>
                    <DropdownItem img = {user_image} text = {"Liked Posts"}/>
                    {authState.isAuthenticated ? (
                        <>
                            <Link to="/profile">
                                <DropdownItem img = {user_image} text = {"Account"}/>
                            </Link>
                            <DropdownItem img = {user_image} text = {"Log Out"} onClick={logout}/>
                        </>
                    ) : (
                        <DropdownItem img = {user_image} text = {"Log In"} onClick={login}/>
                    )}
                </ul>
            </div>
        </div>
    );
}

function DropdownItem(props){
    return(
        <li className = 'dropdownItem' onClick={props.onClick}>
            <img src={props.img}></img>
            <a> {props.text} </a>
        </li>
    );
}

export default Dropdown;