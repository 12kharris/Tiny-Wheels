import React, { useEffect, useState } from "react";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import { Nav, Navbar, NavbarBrand} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { axiosReq } from "../api/axiosDefaults";
import { removeTokenTimestamp } from "../utils/utils";

function NavBar() {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const [profileID, setProfileID] = useState(null);

  useEffect(()=> {
    setProfileID(currentUser?.profile_id);
  },[currentUser])

  const handleSignOut = async() => {
    try {
      await axiosReq.post("/dj-rest-auth/logout/");
      setCurrentUser(null)
      removeTokenTimestamp();
    }
    catch (err) {
      console.log(err);
    }
  }

  const loggedInNav = (
    <>
      <NavLink to="/addpost">Add Post</NavLink>
      <NavLink to="/following">Following</NavLink>
      <NavLink to="/collection">Your Collection</NavLink>
      <NavLink to={`/profiles/${currentUser?.profile_id}`}>Profile</NavLink>
      <NavLink to="/" onClick={handleSignOut}>Sign Out</NavLink>
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
