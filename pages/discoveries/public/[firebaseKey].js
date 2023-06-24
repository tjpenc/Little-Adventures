// view single public discovery
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getSingleDiscovery } from '../../../api/discoveriesData';
// import BigDiscoveryCardPublic from '../../../components/public_components/BigDiscoveryCardPublic';
import BigDiscoveryCard from '../../../components/cards/BigDIscoveryCard';
import {
  BasicButton, HeaderContainer, TitleButtonsContainer, TitleContainer,
} from '../../../styles/commonStyles';
import { getAdventureFromDiscovery } from '../../../api/mergedData';

export default function ViewSinglePublicDiscovery() {
  const [discovery, setDiscovery] = useState({});
  const [adventure, setAdventure] = useState({});

  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleDiscovery(firebaseKey).then((discoveryObj) => {
      setDiscovery(discoveryObj);
      getAdventureFromDiscovery(discoveryObj.adventureId).then((adventureObj) => {
        setAdventure(adventureObj);
      });
    });
  }, [firebaseKey]);

  return (
    <>
      <HeaderContainer>
        <TitleContainer>
          {adventure[0]?.title
            ? <h1>{discovery.name} from {adventure[0]?.title} Adventure</h1>
            : <h1>{discovery.name}</h1>}
        </TitleContainer>
        <TitleButtonsContainer>
          <Link href="/discoveries/public/publicDiscoveries" passHref>
            <BasicButton className="thicker">Return to Public Discoveries</BasicButton>
          </Link>
        </TitleButtonsContainer>
      </HeaderContainer>
      <BigAdventureContainer>
        <BigDiscoveryCard key={discovery.firebaseKey} discoveryObj={discovery} onUpdate={() => {}} />
      </BigAdventureContainer>
    </>
  );
}

const BigAdventureContainer = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: center;
`;
