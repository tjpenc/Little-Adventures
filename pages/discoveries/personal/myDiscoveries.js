import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import LittleDiscoveryCard from '../../../components/cards/LittleDiscoveryCard';
import { getUserDiscoveries } from '../../../api/discoveriesData';
import { useAuth } from '../../../utils/context/authContext';

// view my discoveries
export default function ViewDiscoveries() {
  const [discoveries, setDiscoveries] = useState([]);
  const { user } = useAuth();

  const getAllUserDiscoveries = () => getUserDiscoveries(user.uid).then((discoveriesArray) => {
    const foundDiscoveries = discoveriesArray.filter((discovery) => discovery.toBeDiscovered === false);
    setDiscoveries(foundDiscoveries);
  });

  useEffect(() => {
    getAllUserDiscoveries();
  }, []);

  return (
    <>
      <HeaderContainer>
        <h1>My Discoveries</h1>
        <Link href="/discoveries/personal/createDiscovery" passHref>
          <Button variant="primary" className="m-2">Add A Discovery!</Button>
        </Link>
        <Link href="/googleMap" passHref>
          <Button variant="primary" className="m-2">To Maps</Button>
        </Link>
      </HeaderContainer>
      <DiscoveriesContainer>
        {discoveries?.map((discovery) => (
          <LittleDiscoveryCard key={discovery.firebaseKey} discoveryObj={discovery} onUpdate={getAllUserDiscoveries} />
        ))}
      </DiscoveriesContainer>
    </>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const DiscoveriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;
