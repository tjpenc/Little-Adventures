import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getUserDiscoveries } from '../../api/discoveriesData';
import LittleDiscoveryCard from '../../components/cards/LittleDiscoveryCard';

// view my discoveries
export default function ViewDiscoveriesToExplore() {
  const [discoveries, setDiscoveries] = useState([]);
  const { user } = useAuth();

  const getAllUserDiscoveries = () => getUserDiscoveries(user.uid).then((discoveriesArray) => {
    const toBeDiscovered = discoveriesArray.filter((discovery) => discovery.toBeDiscovered === true);
    setDiscoveries(toBeDiscovered);
  });

  useEffect(() => {
    getAllUserDiscoveries();
  }, []);

  return (
    <>
      <HeaderContainer>
        <h1>Discoveries to Find</h1>
        <Link href="/discoveries/personal/createDiscovery" passHref>
          <Button variant="primary" className="m-2">Add A Discovery!</Button>
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
