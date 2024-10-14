import React from "react";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import { Nav, Navbar, NavbarBrand } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { axiosReq } from "../api/axiosDefaults";
import { removeTokenTimestamp } from "../utils/utils";
import styles from "../styles/NavBar.module.css";

function NavBar() {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const handleSignOut = async () => {
    try {
      await axiosReq.post("/dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      console.log(err);
    }
  };

  const loggedInNav = (
    <>
      <NavLink to="/addpost" activeClassName={styles.active}>
        <i className="fa-regular fa-square-plus"></i> Add Post
      </NavLink>
      <NavLink to="/following" activeClassName={styles.active}>
        <i className="fa-solid fa-users"></i> Following
      </NavLink>
      <NavLink
        to={`/collection/${currentUser?.collection_id}`}
        activeClassName={styles.active}
      >
        <i className="fa-solid fa-list"></i> Your Collection
      </NavLink>
      <NavLink
        to={`/profiles/${currentUser?.profile_id}`}
        activeClassName={styles.active}
      >
        <i className="fa-solid fa-user"></i> Profile
      </NavLink>
      <NavLink to="/" onClick={handleSignOut}>
        <i className="fa-solid fa-right-from-bracket"></i> Sign Out
      </NavLink>
    </>
  );
  const loggedOutNav = (
    <>
      <NavLink to="/signin" activeClassName={styles.active}>
        <i className="fa-solid fa-right-to-bracket"></i> Sign In
      </NavLink>
      <NavLink to="/signup" activeClassName={styles.active}>
        <i className="fa-solid fa-user-plus"></i> Sign Up
      </NavLink>
    </>
  );

  return (
    <Navbar expand="md" fixed="top" variant="dark" className={styles.nav}>
      <NavLink to="/">
        <NavbarBrand>
          <span id="logo">Tiny Wheels</span>
        </NavbarBrand>
      </NavLink>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse>
        <Nav className={styles.navlinks}>
          <NavLink to="/new" activeClassName={styles.active}>
            <i className="fa-regular fa-clock"></i> New
          </NavLink>
          <NavLink to="/posts/popular" activeClassName={styles.active}>
            <i className="fa-solid fa-bolt-lightning"></i> Popular
          </NavLink>
          {currentUser ? loggedInNav : loggedOutNav}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
