import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import BigAdventureCard from '../../../components/cards/BigAdventureCard';
import { getSingleAdventure } from '../../../api/adventuresData';
import { getDiscoveriesFromAdventure } from '../../../api/mergedData';
import LittleDiscoveryCard from '../../../components/cards/LittleDiscoveryCard';
import { BasicButton, HeaderContainer } from '../../../styles/commonStyles';

// view single adventure form
export default function ViewSingleAdventure() {
  const [adventure, setAdventure] = useState({});
  const [discoveries, setDiscoveries] = useState([]);

  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleAdventure(firebaseKey).then(setAdventure);
    getDiscoveriesFromAdventure(firebaseKey).then(setDiscoveries);
  }, [firebaseKey]);

  const onUpdate = () => {
    getSingleAdventure(firebaseKey).then(setAdventure);
    getDiscoveriesFromAdventure(firebaseKey).then(setDiscoveries);
  };

  return (
    <>
      <HeaderContainer>
        {adventure.toBeExplored !== true
          ? (
            <Link href="/adventures/personal/myAdventures" passHref>
              <BasicButton variant="info">My Adventures</BasicButton>
            </Link>
          )
          : (
            <Link href="/toExplore/adventures" passHref>
              <BasicButton variant="info">Adventures To Explore</BasicButton>
            </Link>
          )}
      </HeaderContainer>
      <BigAdventureContainer>
        <BigAdventureCard key={firebaseKey} adventureObj={adventure} />
      </BigAdventureContainer>
      <DiscoveriesContainer>
        {discoveries?.map((discovery) => (
          <LittleDiscoveryCard key={discovery.firebaseKey} discoveryObj={discovery} onUpdate={onUpdate} />
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
