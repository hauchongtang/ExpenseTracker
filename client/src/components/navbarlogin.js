import React from "react";
import { useAuth0 } from "../react-auth0-spa";
import { Link } from "react-router-dom";
import { Button } from 'reactstrap'

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  return (
    <div>
      {isAuthenticated && (<Button onClick={() => logout()}>Log out</Button>)}

      {isAuthenticated && (
        <span>
          <Link to="/"></Link>
          <Link to='/profile'></Link>
        </span>
      )}
    </div>
  );
};

export default NavBar;