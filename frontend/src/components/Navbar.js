import { useOktaAuth } from '@okta/okta-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { authState, oktaAuth } = useOktaAuth();

  const login = async () => oktaAuth.signInWithRedirect();
  const logout = async () => oktaAuth.signOut();

  if (!authState) {
    return null;
  }

  return (
    <div className="fixed top-0 right-0 m-6 space-y-3">
      {authState.isAuthenticated ? (
        <>
          <Link to="/profile" className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-400">
            Profile
          </Link>
          <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-400">
            Logout
          </button>
        </>
      ) : (
        <button onClick={login} className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-400">
          Login
        </button>
      )}
    </div>
  );
};
export default Navbar;