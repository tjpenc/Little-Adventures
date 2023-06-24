// view single public adventure
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getSingleAdventure } from '../../../api/adventuresData';
import { getDiscoveriesFromAdventure } from '../../../api/mergedData';
import BigAdventureCard from '../../../components/cards/BigAdventureCard';
import LittleDiscoveryCard from '../../../components/cards/LittleDiscoveryCard';

// view single adventure form
export default function ViewSinglePublicAdventure() {
  const [adventure, setAdventure] = useState();
  const [discoveries, setDiscoveries] = useState();

  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleAdventure(firebaseKey).then(setAdventure);
    getDiscoveriesFromAdventure(firebaseKey).then(setDiscoveries);
  }, [firebaseKey]);

  return (
    <>
      <Link href="/adventures/public/publicAdventures" passHref>
        <Button variant="info">Public Adventures</Button>
      </Link>
      <BigAdventureContainer>
        <BigAdventureCard key={firebaseKey} adventureObj={adventure} />
      </BigAdventureContainer>
      <DiscoveriesContainer>
        {discoveries?.map((discovery) => (
          <LittleDiscoveryCard key={discovery.firebaseKey} discoveryObj={discovery} onUpdate={() => {}} />
        ))}
      </DiscoveriesContainer>
    </>
  );
}

const BigAdventureContainer = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: center;
`;

const DiscoveriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;
