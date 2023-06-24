// view single public discovery
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getSingleDiscovery } from '../../../api/discoveriesData';
// import BigDiscoveryCardPublic from '../../../components/public_components/BigDiscoveryCardPublic';
import BigDiscoveryCard from '../../../components/cards/BigDIscoveryCard';
import { BasicButton } from '../../../styles/commonStyles';

export default function ViewSinglePublicDiscovery() {
  const [discovery, setDiscovery] = useState({});

  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleDiscovery(firebaseKey).then(setDiscovery);
  }, [firebaseKey]);

  return (
    <>
      <h1>{discovery.name} from {discovery.adventureTitle}</h1>
      <Link href="/discoveries/public/publicDiscoveries" passHref>
        <BasicButton variant="info">Return to Public Discoveries</BasicButton>
      </Link>
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
