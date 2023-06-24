// view all public discoveries
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getAllDiscoveries } from '../../../api/discoveriesData';
import LittleDiscoveryCard from '../../../components/cards/LittleDiscoveryCard';
import { useAuth } from '../../../utils/context/authContext';

export default function ViewPublicDiscoveries() {
  const [discoveries, setDiscoveries] = useState([]);

  const { user } = useAuth();

  const getPublicDiscoveries = () => getAllDiscoveries().then((discoveriesArray) => {
    const publicDiscoveries = discoveriesArray.filter((discovery) => discovery.isPublic === true);
    setDiscoveries(publicDiscoveries);
  });

  useEffect(() => {
    getPublicDiscoveries();
  }, []);

  return (
    <>
      <HeaderContainer>
        <h1>Public Discoveries</h1>
      </HeaderContainer>
      <DiscoveriesContainer>
        {discoveries?.map((discovery) => (
          discovery.uid !== user.uid
            ? <LittleDiscoveryCard key={discovery.firebaseKey} discoveryObj={discovery} onUpdate={() => {}} />
            : ''
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
