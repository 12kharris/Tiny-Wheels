import React from 'react'
import { useCurrentUser } from '../contexts/CurrentUserContext'
import { Nav, Navbar, NavbarBrand, NavLink } from 'react-bootstrap';

function NavBar() {

    const currentUser = useCurrentUser();
    const loggedIn = currentUser? true : false;

    const loggedInNav = (
        <>
            <Nav.Link href='/addpost'>
                Add Post
            </Nav.Link>
            <Nav.Link href='/following'>
                Following
            </Nav.Link>
            <Nav.Link href='/collection'>
                Your Collection
            </Nav.Link>
            <Nav.Link href='/profile'>
                Profile
            </Nav.Link>
            <Nav.Link href='/signout'>
                Sign Out
            </Nav.Link>
        </>
    );
    const loggedOutNav = (
        <>
            <Nav.Link href='/signin'>
                Sign In
            </Nav.Link>
            <Nav.Link href='/signup'>
                Sign Up
            </Nav.Link>
        </>
    )


  return (
    <Navbar>
        <Nav.Link href='/'>
            <NavbarBrand>
                Tiny Wheels
            </NavbarBrand>
        </Nav.Link>
        <Nav.Link href='/new'>
            New
        </Nav.Link>
        <Nav.Link href='/popular'>
            Popular
        </Nav.Link>
        {loggedIn ? loggedInNav : loggedOutNav}
    </Navbar>
  )
}

export default NavBar