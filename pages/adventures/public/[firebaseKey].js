// view single public adventure
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getSingleAdventure } from '../../../api/adventuresData';
import { getDiscoveriesFromAdventure } from '../../../api/mergedData';
import BigAdventureCard from '../../../components/cards/BigAdventureCard';
import LittleDiscoveryCard from '../../../components/cards/LittleDiscoveryCard';
import { BasicButton, HeaderContainer } from '../../../styles/commonStyles';

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
      <HeaderContainer>
        <Link href="/adventures/public/publicAdventures" passHref>
          <BasicButton variant="info">Public Adventures</BasicButton>
        </Link>
      </HeaderContainer>
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
  margin-top: 2%;
`;

const DiscoveriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;
