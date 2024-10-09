import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { Nav, Navbar, NavbarBrand} from "react-bootstrap";
import { NavLink } from "react-router-dom";

function NavBar() {
  const currentUser = useCurrentUser();
  //const loggedIn = currentUser? true : false;
  const [profileID, setProfileID] = useState(null);

  useEffect(()=> {
    setProfileID(currentUser?.profile_id);
  },[currentUser])

  const loggedInNav = (
    <>
      <NavLink to="/addpost">Add Post</NavLink>
      <NavLink to="/following">Following</NavLink>
      <NavLink to="/collection">Your Collection</NavLink>
      <NavLink to={`/profiles/${currentUser?.profile_id}`}>Profile</NavLink>
      <NavLink to="/signout">Sign Out</NavLink>
    </>
  );
  const loggedOutNav = (
    <>
      <NavLink to="/signin">Sign In</NavLink>
      <NavLink to="/signup">Sign Up</NavLink>
    </>
  );

  return (
    <Navbar>
      <NavLink to="/">
        <NavbarBrand>Tiny Wheels</NavbarBrand>
      </NavLink>
      <Nav>
        <NavLink to="/new">New</NavLink>
        <NavLink to="/popular">Popular</NavLink>
        {currentUser ? loggedInNav : loggedOutNav}
      </Nav>
    </Navbar>
  );
}

export default NavBar;
