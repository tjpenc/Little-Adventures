/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
// import { Card } from 'react-bootstrap';
// import {
//   Navbar, Container, Nav, Button,
// } from 'react-bootstrap';
import { signOut } from '../utils/auth';
// import { useAuth } from '../utils/context/authContext';

export default function NavBarAuth() {
  const [isOpen, setIsOpen] = useState(true);

  // const { user } = useAuth();

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <NavContainer open={isOpen}>
      {isOpen ? (
        <>
          <LogoContainer>
            <Image src="/backpack.png" width="20px" height="20px" />
            Little Adventures
            <button type="button" style={{ marginLeft: '20px' }} onClick={toggleNav}>Close</button>
          </LogoContainer>
          <LinksContainer>
            <NewGroupContainer>
              <Link href="/" passHref>
                <NavLink>My Profile</NavLink>
              </Link>
            </NewGroupContainer>
            <NewGroupContainer>
              <Link href="/adventures/personal/myAdventures" passHref>
                <NavLink>My Adventures</NavLink>
              </Link>
              <Link href="/discoveries/personal/myDiscoveries" passHref>
                <NavLink>My Discoveries</NavLink>
              </Link>
            </NewGroupContainer>
            <NewGroupContainer>
              <Link href="/adventures/personal/createAdventure" passHref>
                <NavLink>Create an Adventure</NavLink>
              </Link>
              <Link href="/discoveries/personal/createDiscovery" passHref>
                <NavLink>Create a Discovery</NavLink>
              </Link>
            </NewGroupContainer>
            <NewGroupContainer>
              <Link href="/randomAdventure" passHref>
                <NavLink>Find an Adventure</NavLink>
              </Link>
              <Link href="/toExplore/toBeExplored" passHref>
                <NavLink>My Explore Page</NavLink>
              </Link>
            </NewGroupContainer>
            <NewGroupContainer>
              <Link href="/adventures/public/publicAdventures" passHref>
                <NavLink>All Adventures</NavLink>
              </Link>
              <Link href="/discoveries/personal/myDiscoveries" passHref>
                <NavLink>All Discoveries</NavLink>
              </Link>
            </NewGroupContainer>
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
  width: ${(props) => (props.open ? '11%' : '3%')};
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

const LinksContainer = styled.div`
  margin: 10px;
  margin-top: 90%;
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
  position: absolute;
  bottom: 10px;
`;

const NewGroupContainer = styled.div`
  margin: 10px;
`;
