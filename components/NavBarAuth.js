/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
// import {
//   Navbar, Container, Nav, Button,
// } from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBarAuth() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <NavContainer open={isOpen}>
      {isOpen ? (
        <>
          <LogoContainer>Little Adventures</LogoContainer>
          <CloseNavContainer>
            <button type="button" onClick={toggleNav}>Close</button>
          </CloseNavContainer>
          <UserInfoContainer>User Info</UserInfoContainer>
          <LinksContainer>
            <Link href="/" passHref>
              <NavLink>My Profile</NavLink>
            </Link>
            <Link href="/adventures/personal/myAdventures" passHref>
              <NavLink>My Adventures</NavLink>
            </Link>
            <Link href="/adventures/personal/createAdventure" passHref>
              <NavLink>Create an Adventure</NavLink>
            </Link>
            <Link href="/discoveries/personal/myDiscoveries" passHref>
              <NavLink>My Discoveries</NavLink>
            </Link>
            <Link href="/discoveries/personal/createDiscovery" passHref>
              <NavLink>Create a Discovery</NavLink>
            </Link>
            <Link href="/randomAdventure" passHref>
              <NavLink>Find an Adventure</NavLink>
            </Link>
            <Link href="/toExplore/toBeExplored" passHref>
              <NavLink>To Be Explored</NavLink>
            </Link>
            <Link href="/adventures/public/publicAdventures" passHref>
              <NavLink>All Adventures</NavLink>
            </Link>
            <Link href="/discoveries/public/publicDiscoveries" passHref>
              <NavLink>All Discoveries</NavLink>
            </Link>
          </LinksContainer>
          <LogoutContainer><button type="button" onClick={signOut}>Logout</button></LogoutContainer>
        </>
      ) : <OpenNavButton type="button" onClick={toggleNav}>&gt;</OpenNavButton> }
    </NavContainer>
  );
}

const NavContainer = styled.div`
  font-size: 15px;
  color: white;
  left: 0;
  height: 100vh;
  background-color: #222529;
  position: fixed;
  top: 0;
  width: ${(props) => (props.open ? '13%' : '3%')};
  transition: 0.5s;
  >* {
    cursor: pointer;
  }
`;

const OpenNavButton = styled.button`
  color: white;
  background-color: black;
`;

const LogoContainer = styled.div`
  margin: 10px;
`;

const CloseNavContainer = styled.div`
  margin: 10px;
`;

const UserInfoContainer = styled.div`
  margin: 10px;
`;

const LinksContainer = styled.div`
  margin: 10px;
  overflow-x: hidden;
`;

const NavLink = styled.a`
  display: block;
    &:hover {
    background-color: #ccc;
    color: black;
  }
`;
const LogoutContainer = styled.div`
  margin: 10px;
`;
