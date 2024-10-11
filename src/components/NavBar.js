import React, { useEffect, useState } from "react";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import { Nav, Navbar, NavbarBrand} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { axiosReq } from "../api/axiosDefaults";
import { removeTokenTimestamp } from "../utils/utils";
import styles from "../styles/NavBar.module.css";

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
      <NavLink to="/addpost" activeClassName={styles.active}>Add Post</NavLink>
      <NavLink to="/following" activeClassName={styles.active}>Following</NavLink>
      <NavLink to={`/collection/${currentUser?.collection_id}`} activeClassName={styles.active}>Your Collection</NavLink>
      <NavLink to={`/profiles/${currentUser?.profile_id}`} activeClassName={styles.active}>Profile</NavLink>
      <NavLink to="/" onClick={handleSignOut}>Sign Out</NavLink>
    </>
  );
  const loggedOutNav = (
    <>
      <NavLink to="/signin" activeClassName={styles.active}>Sign In</NavLink>
      <NavLink to="/signup" activeClassName={styles.active}>Sign Up</NavLink>
    </>
  );

  return (
    <Navbar expand="md" fixed="top" variant="dark" className={styles.nav}>
      <NavLink to="/">
        <NavbarBrand><span id="logo">Tiny Wheels</span></NavbarBrand>
      </NavLink>
      <Nav className={styles.navlinks}>
        <NavLink to="/new" activeClassName={styles.active}>New</NavLink>
        <NavLink to="/popular" activeClassName={styles.active}>Popular</NavLink>
        {currentUser ? loggedInNav : loggedOutNav}
      </Nav>
    </Navbar>
  );
}

export default NavBar;
